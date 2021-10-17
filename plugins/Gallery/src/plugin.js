App.Plugins.Gallery = {

    /**
     * Executed when config is read and it sees the plugin is to be loaded.
     */
    async initialise() {
        // Nothing to initialise!
    },

    /**
     * Executed when the markdown page is read and converted. 
     * We will have to render the content os the article here.
     * @param {Object} json - Frontmatter object, pulled from the markdown file.
     * @param {String} html - The markdown after its been converted to html.
     * @param {HTMLElement} element - The article element that any content should be inserted into.
     */
    async onpageload(json, html, element, source) {

        // Load HTML into a page and fiddle with it.
        const template = document.createElement('template');
        template.innerHTML = html;
        const page = template.content;

        const pageURL = new URL(source);
        const path = pageURL.pathname.substring(0, pageURL.pathname.lastIndexOf("/"));

        console.log(path);
        console.log(html);
        console.log(page);

        // Create the grid container
        const grid = document.createElement('div');
        grid.className = "Gallery";

        // Pull all the images from the grid
        for (const img of page.querySelectorAll("img")) {
            const file = img.getAttribute("src");
            img.setAttribute("src", path + '/' + file);

            // Get some caption text from trailing text, or title, or alt text
            let text;
            if (img.nextSibling) {
                text = img.nextSibling.textContent.trim();
            }
            // TODO: Read up to next img or eof
            if (!text) {
                text = img.getAttribute("title");
            }
            if (!text) {
                text = img.getAttribute("alt");
            }

            const figure = document.createElement('figure');
            figure.append(img);
            const caption = document.createElement('figcaption');
            caption.innerText = text;
            figure.append(caption);

            grid.append(figure);

        }

        // TODO: Make some way of setting article width only for this plugin
        // element.style.maxWidth = "100%";

        // TODO: Find a way of keeping header texts

        // Show it!
        element.textContent = '';
        element.appendChild(grid);

        element.querySelectorAll("img").forEach( image => {
            console.log('>>',image);
            image.onmouseover = ( image, event)  => {
                console.log("Hover", image);
            };

            image.addEventListener('click', ( image, event)  => {
                console.log("Click", image);
            });
        });

    }
}