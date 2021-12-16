---
title: PortaWiki TODO List of Features.
keywords: todo development
---

# Bugs and whatnot

* Nav to #TODO problem ( path "#TODO" file "TODO/Home.md" links to "Tasks" should try "#TODO/Tasks" )


# General improvements

* Improve "Not Loaded" error page.
* Make Yaml errors visible, or at least less obscure in the console.
* Behavior from URL or links
    * Make this feel completly natural
    * Create comprehensive test pages

# Features to be developed

* Highlight current sidebar location from URL
* Internationalisation support for plugins and main page.
* Search 
    * Have input field be on the toolbar
    * Improve indexer to not show markdown markers
    * Try and get it to offer options on incomplete words
    * Back button through Search to include search parms
    * Have it stash sucessful results in the URL path. Use a button in the results, or press enter in the input box.
    * Have input box on toolbar, show results in drop window. Only show page when enter pressed.
* Plugins
    * Quiz - A quiz page that exists as a plugin.
        * Multiple choice
        * click on part of image ( spot the object )
    * Slideshow - Show a slideshow or similar.
    * Image Library - Drop files into a folder and build creates the md file.
    * Cookie acceptance - Those annoying dialogs for accept cookies.
    * Video player/gallery - For hosting small videos.
    * Blog - Mark a directory as having blogs. 
        * What do do about datestamps
        * Introduce a macro into the menus? Not a fan of metaprogramming.
    * Interactive Map
        * W3W location conversion to links or even hover overlay
        * Google Maps support?
    * Redirect. Some way of redirecting pages. Best done by plugin config rather then holding pages.
    * Improve initialise and onpageload error handling.
        * Drop plugins with bad inits ( thrown errors or no init function )
        * Error page for bad plugin onpageloads
        * Test setups?
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
* Reveal Capitalised frontmatter field names ( "Title: My Title" doesnt do anything! )