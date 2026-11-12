# SellerCalc — free business calculators

A responsive, static English-language website with five client-side calculators.

## Included
- Product Pricing Calculator
- Profit Margin Calculator
- Break-Even Calculator
- Hourly Rate Calculator
- Shipping Profit Calculator
- Home, About, Contact, Privacy Policy and Terms pages
- Basic sitemap, robots.txt and favicon

## Run locally
Open `index.html` in a browser. No build step, framework, package manager or backend is required.

For a local web server, run from this directory:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

## Free deployment with Cloudflare Pages
1. Create a GitHub account if you do not already have one.
2. Create a new public or private repository and upload the contents of this folder (the files inside `sellercalc`, not the parent folder).
3. In Cloudflare, open **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
4. Select your repository.
5. For a plain static site, leave the build command empty and set the output directory to `/` (or the repository root, depending on the dashboard wording).
6. Deploy. Cloudflare will provide a `*.pages.dev` address.
7. Test every page and calculator on desktop and mobile.

You can also use another static host that serves plain HTML/CSS/JS.

## Before public launch — important
- Replace `YOUR-DOMAIN.example` in `robots.txt` and `sitemap.xml` with the final canonical URL. If using a `pages.dev` address, use that.
- Replace the placeholder contact email and operator details.
- Review and adapt `privacy.html` and `terms.html` to your real business, jurisdiction and enabled services. These are drafts, not ready-made legal advice.
- Add a consent management platform before loading non-essential analytics or advertising technologies where required, including for relevant EEA/UK visitors.
- Add analytics only after updating your privacy notice and consent setup.
- Apply to an advertising network only after the site has useful original content and meets the network's current policies. Approval is not guaranteed.
- Clearly disclose affiliate links wherever used.
- Do not add ad scripts until the relevant account is approved and consent requirements are addressed.

## Technical notes
- Calculator calculations run locally in the visitor's browser; inputs are not sent to a server by this starter website.
- No external JavaScript libraries are required.
- Google Fonts is loaded from Google Fonts; remove the `@import` in `styles.css` if you prefer a fully self-hosted font setup.
- Currency selection changes the currency formatting only; it does not convert exchange rates.
