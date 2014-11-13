/*
* In this page is described how a listview with a virtualized collection can be used.
*/
var http = require("http");
var pages = require("ui/pages");
var dialogs = require("ui/dialogs");
var labelDef = require("ui/label");
var layout = require("ui/core/layout");
var listViewModule = require("ui/list-view")
var stackPanel = require("ui/panels/stack-panel");
var gridPanel = require("ui/panels/grid-panel");
var button = require("ui/button");
var geometry = require("utils/geometry");
var virtualArrayDef = require("ui/core/virtual-array");

// Create and return the page.
var page = new pages.Page();
var panel = new gridPanel.GridPanel();
var listView = new listViewModule.ListView();

// this is the URL where we are getting the items.
var redditUrl = "http://www.reddit.com/r/aww.json?limit=";
var after;

/*
 * Define a virtual items source for the listview.
 *
 * Configure its behavior and how the items are being get.
 *
*/
var items = new virtualArrayDef.VirtualArray(100);
items.loadSize = 50;
items.on(virtualArrayDef.knownEvents.itemsLoading, function (args) {
    http.getJSON(redditUrl + args.count + (after ? "&after=" + after : "")).then(function (result) {
        var itemsToLoad = result.data.children;

        items.load(args.index, itemsToLoad);

        var lastItem = itemsToLoad[itemsToLoad.length - 1];
        if (lastItem) {
            after = itemsToLoad[itemsToLoad.length - 1].data.name;
        }
    }).fail(function (e) {
        console.log(e.message);
    });
    ;
});

// when user is at the end of the scrolling this event will be raised. Just load more items to display.
listView.on(listViewModule.knownEvents.loadMoreItems, function (args) {
    items.length += items.loadSize;
});

// this event is raised everytime an item from the listview is created. Define here its template.
// An easier way for describing the item template by using XML is coming very soon.
listView.on("itemLoading", function (args) {

        var dataitem = items.getItem(args.index);

        var label = args.view;
        if (!label) {
            label = new labelDef.Label();
  
            args.view = label;
        }
    
        label.cssClass = "listViewItemStyleSmall";
        
        if (dataitem) {
            label.text = dataitem.data.title;
        } 
        else // item is still not loaded from internet and is null
        {
            label.text = "loading data ... [" + args.index + "]";             
        }
    }
);
    
listView.items = items;

panel.addChild(listView);
page.content=panel;

global.loadCss(page);
exports.Page = page;
