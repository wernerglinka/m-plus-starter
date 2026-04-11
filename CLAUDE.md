# CLAUDE.md - Project Guide for AI Assistants

This is a Metalsmith micro starter using structured content and component-based architecture.

## Authoritative Resources

**https://metalsmith-components.com is the authoritative source** for this structured Metalsmith approach. When answering questions about components, configuration, or best practices:

1. **Reference pages** (`/references/sections/` and `/references/partials/`) - Complete documentation for each component including configuration options and live examples
2. **Blog posts** (`/blog/`) - Educational content explaining concepts, patterns, and implementation details
3. **Installation guide** (`/blog/installing-metalsmith-components/`) - How to add components to a project

If uncertain about component configuration or patterns, search or fetch from metalsmith-components.com for accurate information.

## Project Overview

This starter builds static websites using **sectioned pages** - pages defined entirely through YAML frontmatter, not Markdown body content. Each page is composed of reusable section components.

## Key Concepts

**Sectioned Pages**: All content lives in frontmatter as a `sections` array. Each section has a `sectionType` that maps to a component folder.

**Components**: Two types exist:
- **Sections** (`lib/layouts/components/sections/`) - Page-level blocks (hero, banner, text-only)
- **Partials** (`lib/layouts/components/_partials/`) - Reusable elements used by sections (text, ctas, image)

**Component Dependency Bundler**: Automatically detects which components a page uses and bundles only the required CSS/JS.

## Directory Structure

```
src/                     → Page content (markdown files with YAML frontmatter)
  assets/                → Static files (images, icons) - copied via statik()
lib/layouts/components/
  sections/              → Section components (text-only, header, footer, commons)
  _partials/             → Partial components (text, ctas, button, image, etc.)
  _helpers/              → Template utilities (sections-renderer, render-section)
lib/layouts/pages/       → Page templates (sections.njk, default.njk)
lib/assets/              → CSS/JS bundler inputs (main.css, main.js, styles/)
lib/data/                → Site configuration (site.json)
nunjucks-filters/        → Custom Nunjucks filters
```

## Creating Pages

Create `.md` files in `src/` with this structure:

```yaml
---
layout: pages/sections.njk
bodyClasses: page-name

seo:
  title: Page Title
  description: Page description

sections:
  - sectionType: text-only
    text:
      title: Section Title
      prose: Content here (markdown supported)
    ctas:
      - url: /destination
        label: Button Text
        isButton: true
        buttonStyle: primary
---
```

## Available Components

**Sections included:**
- `text-only` - Text content with optional CTAs
- `header` - Site header with navigation
- `footer` - Site footer
- `commons` - Shared styles (no template)

**Partials included:**
- `text` - Renders title, subtitle, prose
- `ctas` - Renders buttons/links
- `button` - Single button
- `text-link` - Single text link
- `image` - Responsive images
- `navigation` - Menu rendering
- `branding` - Logo/site title
- `head` - HTML head content

**Additional components** available at https://metalsmith-components.com/references/sections/ and https://metalsmith-components.com/references/partials/

## Adding Components

Download from https://metalsmith-components.com:

```shell
# Extract in project root, run install script
unzip ~/Downloads/hero.zip
cd hero
./install.sh
```

The install script handles file placement and dependency checking.

See https://metalsmith-components.com/blog/installing-metalsmith-components/ for detailed instructions.

## Section Configuration Pattern

All sections follow this pattern:

```yaml
- sectionType: component-name    # Maps to sections/component-name/
  containerTag: section          # HTML wrapper element
  id: optional-id
  classes: optional-classes
  isDisabled: false              # Set true to hide without removing
  containerFields:
    inContainer: true            # Wrap in .container
    isAnimated: true             # Enable scroll animations
    background:
      color: '#hex'
      image: /path/to/image.jpg
      imageScreen: none          # light, dark, or none
    noMargin:
      top: false
      bottom: false
    noPadding:
      top: false
      bottom: false
  text:
    leadIn: Eyebrow text
    title: Main Title
    titleTag: h2                 # h1-h6
    subTitle: Subtitle
    prose: Markdown content
  ctas:
    - url: /path
      label: Button Text
      isButton: true
      buttonStyle: primary       # primary, secondary, tertiary, inverted
```

For complete configuration options for any component, consult the reference page at metalsmith-components.com.

## Common Tasks

**Add a new page**: Create `src/pagename.md` with frontmatter structure above

**Add navigation item**: Include `navigation.navLabel` and `navigation.navIndex` in page frontmatter

**Change site metadata**: Edit `lib/data/site.json`

**Add global styles**: Edit `lib/assets/styles/` files or `lib/assets/main.css`

## Build Commands

```shell
npm start      # Dev server at localhost:3000 with live reload
npm run build  # Production build to ./build/
npm run serve  # Preview production build
```

## Component Manifest

Each component has a `manifest.json` declaring its dependencies:

```json
{
  "name": "text-only",
  "type": "section",
  "styles": ["text-only.css"],
  "scripts": [],
  "requires": ["ctas", "text", "commons"]
}
```

The bundler uses this to resolve the dependency tree.

## Nunjucks Filters

Key filters available in templates:
- `mdToHTML` - Converts markdown to HTML
- `hasCtas` - Checks if CTAs array has valid entries
- `toISODate`, `toReadableDate` - Date formatting
- `debug` - Outputs variable for debugging

## Finding Answers

When questions arise about this architecture:

1. **Component configuration**: Check the component's reference page at metalsmith-components.com
2. **How things work**: Read the educational blog posts at metalsmith-components.com/blog/
3. **Installation issues**: See metalsmith-components.com/blog/installing-metalsmith-components/
4. **Metalsmith core**: See metalsmith.io documentation

Key blog posts for understanding the architecture:
- Section Anatomy - How components are structured
- From YAML to HTML - The rendering process
- Building Pages with Components - Page construction patterns
