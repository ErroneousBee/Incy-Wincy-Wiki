function onload() {

    read_path_into_element("content/logo.html", document.getElementById("logo"));
    read_path_into_element("content/mast.txt", document.getElementById("mast"));
    read_path_into_element("content/sidenav.md", document.getElementById("sidenav"));
    read_path_into_element("content/Home.md", document.getElementById("content"));

    document.querySelector("nav#sidenav").onclick = (e) => {
        const path = get_path_from_element(e.target);
        read_path_into_element("content/" + path, document.getElementById("content"));
    };
}

function read_path_into_element(file, element) {

    // Get the file type
    let filename = file.split('/').pop();
    let filetype = filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    if (filetype === "") {
        filetype = "md";
        file = file + "." + filetype;
        filename = filename + "." + filetype;
    }

    // Get the path for this file.
    const pathparts = file.split('/');
    pathparts.shift();
    const path = pathparts.join("/").slice(0, -1 * (1 + filetype.length));
    console.log("PATH=",path);







    fetch(file)
        .then(response => response.text())
        .then(text => {

            console.log("Loaded", file, "type:", filetype, text);

            let page;
            switch (filetype) {
                case "htm":
                case "html":
                    element.innerHTML = text;
                    break;

                case "md":
                    const markdown = handle_page_frontmatter(text);
                    const converter = new showdown.Converter();
                    element.innerHTML = converter.makeHtml(markdown);
                    break;

                default:
                    element.innerHTML = text;
                    break;

            }
        });


}

function handle_page_frontmatter(text) {
    // First line is the seperator
    const sep = text.split("\n", 1)[0].trim();
    const [fm, md] = text.split("\n" + sep, 2);
    try {
        const doc = jsyaml.safeLoad(fm);
        console.log(doc);
    } catch (e) {
        console.log(e);
    }
    return md;
}

function load_nav_sidebar() {

    read_path_into_element("content/sidenav.md", document.getElementById("sidenav"));

    //TODO: extract the pages from the list, to pull tooltips and other stuff

}



function get_path_from_element(el, acc) {

    console.log('xx', el, acc, (!acc));
    if (el.tagName === "NAV") {
        return acc;
    }
    const elp = el.parentElement.parentElement;
    const pathpart = el.firstChild.nodeValue.trim();

    if (!acc) {
        return get_path_from_element(elp, pathpart);
    } else {
        return get_path_from_element(elp, pathpart + "/" + acc);
    }
}