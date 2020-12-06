
function onload() {
    console.trace();
    read_file_into("content/test.txt", document.getElementById("test"));
}

function read_file_into(file, element) {

    fetch(file)
        .then(response => response.text())
        .then(text => {
            element.innerHTML = text;
        });


}