/* eslint-disable no-unused-vars */

const Demo = {

    /**
     * Executed when the page is loaded
     */
    async onpageload() {
        console.log("Demo plugin page load");
    },

    /**
     * Executed when config is read and it sees the plugin is to be loaded.
     */
    async initialise() {
        console.log("Initialise Demo plugin")
    }

}

document.addEventListener('initialise_plugins', Demo.initialise, false);