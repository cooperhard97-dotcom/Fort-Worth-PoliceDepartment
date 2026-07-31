# Fort Worth Police Department — RP Command Portal

A static roleplay command portal (handbook, SOPs, policies, command staff, and radio codes) for a fictional GTA/FiveM-style roleplay server. Pure HTML/CSS/JS — no build step, no dependencies beyond a Google Fonts link.

## File structure

```
.
├── index.html        # Page markup
├── css/
│   └── styles.css    # All styling
├── js/
│   └── script.js     # Search, theme toggle, radio code table, scroll effects
└── .nojekyll         # Tells GitHub Pages to skip Jekyll processing
```

## Deploying to GitHub Pages

1. Create a new GitHub repository (or use an existing one) and push these files to it, keeping `index.html` at the repository root (or in a `/docs` folder — see step 3).
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
2. On GitHub, go to your repository's **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, select `main` and the folder `/ (root)` — or `/docs` if you placed the files there — then click **Save**.
5. GitHub will publish the site at:
   ```
   https://<your-username>.github.io/<your-repo>/
   ```
   It usually takes a minute or two for the first deployment to go live.

## Local preview

Because the page loads CSS/JS via relative paths, opening `index.html` directly in a browser works fine for a quick look. For a closer match to how it'll behave when served (and to avoid any browser file:// quirks), you can also run a tiny local server from this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.
