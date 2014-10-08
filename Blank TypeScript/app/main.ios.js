var model = require("/modules/model");

var MyController = (function () {
    function MyController() {
    }
    MyController.prototype.viewDidLoad = function () {
        this.super.viewDidLoad();

        this.titleLabel = this.createLabel("Tap the button");
        this.view.addSubview(this.titleLabel);
        this.centerSubview(this.titleLabel);

        this.button = this.createButton();
        this.view.addSubview(this.button);
        this.centerSubview(this.button);

        this.messageView = UIKit.UITextView.initWithFrame(CoreGraphics.CGRectMake(0, 100, 200, 40));
        this.messageView.editable = false;
        this.setLabelStyle(this.messageView, model.Text, 14);
        this.view.addSubview(this.messageView);
        this.centerSubview(this.messageView);
    };

    MyController.prototype.setLabelStyle = function (view, text, fontSize) {
        view.font = UIKit.UIFont.fontWithNameSize("HelveticaNeue-Thin", fontSize || 12);
        view.numberOfLines = 1;
        view.textAlignment = 1 /* NSTextAlignmentCenter */;
        view.text = text;
    };

    MyController.prototype.centerSubview = function (subview) {
        var orientation = this.interfaceOrientation;

        var isPortrait = orientation == 1 /* UIInterfaceOrientationPortrait */ || orientation == 2 /* UIInterfaceOrientationPortraitUpsideDown */;

        var viewSize = this.view.frame.size;
        var desiredSize = subview.sizeThatFits(viewSize);
        desiredSize.width = desiredSize.width + 20;
        desiredSize.height = desiredSize.height + 10;

        var viewOrigin = subview.frame.origin;
        var viewWidth = isPortrait ? viewSize.width : viewSize.height;
        var left = (viewWidth - desiredSize.width) / 2;

        subview.frame = CoreGraphics.CGRectMake(left, viewOrigin.y, desiredSize.width, desiredSize.height);
    };

    MyController.prototype.didRotateFromInterfaceOrientation = function (fromInterfaceOrientatin) {
        this.centerSubview(this.titleLabel);
        this.centerSubview(this.button);
        this.centerSubview(this.messageView);
        this.super.didRotateFromInterfaceOrientation(fromInterfaceOrientatin);
    };

    MyController.prototype.onClick = function () {
        model.action();
        if (model.Counter < 0) {
            this.messageView.text = "More info about NativeScript - http://github.com/nativescript/docs";
            this.messageView.dataDetectorTypes = 2 /* UIDataDetectorTypeLink */;
            this.centerSubview(this.messageView);
        } else {
            this.messageView.text = model.Text;
        }
    };

    MyController.prototype.createLabel = function (labelText) {
        var label = UIKit.UILabel.initWithFrame(CoreGraphics.CGRectMake(0, 20, 200, 40));
        this.setLabelStyle(label, labelText, 20);
        return label;
    };

    MyController.prototype.createButton = function () {
        var button = UIKit.UILabel.initWithFrame(CoreGraphics.CGRectMake(0, 60, 200, 40));

        this.setLabelStyle(button, "Tap me!", 18);
        button.userInteractionEnabled = true;
        button.backgroundColor = UIKit.UIColor.lightGrayColor();
        button.layer.borderWidth = 2;
        button.layer.borderColor = UIKit.UIColor.blackColor().CGColor;

        var tapGestureRecognizer = UIKit.UITapGestureRecognizer.initWithTargetAction(this, 'onClick');
        button.addGestureRecognizer(tapGestureRecognizer);
        return button;
    };
    return MyController;
})();

var MainViewController = UIKit.UIViewController.extends(MyController.prototype, {
    exposedMethods: {
        'onClick': 'v@:@'
    }
});

module.exports = {
    MainViewController: MainViewController
};
//# sourceMappingURL=main.ios.js.map
