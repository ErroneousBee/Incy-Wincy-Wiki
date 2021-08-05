/* eslint-disable no-unused-vars */

const Demo = {

    /**
     * Executed when config is read and it sees the plugin is to be loaded.
     */
    async initialise() {
        console.log("Initialise Demo plugin")
        App.Plugins["Demo"] = Demo;
    },

    /**
     * Executed when the page is loaded
     */
    async onpageload(json,html,element) {
        console.log("Demo plugin page load");
        element.innerHTML= '<div class="Demo_enhance">'+html+'</div>';
    }

}

document.addEventListener('initialise_plugins', Demo.initialise, false);