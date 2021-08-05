App.Plugins.Search = {

    /**
     * Executed when config is read and it sees the plugin is to be loaded.
     */
    async initialise() {

        // Add the icon to the toolbar
        console.log("Search plugin page load");

        const template = document.getElementById("lunr_search_icon_template").content.cloneNode(true);;
        document.getElementById("main_toolbar").appendChild(template);
        //html body div.container main header div.toolbar

        // Click on the search icon
        document.querySelector("header span.search").onclick = () => {
            App.set_url(Config.search); // TODO: call the page loader
        }

    },

    /**
     * Executed when the markdown page is read and converted. 
     * We will have to render the content os the article here.
     * @param {Object} json - Frontmatter object, pulled from the markdown file.
     * @param {String} html - The markdown after its been converted to html.
     * @param {HTMLElement} element - The article element that any content should be inserted into.
     */
    async onpageload(json, html, element) {

        console.log("Search Activated")
    }

}