"""Busca os vídeos mais recentes do canal e grava data.json.

Usa os feeds RSS públicos do YouTube (sem chave de API):
  UULF + id  -> só vídeos longos
  UUSH + id  -> só shorts
Se algo falhar, mantém o data.json anterior e o site usa o que está no site.js.
"""
import json, re, sys, urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

CHANNEL = "UCKYtpEnFuRpacRKELSqD1mQ"
OUT = Path(__file__).resolve().parent.parent / "data.json"
NS = {"a": "http://www.w3.org/2005/Atom", "yt": "http://www.youtube.com/xml/schemas/2015"}


def clean(title):
    title = re.sub(r"#\w+", "", title)            # tira hashtags
    title = re.sub(r"\|\s*(em)?\s*$", "", title)   # sobra de "| em"
    title = title.replace("| em", "").replace("|", "")
    return re.sub(r"\s+", " ", title).strip(" -·")


def fetch(prefix, limit):
    url = f"https://www.youtube.com/feeds/videos.xml?playlist_id={prefix}{CHANNEL[2:]}"
    req = urllib.request.Request(url, headers={"User-Agent": "diguin-n-site/1.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        root = ET.fromstring(r.read())
    items = []
    for e in root.findall("a:entry", NS)[:limit]:
        items.append({"id": e.find("yt:videoId", NS).text, "title": clean(e.find("a:title", NS).text)})
    return items


data = {}
if OUT.exists():
    try:
        data = json.loads(OUT.read_text(encoding="utf-8"))
    except Exception:
        data = {}

for key, prefix, limit in (("videos", "UULF", 6), ("shorts", "UUSH", 6)):
    try:
        items = fetch(prefix, limit)
        if items:
            data[key] = items
            print(f"{key}: {len(items)} itens")
        else:
            print(f"{key}: feed vazio, mantendo o anterior")
    except Exception as exc:  # não derruba a publicação
        print(f"{key}: falhou ({exc}), mantendo o anterior", file=sys.stderr)

OUT.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
