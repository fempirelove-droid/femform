from pathlib import Path
import re

raw = Path("src/pages/HomePage.tsx").read_bytes()
idx = raw.find(b"Cura")
print("first Cura", idx, raw[idx : idx + 12])
idx2 = raw.find(b"Loading")
print("Loading", raw[idx2 : idx2 + 14])
for m in re.finditer(rb"title: '[^\n]{0,90}", raw):
    print(m.group())
    break
print("fffd utf8", raw.count(bytes([0xEF, 0xBF, 0xBD])))
print("0xb7", raw.count(bytes([0xB7])))
print("0xe7", raw.count(bytes([0xE7])))
print("c3a7", raw.count(bytes([0xC3, 0xA7])))
print("0x92", raw.count(bytes([0x92])))  # windows smart quote
print("0x85", raw.count(bytes([0x85])))  # windows ellipsis
