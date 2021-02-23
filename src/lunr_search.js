const Search = {

    keyup(e) {


        const value = e.target.value;
        const results = Search.index.search(value);

        console.log("Searching:", results);
        let html = '<ul>';
        for (const result of results.slice(0, 10)) {

            html += '<li><a href="' + result.link + '">';
            html += result.t;
            html += '</a></li>';
        }
        html += '</ul>';
        document.querySelector("div.searchresults").innerHTML = html;
    }

};

/* global LUNR_DATA */
/* global lunr */
Search.index = lunr.Index.load(LUNR_DATA);
console.log("LUNR", Search.index, LUNR_DATA);