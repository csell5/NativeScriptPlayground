var application = require("application");
var dialogs = require("ui/dialogs");
var fs = require("file-system");
application.mainModule = "/main";

// this method allows us to load the CSS style from an external file
global.loadCss = function (page) {

    fs.File.fromPath(__dirname + "/app.css")
        .readText()
        .then(function (css) {
            page.css = css;
        });    
}

application.start();