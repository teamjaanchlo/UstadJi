# UstadJi — Setup Guide

## Files List
- `index.html` — Poori app (yeh GitHub par upload karo)
- `sw.js` — Service Worker (offline ke liye)
- `manifest.json` — PWA settings
- `apps-script.gs` — Google Sheets integration code
- `icon-192.png` aur `icon-512.png` — App icons (aapko khud banana hoga)

---

## Step 1 — Google Apps Script Setup

1. Apni Google Sheet kholein:
   https://docs.google.com/spreadsheets/d/1_HCuMUfLVTbKZV7fMzrI489QnH1z5P6O8rkYUU6NxO4

2. **Extensions > Apps Script** click karein

3. Purana code delete karein, `apps-script.gs` ka poora code paste karein

4. **Save** (Ctrl+S)

5. **Deploy > New Deployment**
   - Type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Deploy!

6. URL copy karein (kuch aisa dikhega):
   `https://script.google.com/macros/s/XXXXXXX/exec`

7. `index.html` mein yeh line dhundho:
   ```
   const SHEET_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
   ```
   Aur apna URL wahan paste karo.

---

## Step 2 — App Icons Banana

App icon ke liye:
- https://favicon.io ya https://canva.com use karein
- "U" letter red background par banao
- 192x192 aur 512x512 PNG save karein
- `icon-192.png` aur `icon-512.png` naam rakhein

---

## Step 3 — GitHub Pages par Deploy

1. GitHub.com par account banao (free)
2. New repository banao: `ustadji` naam rakhein
3. **Public** rakhein
4. Yeh files upload karein:
   - index.html
   - sw.js
   - manifest.json
   - icon-192.png
   - icon-512.png

5. Settings > Pages > Source: **main branch** select karein

6. App ka URL milega:
   `https://[aapka-username].github.io/ustadji`

---

## Step 4 — Android par Install

1. Chrome browser mein apna URL kholein
2. Browser ke 3 dots menu mein jayen
3. **"Add to Home Screen"** click karein
4. Install karein — app bilkul native app ki tarah kaam karegi!

---

## Security Notes

- Passwords locally encrypt ho ke store hote hain
- Google Sheet mein sirf naam, phone, email aur date jata hai
- Koi password Sheet mein nahi jata
- Videos youtube-nocookie.com se embed hain — users app ke bahar nahi jaatay

---

## Aapka Data — Google Sheet Columns

### Users Sheet:
| Naam | Phone | Email | Signup Date | City | Platform |

### Activity Sheet:
| Naam | Email | Course ID | Course Title | Date |
