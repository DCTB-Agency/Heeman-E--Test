"""Fase 0: crawl de huidige site en schrijf per pagina een JSON naar scrape/pages/."""
import json, re, time, html, urllib.request, pathlib
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse

BASE = "https://www.heeman-electrics.be"
UA = {"User-Agent": "Mozilla/5.0 (Fase0-scrape DCTB)"}
OUT = pathlib.Path(__file__).parent
ASSETS = OUT.parent / "assets-in" / "scraped"

def get(url):
    t = time.time()
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        body = r.read()
        return r.status, r.geturl(), body, round(time.time() - t, 3)

class P(HTMLParser):
    def __init__(s):
        super().__init__(); s.stack=[]; s.skip=0; s.cur=None
        s.d={"title":"","meta":{},"og":{},"canonical":None,"headings":[],"images":[],"links":[],"jsonld":[],"text":[]}
    def handle_starttag(s,t,a):
        a=dict(a)
        if t in("script","style","noscript"):
            s.skip+=1
            if t=="script" and a.get("type")=="application/ld+json": s.cur="ld"
        if t=="meta":
            k=a.get("name") or a.get("property")
            if k and k.startswith(("og:","twitter:")): s.d["og"][k]=a.get("content")
            elif k: s.d["meta"][k]=a.get("content")
        if t=="link" and a.get("rel")=="canonical": s.d["canonical"]=a.get("href")
        if t=="img":
            src=a.get("data-src") or a.get("src")
            if src and not src.startswith("data:"): s.d["images"].append({"src":src,"alt":a.get("alt")})
        if t=="a" and a.get("href"): s.d["links"].append(a["href"])
        if t in("h1","h2","h3","title"): s.cur=t; s.buf=""
    def handle_endtag(s,t):
        if t in("script","style","noscript"): s.skip-=1; s.cur=None if s.cur=="ld" else s.cur
        if t==s.cur and t in("h1","h2","h3"): s.d["headings"].append({"level":t,"text":" ".join(s.buf.split())}); s.cur=None
        if t=="title" and s.cur=="title": s.d["title"]=" ".join(s.buf.split()); s.cur=None
    def handle_data(s,x):
        if s.cur=="ld": s.d["jsonld"].append(x); return
        if s.cur in("h1","h2","h3","title"): s.buf+=x
        if not s.skip and x.strip(): s.d["text"].append(" ".join(x.split()))

def sitemap_urls():
    _,_,b,_=get(BASE+"/sitemap_index.xml")
    urls=[]
    for sm in re.findall(r"<loc>([^<]+)",b.decode()):
        _,_,sb,_=get(sm); urls+= [u for u in re.findall(r"<loc>([^<]+)",sb.decode()) if "/wp-content/" not in u]
    return urls

def main():
    report={"probes":{}}
    for path in ["/robots.txt","/sitemap.xml","/wp-sitemap.xml","/sitemap_index.xml"]:
        try:
            st,final,b,dt=get(BASE+path); report["probes"][path]={"status":st,"final_url":final,"seconds":dt}
        except Exception as e: report["probes"][path]={"error":str(e)}
    (OUT/"robots.txt.orig").write_bytes(get(BASE+"/robots.txt")[2])
    queue=sitemap_urls(); seen=set(); pages=[]
    while queue:
        u=queue.pop(0).split("#")[0]
        if u in seen or urlparse(u).netloc!="www.heeman-electrics.be" or "/wp-" in u or re.search(r"\.(jpe?g|png|pdf|webp|svg)$",u): continue
        seen.add(u)
        try: st,final,b,dt=get(u)
        except Exception as e: pages.append({"url":u,"error":str(e)}); continue
        p=P(); p.feed(b.decode("utf-8","replace")); d=p.d
        d["jsonld"]=[x.strip() for x in d["jsonld"] if x.strip()]
        links=sorted(set(urljoin(u,l).split("#")[0] for l in d["links"] if not l.startswith(("mailto:","tel:","javascript:"))))
        d["links"]={"internal":[l for l in links if "heeman-electrics.be" in l],"external":[l for l in links if "heeman-electrics.be" not in l],
                    "mailto_tel":sorted(set(l for l in p.d["links"] if l.startswith(("mailto:","tel:"))))}
        d.update({"url":u,"status":st,"final_url":final,"seconds":dt,"bytes":len(b),
                  "cms_hints":sorted(set(re.findall(r"wp-content/(?:themes|plugins)/[^/\"']+",b.decode("utf-8","replace")))),
                  "tracking":sorted(set(re.findall(r"\b(?:GT|G|GTM|AW)-[A-Z0-9]{6,}\b",b.decode("utf-8","replace"))))})
        d["text"]="\n".join(dict.fromkeys(d["text"]))
        slug=urlparse(u).path.strip("/").replace("/","__") or "home"
        (OUT/"pages"/f"{slug}.json").write_text(json.dumps(d,ensure_ascii=False,indent=2))
        pages.append({"url":u,"status":st,"seconds":dt,"title":d["title"],"description":d["meta"].get("description"),
                      "h1":[h["text"] for h in d["headings"] if h["level"]=="h1"],"jsonld_blocks":len(d["jsonld"]),"images":len(d["images"])})
        queue+= [l for l in d["links"]["internal"] if l not in seen]
        for img in d["images"]:
            src=urljoin(u,img["src"])
            if "/wp-content/uploads/" in src:
                name=src.rsplit("/",1)[-1]; dest=ASSETS/name
                if not dest.exists():
                    try: dest.write_bytes(get(src)[2])
                    except Exception as e: print("img fail",src,e)
    report["pages"]=pages
    (OUT/"crawl-report.json").write_text(json.dumps(report,ensure_ascii=False,indent=2))
    print(json.dumps(report,ensure_ascii=False,indent=2))

if __name__=="__main__": main()
