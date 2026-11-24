"""Build mockups/src/data/irons.json from the store's public product feed (read-only snapshot).
Usage: python3 -I build_irons.py <dir with iron-sets.json, ladies-golf-irons.json>
Groups listings that differ only by shaft material or finish into one model ("family"),
drops builder-only "(Custom)" listings, and saves product images as webp."""
import json, re, sys, io, html as H, urllib.request, os
from html.parser import HTMLParser
from PIL import Image

SRC = sys.argv[1]
ROOT = os.path.join(os.path.dirname(__file__), '..')
OUT = os.path.join(ROOT, 'src/data/irons.json')
IMG = os.path.join(ROOT, 'assets/img/irons')
os.makedirs(IMG, exist_ok=True)

prods = {}
for f in ['iron-sets.json', 'ladies-golf-irons.json']:
    for p in json.load(open(os.path.join(SRC, f)))['products']:
        prods[p['handle']] = p

def norm_opt(name):
    n = name.lower()
    return 'set' if 'set' in n else 'flex' if 'flex' in n else 'shaft'

def parse(p):
    t = p['title']
    shaft = 'Graphite' if re.search(r'graphite', t, re.I) else 'Steel'
    base = re.sub(r'\(custom\)|graphite shafts?|steel shafts?|\bgraphite\b|\bsteel\b|\bgolf\b|\birons?\b', ' ', t, flags=re.I)
    base = re.sub(r'\s*-\s*(?=\s|$)', ' ', base); base = re.sub(r'\s+', ' ', base).strip(' -')
    base = re.sub(r'\s+\d-PW$', '', base)
    finish = 'Standard'
    m = re.search(r'\b(Black|Chrome)$', base)
    if m and not re.search(r'Black Ops$', base): finish = m.group(1); base = base[:m.start()].strip()
    return base, shaft, finish

def clean_desc(src):
    class P(HTMLParser):
        def __init__(s): super().__init__(convert_charrefs=True); s.o = []; s.skip = 0
        def handle_starttag(s, t, a):
            if t in ('table', 'script', 'style', 'iframe'): s.skip += 1
            elif not s.skip and t == 'br': s.o.append(' ')
            elif not s.skip and t in ('p', 'ul', 'li', 'strong', 'b', 'h2', 'h3', 'h4'): s.o.append('<%s>' % ('strong' if t == 'b' else 'h3' if t[0] == 'h' else t))
        def handle_endtag(s, t):
            if t in ('table', 'script', 'style', 'iframe'): s.skip -= 1
            elif not s.skip and t in ('p', 'ul', 'li', 'strong', 'b', 'h2', 'h3', 'h4'): s.o.append('</%s>' % ('strong' if t == 'b' else 'h3' if t[0] == 'h' else t))
        def handle_startendtag(s, t, a):
            if not s.skip and t == 'br': s.o.append(' ')
        def handle_data(s, d):
            if not s.skip: s.o.append(H.escape(d))
    p = P(); p.feed(src or ''); out = ''.join(p.o)
    out = re.sub(r'<(p|li|h3|strong)>\s*</\1>', '', out); out = re.sub(r'\s+', ' ', out)
    # drop spec / warranty / delivery sections (shown elsewhere on the page)
    out = re.sub(r'<h3>[^<]*(specification|warranty|delivery|returns)[^<]*</h3>.*?(?=<h3>|$)', '', out, flags=re.I | re.S)
    paras = re.findall(r'<p>.*?</p>', out, flags=re.S)
    intro = ''.join(paras[:2]); more = out
    for x in paras[:2]: more = more.replace(x, '', 1)
    return intro.strip(), more.strip() if re.sub(r'<[^>]+>', '', more).strip() else ''

def save(url, name, w):
    path = os.path.join(IMG, f'{name}-{w}.webp')
    if os.path.exists(path): return
    with urllib.request.urlopen(url + ('&' if '?' in url else '?') + f'width={w * 2 if w < 800 else w}') as r:
        im = Image.open(io.BytesIO(r.read())).convert('RGB')
    im.thumbnail((w, w)); c = Image.new('RGB', (w, w), 'white'); c.paste(im, ((w - im.width) // 2, (w - im.height) // 2))
    c.save(path, quality=82)

fams = {}
for p in prods.values():
    if '(Custom)' in p['title'] or p['variants'][0]['title'] == 'Default Title': continue
    if not any(v['available'] for v in p['variants']): continue
    if re.search(r'utility', p['title'], re.I): continue
    base, shaft, finish = parse(p)
    key = re.sub(r'[^a-z0-9]+', '-', base.lower()).strip('-')
    names = [norm_opt(o['name']) for o in p['options']]
    vs = []
    for v in p['variants']:
        o = dict(zip(names, [v.get('option1'), v.get('option2'), v.get('option3')]))
        vs.append({'set': re.sub(r'\s*\((\+£[\d,.]+|\d+ Irons)\)', '', o.get('set') or '').strip(), 'shaft': o.get('shaft') or '', 'flex': o.get('flex') or '', 'price': float(v['price']), 'available': v['available']})
    stocked = 'stocked product' in p['tags'] or 'order on demand' not in p['tags']
    fams.setdefault(key, {'id': key, 'brand': p['vendor'], 'name': re.sub(r'^(' + re.escape(p['vendor']) + r'|' + re.escape(p['vendor'].split()[0]) + r')\s*', '', base), 'members': [], 'custom': False})
    f = fams[key]
    f['custom'] = f['custom'] or 'club-builder' in p['tags']
    intro, more = clean_desc(p.get('body_html'))
    f['members'].append({'handle': p['handle'], 'shaftType': shaft, 'finish': finish, 'stocked': stocked, 'variants': vs,
                         'from': min(x['price'] for x in vs if x['available']), 'images': [i['src'] for i in p['images'][:4]], 'intro': intro, 'more': more,
                         'ladies': 'ladies' in p['title'].lower() or 'women' in p['title'].lower()})

out = []
for f in fams.values():
    f['members'].sort(key=lambda m: (m['shaftType'] != 'Steel', m['finish'] != 'Standard'))
    f['from'] = min(m['from'] for m in f['members'])
    f['stock'] = 'in' if any(m['stocked'] for m in f['members']) else 'order'
    f['shafts'] = sorted({m['shaftType'] for m in f['members']})
    f['sets'] = sorted({v['set'] for m in f['members'] for v in m['variants'] if v['set']}, key=lambda s: (s[0], len(s)))
    f['flexes'] = sorted({v['flex'] for m in f['members'] for v in m['variants'] if v['flex']})
    lead = f['members'][0]
    if not lead['images']: continue
    for i, u in enumerate(lead['images'][:3]):
        save(u, f"{f['id']}-{i}", 800)
    save(lead['images'][0], f"{f['id']}-0", 400)
    f['gallery'] = [f"{f['id']}-{i}" for i in range(min(3, len(lead['images'])))]
    for m in f['members']: m.pop('images')
    out.append(f)
out.sort(key=lambda f: (f['brand'], f['from']))
json.dump({'_source': 'Public product feed (read-only) for /collections/iron-sets and /collections/ladies-golf-irons, 24 Nov 2026. Listings that differ only by shaft material or finish are grouped; builder-only (Custom) listings are left to the club builder.', 'families': out}, open(OUT, 'w'), indent=1, ensure_ascii=False)
print(len(out), 'iron models;', sum(len(f['members']) for f in out), 'listings')
