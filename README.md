# Dharma Teja — Portfolio

A cinematic, scroll-driven portfolio for a Data Center Engineer at Dell Technologies on the path to Network Engineer.
Plain HTML, CSS and JavaScript. No framework, no build step. Three.js loads from a CDN for the 3D chapters.

## Run it

Double-click `index.html`, or serve the folder:

```bash
python -m http.server 4173
```

Then open <http://localhost:4173>.

## The flow

| # | Chapter | Driven by |
| --- | --- | --- |
| 01 | **Hero**: data-hall light, portrait, giant name, iDRAC-style notification | timed entrance, then cursor parallax |
| 02 | **Where Hardware Meets the Network**: type rises through masks, chips pop out | scroll (pinned, scrubbed) |
| — | **Puzzle transition**: the composition breaks into clipped pieces | scroll |
| 03 | **About Me**: three doors, Who I Am · What I Do · How I Think | click |
| 04 | **Case Files**: hidden chapter behind a black flash, 3D camera dolly through six cases | click "What I Do" or "Case Files", then scroll |
| 05 | **The Floor**: a live 3D rack that follows the cursor; idea panels fly past | mouse + scroll |
| — | **Break/Fix Lab**: find the amber LED and work a Dell Plan of Action | click |
| 06 | **The Method**: statement from the left, skills from the right, one at a time | scroll (pinned, scrubbed) |
| 07 | **Roadmap**: 3D network topology of the path to network engineer, plus a subnetting drill | drag, click, type |
| 08 | **Footer**: contact links | — |

Clicking the amber server in chapter 05 pulls it onto the bench in the lab, and closing the ticket in the lab turns it blue again.

## Add your photo

1. Put your portrait in `assets/`, for example `assets/portrait.jpg` (around 1200×1500, dark background works best).
2. In `content.js`, set `photo: "assets/portrait.jpg"`.

Until then, a lit silhouette placeholder shows.

## Editing

All copy lives in `content.js`. Change the strings, save, refresh.
To add a case file, add one entry to `works.projects` (glyph options: `drive`, `rack`, `term`, `graph`, `bolt`, `box`).
To update roadmap progress, change a hop's `status` to `done`, `active` or `planned`.

## Publish on GitHub Pages

1. Push this folder to a repository.
2. Repository → Settings → Pages → Deploy from branch → `main` / root.

## Behaviour

- Responsive layouts for tablet and phone.
- `prefers-reduced-motion` gets a calm, static, fully readable version.
- Without WebGL, the 3D views fall back and the lab still works.
- 3D rendering pauses when off-screen.
