var pages = require("ui/pages");
var button = require("ui/button");
var layout = require("ui/core/layout");
var dialogs = require("ui/dialogs");

// Create a Button.
var btn = new button.Button();
btn.text = "Navigate to Page 2";
btn.horizontalAlignment = layout.HorizontalAlignment.center;
btn.verticalAlignment = layout.VerticalAlignment.top;

// attach to the "click" event of the button
dialogs.alert("1");
btn.on("click", function () {
    
    /* 
     * We are using the Frame class methods to perform the navigation
     * see the API reference of the Frame class here - https://github.com/NativeScript/docs/blob/master/ui/frame/Frame.md
     *
     **/
    page.frame.navigate("/Page2");

});

// Create and return the page.
var page = new pages.Page();
page.content = btn;

// set the CSS style for the entire page and all elements in it.
global.loadCss(page);
exports.Page = page;