var pages = require("ui/pages");
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
messageLabel.text = "The items below are in a vertical stack panel";
panel.addChild(messageLabel);

var itemsPanel = new stackPanel.StackPanel();
itemsPanel.margin = new geometry.Thickness(20, 20, 20, 20);
itemsPanel.cssClass = "demoItemsPanel";
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

panel.addChild(itemsPanel);

var btn = new button.Button();
btn.text = "Load next demo.";
btn.horizontalAlignment = layout.HorizontalAlignment.center;

// attach to the "click" event of the button
btn.on("click", function () {
    page.frame.navigate("/Page5");
});
panel.addChild(btn);

page.content = panel;
global.loadCss(page);
exports.Page = page;
