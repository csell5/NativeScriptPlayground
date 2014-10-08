var model = require("/modules/model");

class MyController {
    private titleLabel: UIKit.UILabel;
    private button: UIKit.UILabel;
    private messageView: UIKit.UITextView;

    viewDidLoad() {
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
    }

    setLabelStyle(view, text, fontSize) {
        view.font = UIKit.UIFont.fontWithNameSize("HelveticaNeue-Thin", fontSize || 12);
        view.numberOfLines = 1;
        view.textAlignment = UIKit.NSTextAlignment.NSTextAlignmentCenter;
        view.text = text;
    }

    centerSubview(subview) {
        var orientation = this.interfaceOrientation;

        var isPortrait = orientation == UIKit.UIInterfaceOrientation.UIInterfaceOrientationPortrait ||
            orientation == UIKit.UIInterfaceOrientation.UIInterfaceOrientationPortraitUpsideDown;

        var viewSize = this.view.frame.size;
        var desiredSize = subview.sizeThatFits(viewSize);
        desiredSize.width = desiredSize.width + 20;
        desiredSize.height = desiredSize.height + 10;

        var viewOrigin = subview.frame.origin;
        var viewWidth = isPortrait ? viewSize.width : viewSize.height;
        var left = (viewWidth - desiredSize.width) / 2;

        subview.frame = CoreGraphics.CGRectMake(left, viewOrigin.y, desiredSize.width, desiredSize.height);
    }

    didRotateFromInterfaceOrientation(fromInterfaceOrientatin) {
        this.centerSubview(this.titleLabel);
        this.centerSubview(this.button);
        this.centerSubview(this.messageView);
        this.super.didRotateFromInterfaceOrientation(fromInterfaceOrientatin);
    }

    onClick() {
        model.action();
        if (model.Counter < 0) {
            this.messageView.text = "More info about NativeScript - http://github.com/nativescript/docs";
            this.messageView.dataDetectorTypes = UIKit.UIDataDetectorTypes.UIDataDetectorTypeLink;
            this.centerSubview(this.messageView);
        }
        else {
            this.messageView.text = model.Text;
        }
    }

    private createLabel(labelText: string): UIKit.UILabel {
        var label = UIKit.UILabel.initWithFrame(CoreGraphics.CGRectMake(0, 20, 200, 40));
        this.setLabelStyle(label, labelText, 20);
        return label;
    }

    private createButton(): UIKit.UILabel {
        var button = UIKit.UILabel.initWithFrame(CoreGraphics.CGRectMake(0, 60, 200, 40));

        this.setLabelStyle(button, "Tap me!", 18);
        button.userInteractionEnabled = true;
        button.backgroundColor = UIKit.UIColor.lightGrayColor();
        button.layer.borderWidth = 2;
        button.layer.borderColor = UIKit.UIColor.blackColor().CGColor;

        var tapGestureRecognizer = UIKit.UITapGestureRecognizer.initWithTargetAction(this, 'onClick');
        button.addGestureRecognizer(tapGestureRecognizer);
        return button;
    }
}

var MainViewController = UIKit.UIViewController
    .extends(MyController.prototype, {
        exposedMethods: {
            'onClick': 'v@:@'
        }
    });

module.exports = {
    MainViewController: MainViewController
};