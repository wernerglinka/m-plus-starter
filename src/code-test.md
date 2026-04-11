---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

navigation:
  navLabel: 'Code Test'
  navIndex: 0

seo:
  title: 'Build by'
  description: 'A micro Metalsmith Starter to build modern websites with CLAUDE.'
  socialImage: ''
  canonicalURL: ''

sections:
  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: 'My New Website'
      title: Code Test
      titleTag: 'h1'
      subTitle: '...with Shiki'
      prose: |-
        ## Configuration

        ```yaml
        - sectionType: rich-text
          containerTag: article
          # container settings

          text:
            leadIn: 'Introduction'
            title: 'Welcome to Our Platform'
            titleTag: 'h2'
            subTitle: 'Everything you need to know'
            prose: |-
              This is an example of a rich-text section with all text elements populated.
              The prose content supports **markdown formatting**.
          ctas:
            - url: 'https://example.com/docs'
              label: 'Read Documentation'
              isButton: true
              buttonStyle: 'primary'
        ```

        #### Configuration Options

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `text.leadIn` | string | No | Optional introductory text above the title |
        | `text.title` | string | No | Main heading text |
        | `text.titleTag` | string | No | HTML heading tag (h1-h6) |
        | `text.subTitle` | string | No | Optional subtitle below the main title |
        | `text.prose` | string | No | Markdown-formatted body content |
        | `ctas` | array | No | [Optional array](/references/partials/ctas/) of call-to-action buttons or links |

        ```javascript
        /**
        * Example JavaScript function with JSDoc comments
        * @param {string} name - The name to greet
        * @returns {string} Greeting message
        */
        function greet(name) {
          return `Hello, ${name}!`;
        }

        // Usage example
        const message = greet('World');
        console.log(message); // Output: Hello, World!

        // ES6 arrow function version
        const greetArrow = (name) => `Hello, ${name}!`;
        ```

        ```nunjucks
        {% from "components/_partials/ctas/ctas.njk" import ctas %}
        {% from "components/_partials/text/text.njk" import text %}

        <div class="content container">
          {% if section.text %}
            <div class="text flow">
              {% if section.text %}
                {{ text(section.text)}}
              {% endif %}
              {% if section.ctas | hasCtas %}
                {{ ctas(section.ctas) }}
              {% endif %}
            </div>
          {% endif %}
        </div>
        ```
---
