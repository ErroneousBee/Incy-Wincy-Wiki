/* global require */
const fs = require("fs");
const fse = require('fs-extra');
const js_yaml = require('js-yaml');

const Config = {
    // Valid search fields: "title", "description", "keywords", "body"
    search_fields: ["title", "description", "keywords", "body"],
    search_exclude: ["search.html"],
    search_max_preview_chars: 275,
    search_lunr_index: "src/lunr_index.js",
    contentpath: "content",
    targetpath: "target"
};

function read_config() {

    const text = fs.readFileSync("config.yaml").toString();

    try {
        const json = js_yaml.safeLoad(text);
        for (const item in json) {
            Config[item] = json[item];
        }
    } catch (e) {
        console.error("Failure getting configuration from config.yaml", e);
        return;
    }

    console.log("Config Read: ", Config);


}

function copy_to_target() {

    // Copy all the files into the target directory
    const sources = [
        'index.html',
        'config.yaml',
        'src/main.js',
        'src/lunr_search.js',
        'themes',
        'css',
        Config.search_lunr_index,
        Config.contentpath,
    ];

    // Include configured plugins
    for ( const plugin of Config.plugins) {
        sources.push('plugins/'+plugin);
    }

    fse.emptyDirSync(Config.targetpath);

    for (const source of sources) {
        const dest = Config.targetpath + '/' + source;

        fse.copy(source, dest, {
                overwrite: true
            })
            .then(() => {
                console.log("Copied: ", source);
            })
            .catch(err => {
                console.error(err)
            });

    }

}

function install_plugins() {

    console.log("Installing plugins into index.html...");

    // Get all the new source lines from configured plugins
    const insert_html = [];
    for ( const plugin of Config.plugins) {
        const inclines = fs.readFileSync('plugins/'+plugin+'/includes.html').toString().split("\n");;
        insert_html.push(...inclines);
    }

    const lines = fs.readFileSync('index.html').toString().split("\n");
    const startline = lines.findIndex(l => l.includes(' <!-- Start of Plugins -->'));
    const endline = lines.findIndex(l => l.includes(' <!-- End of Plugins -->'));
    lines.splice(startline+1 , endline -  startline - 1, ...insert_html );

    fs.writeFileSync('index.html',lines.join("\n"));

    console.log("Installed plugins: "+ Config.plugins.join(", ") +".");

}

function main() {

    read_config();

    install_plugins();

    copy_to_target();

}

main();