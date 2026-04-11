<p align="center">
  <a href="https://www.metalsmith.io">
    <img alt="Metalsmith" src="https://www.glinka.co/assets/images/metalsmith2025-logo-bug.png" width="80" />
  </a>
</p>
<h1 align="center">
  Metalsmith Micro Starter
</h1>

A minimal, component-based starter for building Metalsmith websites. This starter provides the essential foundation for the structured content approach - just enough to get a working site with a single "Hello World" page.

Use this starter as a foundation and add components from [metalsmith-components.com](https://metalsmith-components.com) as needed.

## What's Included

This micro starter contains the bare essentials:

- **One section component**: `text-only` - for simple text content with optional CTAs
- **Core partials**: `text`, `ctas`, `button`, `text-link` - the building blocks used by sections
- **Infrastructure partials**: `head`, `navigation`, `branding`, `image` - site-wide elements
- **Header and footer sections**: Basic site structure
- **All Nunjucks filters**: Markdown processing, date formatting, and utilities
- **Complete build system**: componentDependencyBundler, PostCSS, live reload

## Quick Start

Requires Node.js 18 or higher.

```shell
# Clone the starter
git clone https://github.com/wernerglinka/m-plus-starter my-site

# Install and run
cd my-site
npm install
npm start
```

Your site runs at `http://localhost:3000`.

## Adding Components

This starter is designed to grow. Download additional components from [metalsmith-components.com](https://metalsmith-components.com).

### Installing Individual Components

Each component package includes an automated installation script:

```shell
# Navigate to your project root
cd /path/to/my-site

# Extract the downloaded component
unzip ~/Downloads/hero.zip

# Navigate into the extracted folder and run the install script
cd hero
./install.sh
```

The install script will:
- Verify you're in a Metalsmith project
- Check for existing installations and compare versions
- Validate that required dependencies are installed
- Copy component files to the correct locations
- Report any missing dependencies with download links
- Offer to clean up the extracted folder when done

### Installing the Complete Bundle

Download all components at once from [metalsmith-components.com/downloads/metalsmith-components.zip](https://metalsmith-components.com/downloads/metalsmith-components.zip):

```shell
# Navigate to your project root
cd /path/to/my-site

# Extract the bundle
unzip ~/Downloads/metalsmith-components.zip

# Run the master installation script
./metalsmith-components/install-all.sh
```

For detailed installation instructions, see the [Component Installation Guide](https://metalsmith-components.com/blog/installing-metalsmith-components/).

After adding components, restart the dev server. The componentDependencyBundler automatically detects and bundles new components when they're used on a page.

## Project Structure

```
.
├── src/                         # Content
│   ├── assets/                  # Static files (images, icons) - copied via statik
│   ├── index.md                 # Homepage (Hello World)
│   └── 404.html                 # Error page
├── lib/
│   ├── assets/                  # CSS/JS bundler inputs (main.css, main.js, styles/)
│   ├── data/                    # Site configuration (site.json)
│   └── layouts/
│       ├── components/
│       │   ├── _helpers/        # Template utilities
│       │   ├── _partials/       # Reusable elements
│       │   │   ├── text/
│       │   │   ├── ctas/
│       │   │   ├── button/
│       │   │   └── ...
│       │   └── sections/        # Page sections
│       │       ├── text-only/
│       │       ├── header/
│       │       ├── footer/
│       │       └── commons/
│       └── pages/               # Page templates
├── nunjucks-filters/            # Template filters
├── metalsmith.js                # Build configuration
└── package.json
```

## How It Works

Pages are built from **structured content** in frontmatter, not Markdown body text:

```yaml
---
layout: pages/sections.njk

sections:
  - sectionType: text-only
    text:
      title: Hello World
      prose: Your content here.
    ctas:
      - url: /about
        label: Learn More
        isButton: true
        buttonStyle: primary
---
```

Each section references a component in `lib/layouts/components/sections/`. The build system:

1. Scans pages to find which sections are used
2. Resolves component dependencies (sections → partials)
3. Bundles only the CSS/JS needed for each page
4. Applies PostCSS processing (autoprefixer, minification)

## Available Scripts

```shell
npm start      # Dev server with live reload
npm run build  # Production build
npm run serve  # Preview production build
npm run fix    # Format and lint code
```

## Customization

**Site metadata**: Edit `lib/data/site.json`

**Global styles**: Edit files in `lib/assets/styles/`

**Add pages**: Create new `.md` files in `src/` with the sections frontmatter structure

## Deployment

Deploy the `build/` folder to any static host:

- [Netlify](https://www.netlify.com)
- [Vercel](https://vercel.com)
- [Cloudflare Pages](https://pages.cloudflare.com)
- [GitHub Pages](https://pages.github.com)

Build command: `npm run build`  
Publish directory: `build`

## Learn More

- [Metalsmith Documentation](https://www.metalsmith.io)
- [Metalsmith Components Library](https://metalsmith-components.com)
- [Component Installation Guide](https://metalsmith-components.com/blog/installing-metalsmith-components/)
- [Metalsmith Redux Blog Series](https://glinka.co/blog/) - In-depth tutorials on structured content

## License

MIT
