# 
Incy-Wincy-Wiki 
A small self hosting Wiki system that lives in a source repository.

This is intended for creating small websites, perhaps its a small charity or club. 

It can also be used inside another repository for hosting developer notes.

More details at the [
Incy-Wincy-Wiki  Site](https://Incy-Wincy-Wiki.netlify.app)

## Get Started 

* Install VS Code
* Install the VS Code "Live Server" Plugin
* git clone this repo onto your machine
* Open the new folder in VS Code

## Configure

* Edit "config.yaml", start by setting a Page Title
* Follow the comments in the yaml file for further customisation

## Open Website

* In VS Code, open file "index.html" in Live Server
* Create markdown files in the content/ folder

## Deploy website onto the Internet

* Hostable on Netlify, Amazon S3, or any other static hosting service.

## Hosting your content in a git repo

You can host your own content, and subtree it into the wiki

```bash
git remote add ACGWebSite git@github.com:ErroneousBee/ACGWebSite.git
git subtree add --prefix=ACGWebSite/ ACGWebSite main --squash
```

To push content to the correct place: 

```bash
git subtree push --prefix=ACGWebSite ACGWebSite main
```

git-subrepo works too.
