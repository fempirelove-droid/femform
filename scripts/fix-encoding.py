"""Convert src page files from Windows-1252 (or mixed) to clean UTF-8."""
from pathlib import Path

ROOTS = [Path("src/pages"), Path("src/components"), Path("src/lib")]


def decode_best(raw: bytes) -> str:
    try:
        return raw.decode("utf-8")
    except UnicodeDecodeError:
        return raw.decode("cp1252")


changed = []
for root in ROOTS:
    if not root.exists():
        continue
    for f in sorted(root.rglob("*.tsx")) + sorted(root.rglob("*.ts")):
        raw = f.read_bytes()
        text = decode_best(raw)
        # normalize common windows chars already correct as unicode after cp1252 decode
        out = text.encode("utf-8")
        if out != raw:
            f.write_bytes(out)
            changed.append(f.as_posix())

print(f"rewrote {len(changed)} files to UTF-8")
for p in changed:
    print(" ", p)
