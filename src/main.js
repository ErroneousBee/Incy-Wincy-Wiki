
const config = {
    extension_precedence: ["md", "html", "htm", "txt"], 
    theme: "default",
    home: "Home.md"
}

function onload() {

    load_config();
    load_side_content();

    read_path_into_element("content/" + config.home, document.getElementById("content"));

    document.querySelector("nav#sidenav").onclick = (e) => {

        // TODO: CSS select and hover and open and all the effects
        console.log(e.target);

        const path = get_path_from_element(e.target);
        read_path_into_element("content/" + path, document.getElementById("content"));
    };
}

/**
 * Try and load a file by trying file extentions in a precedence order
 * @param {string} pathname 
 */
function get_file_extention(pathname) {
    // TODO: code here

}

function load_config() {
    fetch("config.yaml")
        .then(response => response.text())
        .then(text => {
            // TODO: convert/extract text
            // TODO: Preen, add defaults and stash in a global
            // TODO: Report via alert or console?
        });
}


/**
 * Read a content file into the content element, update ant navbars along the way.
 * @param {*} file 
 * @param {*} element 
 */
function read_path_into_element(file, element) {
    // TODO: Split out the non-content loads and have them use more direct (faster) methods.

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
                    const [html, json] = convert_markdown_page(text,file);
                    element.innerHTML = html;
                    break;

                default:
                    element.innerHTML = text;
                    break;

            }
        });


}

/**
 * Given the md file contents, strip and deal with the yaml frontmatter, and give us the md text.
 * @param {string} text 
 */
function convert_markdown_page(text, source) {

    // First line is the seperator
    const sep = text.split("\n", 1)[0].trim();
    const [fm, md] = text.split("\n" + sep, 2);
    try {
        const json = jsyaml.safeLoad(fm);
    } catch (e) {
        console.error("Failure reading page frontmatter from ", source, e);
    }

    const converter = new showdown.Converter();
    return [json,converter.makeHtml(md)];

}

function load_side_content() {

    read_path_into_element("content/logo.html", document.getElementById("logo"));
    read_path_into_element("content/mast.txt", document.getElementById("mast"));
    // TODO: Load topbar droper menus

    read_path_into_element("content/sidenav.md", document.getElementById("sidenav"));

    //TODO: extract the pages from the list, to pull tooltips and other stuff

}


/**
 * From the li element of a nav manu, go up the tree to the nav element, and get a path that is the page to load.
 * @param {Element} el 
 * @param {string} acc 
 */
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