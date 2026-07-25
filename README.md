# Niki & Bohuš — svadobná stránka 🌸

Táto stránka beží zadarmo cez GitHub Pages.

**Živá stránka:** https://bopokstefl.github.io/svadba-niki-a-bohus/

## ⚠️ Ešte treba doriešiť

- **Tlačidlo "Potvrdiť účasť" (RSVP)** zatiaľ nikam nevedie (`#rsvp`, len placeholder). Až budete mať odkaz na Google Form, pošlite mi ho a prepojím tlačidlo.

## Ako vymeniť fotky (bez akéhokoľvek programovania)

V galérii ("spolu") aj v rohoch stránky sa používa 13 fotiek s presnými názvami `images/photos/p01.web.jpg` … `p13.web.jpg`.

1. Choďte na https://github.com/BoPokstefl/svadba-niki-a-bohus
2. Otvorte priečinok **images** → **photos**.
3. Kliknite na konkrétnu fotku (napr. `p01.web.jpg`), potom na ceruzku/**Upload** a nahraďte ju novou fotkou **s rovnakým názvom**.
4. Dole kliknite **Commit changes**.

Ak chcete pridať/ubrať fotky alebo zmeniť poradie, napíšte mi a upravím to za vás.

## Ako upraviť text (dátum, mená, miesto...)

Napíšte mi v konverzácii čo zmeniť a upravím súbor `index.html`/`style.css` za vás.

## Technické detaily

- Čistý HTML/CSS/JS, žiadny build proces.
- Hosting: GitHub Pages (vetva `main`, priečinok `/`).
- Dizajn: 7 sekcií (hero, intro, galéria "spolu", detaily, dary, RSVP, footer) podľa handoff dokumentu s watercolour kyticou a polaroid fotkami.
- Fotky boli skomprimované (JPEG q78) a kytica zmenšená z 12 MB na ~1.7 MB, aby stránka rýchlo načítavala aj na mobile.
- Zdroj kytice: stock ilustrácia (Freepik) dodaná v návrhu — pred verejným spustením odporúčam overiť licenciu.
