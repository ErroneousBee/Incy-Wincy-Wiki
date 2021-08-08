App.Plugins.Demo = {

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
    async onpageload(json, html, element) {

        // Load HTML into a page and fiddle with it.
        const page = document.createDocumentFragment();
        page.innerHTML = html

        // Show it!
        element.innerHTML = "";
        element.appendChild(page);
    }
}