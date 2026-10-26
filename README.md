# MONI Interiors — Website

Static single-page website for MONI Interiors (UPVC & PVC interior solutions, Hosur), built from the approved design in `docs/brief/moni_interiors_website-design.html`.

## Structure

```
index.html          Home page (all sections: services, about, projects, process, areas, FAQ, contact)
privacy.html        Privacy policy
404.html            Not-found page
assets/css/         styles.css
assets/js/          main.js (menu, consultation modal → WhatsApp, scroll effects)
assets/img/         Logo (180px for header/favicon, 320px for social sharing)
docs/brief/         Original design file and full-size logo (not deployed)
vercel.json         Clean URLs, caching and security headers
```

No build step. Open `index.html` in a browser, or deploy the folder to Vercel.

## Before launch — confirm with client

- [ ] **Domain** — `https://www.moniinteriors.com` is a placeholder in `index.html` (canonical, Open Graph, JSON-LD), `privacy.html`, `robots.txt` and `sitemap.xml`.
- [ ] **Project photos** — all images are Unsplash stock. Replace with real MONI Interiors project photos.
- [ ] **Second phone number** (73974 16967) — left out until confirmed.
- [ ] **Address pincode** — not supplied.
- [ ] **Warranty claims** (15-year material / 5-year hardware) and **Polywood authorised distributor** status.
- [ ] **Stats** — 10 years experience, 500+ projects.
