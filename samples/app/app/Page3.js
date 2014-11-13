var pages = require("ui/pages");
var stackPanel = require("ui/panels/stack-panel");
var button = require("ui/button");
var label = require("ui/label");
var layout = require("ui/core/layout");
var geometry = require("utils/geometry");
var dialogs = require("ui/dialogs");

// just for the sake of showing you that there is an alert method
//dialogs.alert("1");
var page = new pages.Page();

// Setup the title label.
var titleLabel = new label.Label();
titleLabel.horizontalAlignment = layout.HorizontalAlignment.center;
titleLabel.margin = new geometry.Thickness(20, 20, 20, 20);
titleLabel.text = "This is Page 3";
titleLabel.cssClass = "title";

/*
*
* This is how you can get a parameters passed to the page.
*
*/
page.on("navigatedTo", function (eventData) {
   var param1Value = page.navigationContext.param1;
   dialogs.alert("The value of param1 is [" + param1Value + "]");
});


// Setup the button.
var btn = new button.Button();
btn.text = "Load next demo.";
btn.horizontalAlignment = layout.HorizontalAlignment.center;

// attach to the "click" event of the button
btn.on("click", function () {
    page.frame.navigate("/Page4");
});


// Put all the elements in a StackPanel.
var panel = new stackPanel.StackPanel();
panel.addChild(titleLabel);
panel.addChild(btn);

// Create and return the page.

page.content = panel;
global.loadCss(page);
exports.Page = page;
