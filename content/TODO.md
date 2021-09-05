---
title: PortaWiki TODO List of Features.
keywords: todo development
---

# Immediate Things

* Back button through Search to include search parms

# General improvements

* Improve "Not Loaded" error page.
* Make Yaml errors visible, or at least less obscure in the console.
* Behavior from URL or links
    * Make this feel completly natural
    * Create comprehensive test pages
* Make frontmatter be able to control article classname `class: something`

# Features to be developed

* Highlight current sidebar location from URL
* Internationalisation support for plugins and main page.
* Search 
    * Try and get it to offer options on incomplete words
    * Have it stash sucessful results in the URL path
* Plugins
    * Quiz - A quiz page that exists as a plugin.
    * Gallery - Show a slideshow or similar.
    * Cookie acceptance - Those annoying dialogs for accept cookies.
    * Video player/gallery - For hosting small videos.
    * Blog - Mark a directory as having blogs. 
        * What do do about datestamps
        * Introduce a macro into the menus? Not a fan of metaprogramming.   
* Make a mobile sidebar slideout
* Make top nav descendants not cascade to badly

# Documentation

* Note when to "npm run build"
    * After you have finished editing conent, to create search index.
    * After plugin code, in case it needs to rebuild something.
    * After an npm install or npm update.

# Create tests

* Report broken links
* Responsive design mode (mobile)
* Search finds PDF and other contents