---
title: Getting Started with PortaWiki
---

Installing Software
===================

To best manage a PortaWiki website use Microsoft VS Code to edit the pages, and Node.js for task automation.

* Download and Install [Node.js](https://nodejs.org) 

* Download and Install [VS Code](https://code.visualstudio.com/)

* Start VS Code and install the VS Code Live Server plugin:
    ![Install Live Server](content/installliveserver.png "Click on the Extentions Icon ( the leftmost bar ) and search for 'live server'")

* You may also need to install the `git` and `npm` tools. Search the Internat for instructions.

Get your PortaWiki Copy
=======================

Download the Portawiki source from github. Use the command `git clone https://github.com/ErroneousBee/PortaWiki.git`

To make this project your own:
* delete the `.git` folder.
* Change the name of the directory from "PortaWiki" to whatever you choose it to be. 
* Advanced git users can choose to use more advanced methods, such as forking the project.

Open the `PortaWiki` folder in VS Code.

Configuration
=============

Open file `config.yaml`, replace the "title:" value with your own site title. Dont let it be too long. 

No need to change anything else for now.

Create Page Creation
=============

Edit file `content/Home.md`

Change it to suit your website home page.

Navigation Menus
================

Edit files `content/assets/headernav.md ` and `content/assets/headernav.md`

These become the navigation bars on the left and along the top of the page. 

Graphics
========

You will need image editing tools to greate graphics and edit photos. I recommend [GIMP](https://gimp.org/) and [Inkscape](https://inkscape.org/).

Create an logo image to replace the bee example. SVG or PNG are suitable file formats for this job. 

Create a webicon to replace favicon.ico

See your Site in Live Preview
=============================

In VS Code, right click on the `index.html` file and select "Open with Live Server". Your website should appear in a browser window. 

Source Control on GitHub
========================

Create a GitHub account, and host the source repository on there. This makes it easy to deply onto hosting services such as Netlify.

Deploy
======

Create a deployable website using the command `npm run build`. This creates everything needed to host your website in the `target/` folder.

### Deploy On Netlify

Get a Netligy account

### On an Amazon S3 Instance

### In your own Apache HTTPD instance.


