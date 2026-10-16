# Pankaj Kumar — Portfolio

Personal site of Pankaj Kumar, .NET Full Stack Developer. It's a single-page portfolio with a case-study page for each project.

**Stack:** React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui (Radix) · cmdk

## Features

- Dark theme with a cut-out portrait hero and colour brand logos in the skills section
- `Ctrl/⌘ + K` command menu to jump to sections and projects or copy the email address
- Contact form that delivers to the inbox through FormSubmit, falling back to the visitor's mail client
- Case-study pages (`/projects/:slug`) with a sticky table of contents and previous/next navigation
- All content lives in typed data files, so most edits don't touch any components
- Accessible markup: semantic landmarks, a skip link, visible focus states and `prefers-reduced-motion` support

## Getting started

```sh
npm install
npm run dev      # http://localhost:8080
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Editing content

| What                                    | Where                  |
| --------------------------------------- | ---------------------- |
| Name, contact, socials, experience, education, skills | `src/data/profile.ts`  |
| Projects and case studies               | `src/data/projects.ts` |
| Colors and theme tokens                 | `src/index.css`        |

Years of experience is calculated from `profile.careerStart`, so it updates on its own.

## Project structure

```
src/
  components/   page sections (Hero, About, Projects, …) and shared UI
  components/ui shadcn/ui primitives
  data/         typed content
  pages/        routes: home, project case study, 404
  lib/          small helpers
```
