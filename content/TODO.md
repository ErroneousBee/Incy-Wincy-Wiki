---
title: PortaWiki TODO List of Features.
---

# Immediate Things

* Search
* Settings
* Deploy onto S3


# Features to be developed

* Improve "Not Loaded" error page.
* Make Yaml errors visible, or at least less obscure in the console.
* Make navbar width be correct, use flex? http://jsfiddle.net/avbj64u0/19/
* Cache pages on load into a json structure
* Highlight current sidebar location from URL
* Search 
    * Search Page and javascript.
    * Search using a generated index ( lunr.js )
    * Search button is a link to a page that handles all search.
    * Make search icon/input be a loaded HTML snippet
* Build Tool
    * Compile search index
    * Generate all content into index.html templates
    * Has crossover with Search and cache
* Deploy Documentation and Tool
* Woodland theme (to demo advanced setup)

## Config
* Replace config search/settings with path override config, then move Search and whatnot into a non-contents place. Also logo.
* move navs into a place like content/assets/

## Sidebar and Top Navbar

* Make sidebar have accordion abilities
* What happens in sidebar when its a directory
    * Show sublist from sidebar?
    * Show error? (prefer this)
* CSS dropdown menus
    * Topbar could cascade better

