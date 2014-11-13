var pages = require("ui/pages");
var stackPanel = require("ui/panels/stack-panel");
var button = require("ui/button");
var label = require("ui/label");
var layout = require("ui/core/layout");
var geometry = require("utils/geometry");
var dialogs = require("ui/dialogs");

// just for the sake of showing you that there is an alert method
//dialogs.alert("1");

// Setup the title label.
var titleLabel = new label.Label();
titleLabel.horizontalAlignment = layout.HorizontalAlignment.center;
titleLabel.margin = new geometry.Thickness(20, 20, 20, 20);
titleLabel.text = "This is Page 2";
titleLabel.cssClass = "title";

// Setup the button.

var btn = new button.Button();
btn.text = "Load Page3";
btn.horizontalAlignment = layout.HorizontalAlignment.center;

// attach to the "click" event of the button
btn.on("click", function () {
    
    /*
     * Here we are loading Page3, and we are passing a value parameter to it.
     *
     * In order to pass a parameter we need to create a new NavigationEntry object and again use the Frame class to navigate between the pages.
     * See the API of NavigationEntry class here - https://github.com/NativeScript/docs/blob/master/ui/frame/NavigationEntry.md
     *
     * Here we are passing parameter with name="param1" and value="param1Value".
     *
     * See the Page3.js source code to see how to get a parameter value.
     *
    */
    var navigationEntry = {
         
        moduleName : "/Page3", 
        context : {
                param1 : "param1Value"
        }
    };
    page.frame.navigate(navigationEntry);
});

// Put all the elements in a StackPanel.
var panel = new stackPanel.StackPanel();
panel.addChild(titleLabel);
panel.addChild(btn);

// Create and return the page.
var page = new pages.Page();
page.content = panel;
global.loadCss(page);
exports.Page = page;
