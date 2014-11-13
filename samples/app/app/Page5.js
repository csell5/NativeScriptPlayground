var pages = require("ui/pages");
var dialogs = require("ui/dialogs");
var label = require("ui/label");
var layout = require("ui/core/layout");
var stackPanel = require("ui/panels/stack-panel");
var button = require("ui/button");
var geometry = require("utils/geometry");

// Create and return the page.
var page = new pages.Page();
// Put all the elements in a StackPanel.
var panel = new stackPanel.StackPanel();

var messageLabel = new label.Label();
messageLabel.horizontalAlignment = layout.HorizontalAlignment.center;
messageLabel.text = "The items below are in a horizontal stack panel";
panel.addChild(messageLabel);

var itemsPanel = new stackPanel.StackPanel();

/*
 * Setting the Orientation property of the StackPanel 
 * will change the way the items are being layed out
 */
itemsPanel.orientation = stackPanel.Orientation.Horizontal;

var label1 = new label.Label();
label1.text = "item1";
itemsPanel.addChild(label1);

var label2 = new label.Label();
label2.text = "item2";
itemsPanel.addChild(label2);

var label3 = new label.Label();
label3.text = "item3";
itemsPanel.addChild(label3);

var label4 = new label.Label();
label4.text = "item4";
itemsPanel.addChild(label4);
itemsPanel.cssClass = "demoItemsPanel";
itemsPanel.margin = new geometry.Thickness(20, 20, 20, 20);

panel.addChild(itemsPanel);

var btn = new button.Button();
btn.text = "Load Page 6";
btn.horizontalAlignment = layout.HorizontalAlignment.center;

// attach to the "click" event of the button
btn.on("click", function () {
    try {
    page.frame.navigate("/Page6");
    } catch (e) {dialogs.alert(e.message)}
});
panel.addChild(btn);

page.content = panel;
global.loadCss(page);
exports.Page = page;
