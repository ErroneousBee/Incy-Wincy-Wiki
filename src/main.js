
function onload() {
    console.trace();
    read_file_into("content/test.txt", document.getElementById("test"));
}

function read_file_into(file,element) {

    const fr = new FileReader();
    fr.onload = function (e) {
        console.log(e);
        element.innerHTML = e.target.result;
    };
    fr.readAsText(file);
}