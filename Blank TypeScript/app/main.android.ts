import Html = android.text.Html;
import Text = android.text;

class App {
    private messageView: android.widget.TextView;
    private model: Model;

    constructor() {
        this.model = require("/modules/model");
    }

    init(activity: android.app.Activity) {
        var layout = new android.widget.LinearLayout(activity);
        layout.setOrientation(android.widget.LinearLayout.VERTICAL);

        var titleView = this.createTextView(activity);
        layout.addView(titleView);

        var button = this.createTapButton(activity);
        layout.addView(button);

        this.messageView = this.createMessageView(activity);
        layout.addView(this.messageView);

        activity.setContentView(layout);
    }

    private createMessageView(activity: android.app.Activity): android.widget.TextView {
        var messageView = new android.widget.TextView(activity);
        messageView.setText(this.model.Text);
        messageView.setTextSize(18);
        messageView.setGravity(android.view.Gravity.CENTER);
        return messageView;
    }

    private createTextView(activity: android.app.Activity): android.widget.TextView {
        var titleView = new android.widget.TextView(activity);
        titleView.setText("Tap the button");
        titleView.setTextSize(30);
        titleView.setGravity(android.view.Gravity.CENTER);
        return titleView;
    }

    private createTapButton(activity: android.app.Activity): android.widget.Button {
        var button = new android.widget.Button(activity);
        button.setText("Tap me!");

        var layoutParams = new android.widget.LinearLayout.LayoutParams(App.toDIP(activity, 300), App.toDIP(activity, 200));
        layoutParams.gravity = android.view.Gravity.CENTER;
        button.setLayoutParams(layoutParams);

        var listener = {
            onClick: () => this.onClick()
        };

        button.setOnClickListener(new android.view.View.OnClickListener(listener));
        return button;
    }

    private onClick() {
        console.log("onClick called");

        this.model.action();
        if (this.model.Counter < 0) {
            this.messageView.setLinksClickable(true);
            this.messageView.setText(Html.fromHtml("<a href=\"http://github.com/nativescript/docs\">More info about NativeScript</a> "));
            this.messageView.setMovementMethod(Text.method.LinkMovementMethod.getInstance());
        }
        else {
            this.messageView.setText(this.model.Text);
        }
    }

    private static toDIP(context, num) {
        return android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, num, context.getResources().getDisplayMetrics());
    }
}

var app = new App();
var MainActivity = com.tns.NativeScriptActivity
    .extends({
        onCreate: function() {
            this.super.onCreate(null);
            app.init(this);
        }
    });

module.exports = MainActivity;