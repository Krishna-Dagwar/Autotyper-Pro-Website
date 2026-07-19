# Autotyper Pro website

This folder contains the official multi-page static product website for Autotyper Pro. It uses ordinary HTML, CSS, and a small vanilla JavaScript file. There is no backend, database, build step, package manager, or server-side rendering requirement.

## Pages

- `index.html` — product introduction and Microsoft Store calls to action
- `features.html` — detailed overview of the complete app feature set
- `screenshots.html` — native-resolution WinUI 3 screenshot gallery
- `rich-text.html` — rich text editing, HTML paste, and plain-text fallback
- `task-recorder.html` — recording, playback, timing, repeat, and safety guidance
- `support.html` — practical troubleshooting and common questions
- `privacy.html` — short privacy summary and official policy link

All pages share `styles.css` and `script.js`.

## Preview locally

The pages can be opened directly from the file system. For the most reliable Microsoft Store badge and navigation testing, use a small local static server:

```powershell
cd website
python -m http.server 8000
```

Then open `http://localhost:8000/`.

No Node.js installation is required.

## Screenshots

Website screenshots are stored in `assets/screenshots/`:

- `main-overview-light.png`
- `main-overview-dark.png`
- `rich-text-editor.png`
- `auto-clicker.png`
- `task-recorder.png`
- `ai-writing.png`
- `human-like-typing.png`
- `settings.png`

The current files are real 2910 × 1660 WinUI 3 app captures copied from `store-listing/screenshots/raw/`. They use sample data and do not contain a real OpenAI API key.

To update a capture, replace the matching PNG without changing its filename. Keep a consistent aspect ratio, do not upscale a small image, and verify that the app window has no clipping, debug UI, personal information, notifications, or real credentials.

## Microsoft Store badge

The official Microsoft badge component is loaded on:

- `index.html` — hero and final call to action
- `features.html` — final call to action
- `screenshots.html` — final call to action
- `support.html` — final call to action

The product ID is `9pc9zs7v5bb6`. A normal Store link appears as a fallback if the remote Microsoft component cannot load.

## Privacy policy

The published privacy policy is:

<https://krishna-dagwar.github.io/auto-typer-pro-privacy/>

It is linked from every page footer, the Privacy page, Support page, and the AI Writing description. Do not replace this URL with an unpublished draft policy.

## Theme and accessibility

- Uses `"Segoe UI Variable", "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif`
- Follows the operating-system colour preference by default
- Includes a manual light/dark theme switch
- Includes skip links, semantic landmarks, visible keyboard focus, labelled controls, and screenshot alt text
- Respects `prefers-reduced-motion`
- Keeps navigation usable with a keyboard and on narrow screens

## Deploy as a static site

### GitHub Pages

Publish the `website/` directory from a repository branch or copy its contents into the selected Pages folder. Choose **Deploy from a branch** in repository Settings → Pages.

### Cloudflare Pages

Create a Pages project, connect the repository, leave the build command empty, and set the output directory to `website`.

### Netlify

Import the repository, leave the build command empty, and set the publish directory to `website`. The folder can also be deployed by drag-and-drop.

### Vercel

Import the repository, choose **Other** as the framework preset, leave the build command empty, and set the output directory to `website`.

After deployment, add the final production URL to canonical and Open Graph URL metadata if desired.

## Content and security rules

- This remains a fully static website.
- Never commit API keys, certificate secrets, `.env` files, customer data, or private logs.
- Never show a real API key in screenshots.
- Keep AI Writing described as optional and user-provided-key based.
- Do not claim that rich formatting works in every target app.
- Keep automation wording productivity-focused and user-controlled.
