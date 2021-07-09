---
title: PortaWiki TODO List of Features.
keywords: todo development
---

# Immediate Things

* Search Back button.


# Features to be developed

* Fix explicit filetypes in link going missing.
* Have theme overridable in the frontmatter
* Improve "Not Loaded" error page.
* Make Yaml errors visible, or at least less obscure in the console.
* Cache pages on load into a json structure
* Highlight current sidebar location from URL
* Search 
    * Make back button after search link work.
    * Try and get it to offer options on incomplete words
* Introduce plugin architecture and make Search be a plugin.

# Behavior from URL

Has a suffix? ->
    We have that document? -> 
        Is a known suffix -> Load into view area, keep URL as is.
        Not known Suffix? -> Open in new Tab
    Don't Have document? -> Show error page, keep URL as is.

Is a Path? -> 
    We have a Match? -> Load it into view area, keep URL as is.
    We dont Have that document? -> Show error page, keep URL as is.

# Behaviour from Link

Is Fully qualified? -> Set URL to match. Drive behaviour from URL.






