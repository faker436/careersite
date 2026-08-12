# Career Site

A full career page + application form built with React + Vite.

## Features
- Filterable job listings by department
- Job detail pages with hiring process
- 4-step application form with validation
- Video introduction recorder (MediaRecorder API)
- Camera driver helper modal with OS-specific commands

## Project structure

```
career-site/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                   # React entry point
    ├── App.jsx                    # Router (careers / detail / apply)
    ├── data/
    │   └── constants.js           # All data: jobs, perks, values, etc.
    └── components/
        ├── UI.jsx                 # Shared atoms: FocusInput, Field, Btn, etc.
        ├── Nav.jsx                # Sticky top nav
        ├── StepBar.jsx            # Step progress bar for apply form
        ├── DriverModal.jsx        # Camera driver warning modal
        ├── VideoIntro.jsx         # Video recorder component
        ├── CareerPage.jsx         # Main careers listing page
        ├── JobDetailPage.jsx      # Individual job detail page
        └── ApplyPage.jsx          # 4-step application form
```

## Getting started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Customization

- **Jobs, perks, values, team** — edit `src/data/constants.js`
- **Company name** — search and replace `Arclight` across files
- **Colors** — edit `DEPT_COLORS` in `constants.js` and inline styles
- **Email for general applications** — update the `mailto:` in `CareerPage.jsx`
