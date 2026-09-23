"""Genereer public/_redirects (Netlify-formaat) uit scrape/redirects.csv."""
import csv, pathlib, re
root = pathlib.Path(__file__).resolve().parent.parent
lines = ["# Gegenereerd door scripts/build-redirects.py uit scrape/redirects.csv — niet met de hand wijzigen."]
for row in csv.DictReader(open(root / "scrape/redirects.csv", encoding="utf-8")):
    old, new, status = row["oude_url"], row["nieuwe_url"], row["status"]
    if status != "301" or old == new:
        continue
    m = re.match(r"^(/[^?]*)\?(\w+)=(.+)$", old)
    if m:
        # Query-redirect: Netlify ondersteunt query-matching; Cloudflare Pages niet → testen na hostingkeuze.
        lines.append(f"{m.group(1)}  {m.group(2)}={m.group(3)}  {new}  301!")
    else:
        lines.append(f"{old}  {new}  301")
(root / "public/_redirects").write_text("\n".join(lines) + "\n", encoding="utf-8")
print("\n".join(lines))
