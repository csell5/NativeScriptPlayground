var pages = require("ui/pages");
var dialogs = require("ui/dialogs");
var labelDef = require("ui/label");
var layout = require("ui/core/layout");
var listview = require("ui/list-view")
var stackPanel = require("ui/panels/stack-panel");
var gridPanel = require("ui/panels/grid-panel");
var button = require("ui/button");
var geometry = require("utils/geometry");

var page = new pages.Page();

// create a Grid panel instead of Stack panel in order the listbox to take the whole page.
var panel = new gridPanel.GridPanel();
var items = new Array(1024);
var listView = new listview.ListView();

/*
*
* Set up the view which will be displayed for each listview item.
*
*/
listView.on("itemLoading", function (args) {
    var label = args.view;
        if (!label) {
            label = new labelDef.Label();
  
            args.view = label;
        }
        label.cssClass = "listViewItemStyle";
        label.text = "item " + args.index;
    }
);

// attach to the tap event of the listview item
listView.on("itemTap",function (args) {
          page.frame.navigate("/Page7");
    }
);
    
listView.items = items;
panel.addChild(listView);
page.content=panel;

global.loadCss(page);
exports.Page = page;
