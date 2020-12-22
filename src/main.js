function onload() {
    load_nav_sidebar();

    read_file_into("content/logo.html", document.getElementById("logo"));
    read_file_into("content/mast.txt", document.getElementById("mast"));
    read_file_into("content/sidenav.md", document.getElementById("sidenav"));
    read_file_into("content/Home.md", document.getElementById("content"));

    document.querySelector("nav#sidenav").onclick = (e) => {
        console.log(e.target);

        const path = get_path_from_element(e.target);

        read_file_into("content/" + path, document.getElementById("content"));



    };
}

function read_file_into(file, element) {

    // Get the file type
    let filename = file.split('/').pop();
    let filetype = filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    if (filetype === "") {
        filetype = "md";
        file = file + "." + filetype;
    }

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
                    const converter = new showdown.Converter()
                    element.innerHTML = converter.makeHtml(text);;
                    break;

                default:
                    element.innerHTML = text;
                    break;

            }
        }
        );


}

function load_nav_sidebar() {

    // TODO: look for the html or md
    read_file_into("content/sidenav.txt", document.getElementById("sidenav"));


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