var pages = require("ui/pages");
var stackPanel = require("ui/panels/stack-panel");
var button = require("ui/button");
var label = require("ui/label");
var layout = require("ui/core/layout");
var geometry = require("utils/geometry");
var tabControlModule = require("ui/tab-control");

var model = require("/modules/model");

// Create and return the page.
var page = new pages.Page();

// https://github.com/NativeScript/docs/tree/master/ui/tab-view
var tabControl = new tabControlModule.TabControl();

// TabEntry - https://github.com/NativeScript/docs/blob/master/ui/tab-view/TabEntry.md
var backButton = new button.Button();
backButton.on("click", function () {
   page.frame.goBack();
});
backButton.text = "go back ";

var tab1 = {
    title : "About",
    view : backButton 
};

//Setup the message label.
var messageLabel = new label.Label();
messageLabel.horizontalAlignment = layout.HorizontalAlignment.center;
messageLabel.margin = new geometry.Thickness(20, 20, 20, 20);
messageLabel.cssClass = "message";
messageLabel.textWrap = true;
page.on("navigatedTo", function (eventData) {
   messageLabel.text = eventData.param1;
});

var tab2 = {
    title : "Test2",
    view :  messageLabel
};

tabControl.items = [tab1, tab2];

page.content = tabControl;
exports.Page = page;
