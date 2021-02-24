const Search = {

    keyup(e) {


        const value = e.target.value;
        const results = Search.index.search(value);

        console.log("Searching:", results);
        let html = '<ul>';
        for (const result of results.slice(0, 10)) {

            const preview = Search.previews[result.ref]; 

            html += '<li><a href="#' + preview.l + '">';
            html += preview.t;
            html += '</a></li>';
        }
        html += '</ul>';
        document.querySelector("div.searchresults").innerHTML = html;
    }

};

/* global lunr LUNR_DATA LUNR_PREVIEW_LOOKUP */
Search.index = lunr.Index.load(LUNR_DATA);
Search.previews = LUNR_PREVIEW_LOOKUP;
console.log("LUNR", Search.index, LUNR_DATA);