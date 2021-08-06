App.Plugins.Search = {

    /* global lunr LUNR_DATA LUNR_PREVIEW_LOOKUP */
    index: lunr.Index.load(LUNR_DATA),
    previews: LUNR_PREVIEW_LOOKUP,

    keyup(e) {

        const value = e.target.value;
        const results = App.Plugins.Search.index.search(value);

        if (value === "" || results.length === 0) {
            document.querySelector("div.searchresults").innerHTML = '<hr/>';
            return;
        }

        let html = '<ul>';
        for (const result of results.slice(0, 10)) {

            const preview = App.Plugins.Search.previews[result.ref];

            html += '<li><a href="#' + preview.l + '">';
            html += '<span class="title">' + preview.t + '</span>';
            html += '<span class="link">' + preview.l + '</span><br/>';
            html += '<span class="preview">' + preview.p + '</span>';
            html += '</a></li>';
        }
        html += '</ul>';
        document.querySelector("div.searchresults").innerHTML = html;

    },


    /**
     * Executed when config is read and it sees the plugin is to be loaded.
     */
    async initialise() {

        // Add the icon to the toolbar
        const template = document.getElementById("lunr_search_icon_template").content.cloneNode(true);;
        document.getElementById("main_toolbar").appendChild(template);

        // Click on the search icon
        document.querySelector("header span.search").onclick = () => {
            App.set_url(Config.search); // TODO: call the page loader
            alert("TODO: Open the search");
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

        console.log("Search Activated", json, html, element)
    }

}