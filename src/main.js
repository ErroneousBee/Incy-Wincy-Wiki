const Config = {
    title: 'Default Title',
    extension_precedence: ["md", "html", "htm", "txt"],
    theme: 'default',
    home: 'Home.md',
    contentpath: 'content/'
};

const App = {

    async onload() {

        // First, we wait for the config, how else will we know what to do?
        await App.load_config();

        // Load the assorted navigation, banners and whatnot.
        App.load_side_content();

        // We navigate by setting hashes in the URL.
        window.onhashchange = App.load_content_from_url;

        // Now for the main event...
        App.load_content_from_url();


    },

    /**
     * We have a thing to load, but no extention. Try and see what loads.
     * @param {string} pathname 
     */
    async get_file_extention(pathname) {

        // Config.extension_precedence
        App.fetch_with_extention(Config.contentpath + pathname, Config.extension_precedence)
            .then(response => {
                console.log("Success", response)
            })
            .catch(e => {
                console.log("Failed.", e)
            });


    },

    /**
     * Try to load a resource from one of the many possible extensions
     * @param {String} path 
     * @param {Array} extn_list 
     */
    fetch_with_extention(path, extn_list) {

        const extn = extn_list.shift();

        return new Promise((resolve, reject) => {
            fetch(path + '.' + extn)
                .then(response => {
                    if (!response.ok) {
                        if (extn_list.length === 0) {
                            reject("Ran out of extensions to try");
                            return;
                        }
                        return this.fetch_with_extention(path, extn_list);
                    }
                    resolve(response);
                })
                .catch(e => {
                    reject(e);
                })
        });

    },

    /**
     * Read the config.yaml file, and merge into hardcoded defaults.
     */
    async load_config() {
        await fetch("config.yaml")
            .then(response => response.text())
            .then(text => {
                try {
                    const json = jsyaml.safeLoad(text);
                    for (const item in json) {
                        Config[item] = json[item];
                    }
                } catch (e) {
                    console.error("Failure getting configuration from config.yaml", e);
                    return;
                }

                if (Config.show_config) {
                    console.log("Configuration:", Config);
                }

            });

    },

    /**
     * Look at the current URL and load the content based on that URL.
     * Driven from an event listener.
     */
    load_content_from_url() {

        const url = new URL(window.location.href);

        // We use the hash part of the URL for the path 
        let path = url.hash.slice(1);
        if (path === '') {
            path = Config.home;
        }

        console.log("From URL", url, path, !path, document.getElementById("content"));

        App.read_path_into_element(path, document.getElementById("content"));

    },

    /**
     * Make the URL reflect the path we have.
     * @param {string} path 
     */
    set_url(path) {

        const url = new URL(window.location.href);
        url.hash = '#' + path;
        window.location.href = url.toString();

    },

    /**
     * Directly read a file into an element, for non-content such as navbars.
     * @param {*} file 
     * @param {*} element 
     */
    read_file_into_element(file, element) {

        // Get the file type
        let filename = file.split('/').pop();
        let filetype = filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);

        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.text()
            })
            .then(text => {

                console.log("Loaded", file, "type:", filetype, text);

                switch (filetype) {
                    case "htm":
                    case "html":
                        element.innerHTML = text;
                        break;

                    case "md": {
                        const [html, json] = App.convert_markdown_page(text, file);
                        element.innerHTML = html;
                        break;
                    }

                    default:
                        element.innerHTML = text;
                        break;

                }

            }).catch(e => {
                console.error(e);
                element.innerHTML = '<p class="error">' + e + '.</p><p>File: ' + file + '</p>';
            });

    },

    /**
     * Read content path into the content element, update any navbars along the way.
     * @param {*} file - fie name including extension and directory levels
     * @param {*} element - DOM element to put the content into
     */
    read_path_into_element(path, element) {

        // Get the file type
        const filename = path.split('/').pop();
        const filetype = filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);

        const extn_list = [...Config.extension_precedence];
        if (filetype !== "") {
            extn_list.unshift(filetype);
            path = path.substring(0, path.lastIndexOf("."));
        }

        console.log("Loading", path, extn_list);

        // Clear the subtitle
        document.querySelector("header span.subtitle").innerHTML = "";

        // Config.extension_precedence
        App.fetch_with_extention(Config.contentpath + path, extn_list)
            .then(response => {

                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                console.log("Loaded", response);

                const filename = response.url.split('/').pop();
                const filetype = filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);

                response.text().then(text => {

                    switch (filetype) {
                        case "htm":
                        case "html":
                            element.innerHTML = text;
                            break;

                        case "md": {
                            const [html, json] = App.convert_markdown_page(text, response.url);
                            console.log("markdown resp ==", html, json);
                            // Deal with json frontmatter
                            if (json.title) {
                               document.querySelector("header span.subtitle").innerHTML = json.title;
                            }
                            element.innerHTML = html;
                            break;
                        }

                        default:
                            element.innerHTML = text;
                            break;

                    }
                });

                App.set_url(path);
            })
            .catch(e => {
                console.error(e);
                element.innerHTML = '<p class="error">' + e + '.</p><p>Path: ' + path + '</p>';
            });

    },

    /**
     * Given the md file contents, strip and deal with the yaml frontmatter, and give us the md text.
     * @param {string} text - the text of the markdown file.
     * @param {string} source - a string for indicating where errors come from
     */
    convert_markdown_page(text, source) {

        // First line is the seperator
        const sep = text.split("\n", 1)[0].trim();
        const [fm, md] = text.split("\n" + sep, 2);
        try {
            const json = jsyaml.safeLoad(fm);
            const converter = new showdown.Converter();
            return [converter.makeHtml(md), json];
        } catch (e) {
            console.error("Failure reading page frontmatter from ", source, e);
            return ['<p class="error">Error loading page from ' + source + '</p><p>' + e.message + '</p>', {}];
        }

    },

    /**
     * Populate the sidebar and other non content places.
     */
    load_side_content() {

        App.read_file_into_element(Config.contentpath + 'logo.html', document.getElementById("logo"));

        document.querySelector("header span.title").innerHTML = Config.title;

        // TODO: Load topbar droper menus

        App.read_file_into_element(Config.contentpath + 'sidenav.md', document.getElementById("sidenav"));

        document.querySelector("nav#sidenav").onclick = (e) => {

            // TODO: CSS select and hover and open and all the effects
            console.log(e.target);

            const path = App.get_path_from_element(e.target);
            App.read_path_into_element(path, document.getElementById("content"));
        };

        //TODO: extract the pages from the list, to pull tooltips and other stuff

    },

    /**
     * From the li element of a nav manu, go up the tree to the nav element, and get a path that is the page to load.
     * @param {Element} el 
     * @param {string} acc 
     */
    get_path_from_element(el, acc) {

        console.log('xx', el, acc, (!acc));
        if (el.tagName === "NAV") {
            return acc;
        }
        const elp = el.parentElement.parentElement;
        const pathpart = el.firstChild.nodeValue.trim();

        if (!acc) {
            return App.get_path_from_element(elp, pathpart);
        } else {
            return App.get_path_from_element(elp, pathpart + "/" + acc);
        }
    }

};