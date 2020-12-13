function onload() {
    load_nav_sidebar();

    read_file_into("content/logo.html", document.getElementById("logo"));
    read_file_into("content/mast.txt", document.getElementById("mast"));
    read_file_into("content/test.md", document.getElementById("content"));
}

function read_file_into(file, element) {

    // Get the file type
    const filename = file.split('/').pop();
    const filetype = filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);


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
                    element.innerHTML =  converter.makeHtml(text);;
                    break;

                default:
                    element.innerHTML = text;
                    break;

            }
        });


}

function load_nav_sidebar() {

    // TODO: look for the html or md
    read_file_into("content/sidenav.txt", document.getElementById("sidenav"));


}