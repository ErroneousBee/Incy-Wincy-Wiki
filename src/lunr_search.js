const Search = {

    keyup(e) {

        const value = e.target.value;
        Search.renderResults(value);

    },

    renderResults(value) {
        document.querySelector("div.searchresults").innerHTML = "TODO: results for " + value;
    }

};