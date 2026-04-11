---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

navigation:
  navLabel: 'Home'
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
      title: Hello World
      subTitle: 'And here, it begins'
      prose: |-
        This is a micro starter to build a static website with Claude and Metalsmith. When you see this page, you have successfully installed the starter. You can now chat with Claude about what you like to build.

    ctas:
      - url: 'https://metalsmith-components.com'
        label: 'Read about Building a Website with Metalsmith Components'
        isButton: true
        buttonStyle: 'primary'
---
