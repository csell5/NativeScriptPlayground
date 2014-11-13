var pages = require("ui/pages");
var stackPanel = require("ui/panels/stack-panel");
var button = require("ui/button");

var labelDef = require("ui/label");
var listViewDef = require('ui/list-view');

var layout = require("ui/core/layout");
var geometry = require("utils/geometry");
var model = require("/modules/model");

var dialogs = require("ui/dialogs");
var gridPanel = require("ui/panels/grid-panel");

// Setup the title label.
var titleLabel = new labelDef.Label();
titleLabel.horizontalAlignment = layout.HorizontalAlignment.center;
titleLabel.margin = new geometry.Thickness(20, 20, 20, 20);
titleLabel.text = "Tap the button";
titleLabel.cssClass = "title";

// Setup the button.
var btn = new button.Button();
btn.text = "TAP ME";
btn.horizontalAlignment = layout.HorizontalAlignment.center;
btn.on("click", function () {
    console.log("button click called");
    model.tapAction();
});

//Setup the message label.
var messageLabel = new labelDef.Label();
messageLabel.horizontalAlignment = layout.HorizontalAlignment.center;
messageLabel.margin = new geometry.Thickness(20, 20, 20, 20);
messageLabel.cssClass = "message";
messageLabel.textWrap = true;

// Bind the text of the message label to the text property of the model.
messageLabel.bind({
    sourceProperty: "message",
    targetProperty: "text"
}, model);

//setup the listView
var items = new Array(1000);
var sessionsList = new listViewDef.ListView();

sessionsList.on("itemLoading", function (args) {
    console.log("In itemLoading");

    var label = args.view;
    if (!label) {
        label = new labelDef.Label();

        args.view = label;
    }
    label.text = "item " + args.index;
});

sessionsList.items = items;


var resultsLable = new labelDef.Label();
resultsLable.horizontalAlignment = layout.HorizontalAlignment.center;
resultsLable.margin = new geometry.Thickness(20, 20, 20, 20);
resultsLable.cssClass = "message";
resultsLable.textWrap = true;

resultsLable.text = "started";

// Put all the elements in a StackPanel.
var panel = new stackPanel.StackPanel();
panel.addChild(titleLabel);
panel.addChild(btn);
panel.addChild(messageLabel);
panel.addChild(resultsLable);
panel.addChild(sessionsList); // this does appear right on when part of other elements but it works...

// Create and return the page.
var page = new pages.Page();
page.content = panel;
page.css = "button { \
		font-size: 42 \
	} \
	.title { \
		font-size: 30 \
	} \
	.message { \
		font-size: 10; \
		color: #284848; \
	}";

exports.Page = page;
