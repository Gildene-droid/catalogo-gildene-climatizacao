import urllib.request, json, re, html, pathlib, concurrent.futures
from html.parser import HTMLParser
root=pathlib.Path(__file__).resolve().parents[1]
L='https://www.leveros.com.br/'
C='https://www.centralar.com.br/p/'
rows=[
('midea-9k-airvolution',L+'ar-condicionado-split-hw-inverter-midea-ai-airvolution-9-000-btus-r-32-so-frio-220v'),
('midea-12k-airvolution',L+'ar-condicionado-split-hw-inverter-midea-ai-airvolution-12-000-btus-r-32-so-frio-220v'),
('midea-18k-inverter',L+'ar-condicionado-split-hw-inverter-midea-ai-airvolution-18-000-btus-r-32-quentefrio-220v'),
('lg-dual-inverter-12k',C+'ar-condicionado-split-hw-inverter-lg-dual-voice-ia-12000-btus-frio-220v-bifasico-s3-q12ja31k'),
('lg-dual-inverter-18k-qf',L+'ar-condicionado-split-hw-lg-dual-inverter-voice-18-000-btus-r-32-quentefrio-220v-2'),
('samsung-windfree-12k','https://outlet.centralar.com.br/p/ar-condicionado-split-inverter-windfree-connect-samsung-12000-btus-frio-220v-monofasico-ar12cvfamwknaz-outlet-8263.html'),
('gree-9k-split', 'https://outlet.centralar.com.br/p/ar-condicionado-split-hi-wall-inverter-r-32-g-classic-gree-9000-btus-frio-220v-monofasico-gwc09ata-d6dna2c-i-outlet'),
('daikin-12k-r32',L+'ar-condicionado-split-hw-r-32-inverter-daikin-ecoswing-12-000-btus-so-frio-220v'),
('fujitsu-12k-airstage',L+'ar-condicionado-split-hw-inverter-airstage-essencial-fujitsu-12-000-btus-r-32-so-frio-220v'),
('elgin-eco-dream',L+'ar-condicionado-split-hw-elgin-eco-dream-inverter-wi-fi-9-000-btus-r-32-so-frio-220v'),
('elgin-piso-teto-36k',L+'ar-condicionado-split-piso-teto-inverter-eco-r-32-elgin-36-000-btus-so-frio-220v-monofasico'),
('agratto-12k-split',L+'ar-condicionado-split-hw-inverter-agratto-zen-9-000-btus-r-32-so-frio-220v'),
('electrolux-12k-split',C+'ar-condicionado-split-hi-wall-inverter-r-32-electrolux-color-adapt-wi-fi-12000-btus-frio-220v-yi12f'),
('lg-multi-split-24k',L+'ar-condicionado-multi-split-inverter-lg-24-000-btus-2x-evap-hw-12-000-quentefrio-220v'),
]
class Parser(HTMLParser):
 def __init__(self): super().__init__(); self.images=[];self.title=''
 def handle_starttag(self,t,a):
  d=dict(a)
  if t=='img':
   u=d.get('src','')
   if '/produto/imagem/' in u or ('centralar' in u and '/produtos/' in u): self.images.append((u,d.get('alt','')))
  if t=='meta' and d.get('property')=='og:image': self.images.insert(0,(d.get('content',''),''))
def fetch(row):
 id,url=row
 try:
  req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
  s=urllib.request.urlopen(req,timeout=35).read().decode();p=Parser();p.feed(s)
  imgs=list(dict.fromkeys(u for u,a in p.images if u.startswith('http')))
  if not imgs: raise ValueError('No product photo')
  u=imgs[0];data=urllib.request.urlopen(u,timeout=35).read()
  if len(data)<1000: raise ValueError('Photo too small')
  ext='.png' if data.startswith(b'\x89PNG') else '.jpg'
  path='fotos/'+id+ext;(root/'public'/path).write_bytes(data)
  h1=re.search(r'<h1[^>]*>(.*?)</h1>',s,re.S)
  title=html.unescape(re.sub('<[^>]+>','',h1.group(1))).strip() if h1 else ''
  return {'id':id,'page':url,'imageURL':u,'image':path,'sourceTitle':title,'bytes':len(data)}
 except Exception as e:return {'id':id,'error':str(e)}
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as ex: results=list(ex.map(fetch,rows))
(root/'photo-sources.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
for r in results: print(r)
