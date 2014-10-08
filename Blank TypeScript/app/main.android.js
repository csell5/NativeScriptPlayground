var Html = android.text.Html;
var Text = android.text;

var App = (function () {
    function App() {
        this.model = require("/modules/model");
    }
    App.prototype.init = function (activity) {
        var layout = new android.widget.LinearLayout(activity);
        layout.setOrientation(android.widget.LinearLayout.VERTICAL);

        var titleView = this.createTextView(activity);
        layout.addView(titleView);

        var button = this.createTapButton(activity);
        layout.addView(button);

        this.messageView = this.createMessageView(activity);
        layout.addView(this.messageView);

        activity.setContentView(layout);
    };

    App.prototype.createMessageView = function (activity) {
        var messageView = new android.widget.TextView(activity);
        messageView.setText(this.model.Text);
        messageView.setTextSize(18);
        messageView.setGravity(android.view.Gravity.CENTER);
        return messageView;
    };

    App.prototype.createTextView = function (activity) {
        var titleView = new android.widget.TextView(activity);
        titleView.setText("Tap the button");
        titleView.setTextSize(30);
        titleView.setGravity(android.view.Gravity.CENTER);
        return titleView;
    };

    App.prototype.createTapButton = function (activity) {
        var _this = this;
        var button = new android.widget.Button(activity);
        button.setText("Tap me!");

        var layoutParams = new android.widget.LinearLayout.LayoutParams(App.toDIP(activity, 300), App.toDIP(activity, 200));
        layoutParams.gravity = android.view.Gravity.CENTER;
        button.setLayoutParams(layoutParams);

        var listener = {
            onClick: function () {
                return _this.onClick();
            }
        };

        button.setOnClickListener(new android.view.View.OnClickListener(listener));
        return button;
    };

    App.prototype.onClick = function () {
        console.log("onClick called");

        this.model.action();
        if (this.model.Counter < 0) {
            this.messageView.setLinksClickable(true);
            this.messageView.setText(Html.fromHtml("<a href=\"http://github.com/nativescript/docs\">More info about NativeScript</a> "));
            this.messageView.setMovementMethod(Text.method.LinkMovementMethod.getInstance());
        } else {
            this.messageView.setText(this.model.Text);
        }
    };

    App.toDIP = function (context, num) {
        return android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, num, context.getResources().getDisplayMetrics());
    };
    return App;
})();

var app = new App();
var MainActivity = com.tns.NativeScriptActivity.extends({
    onCreate: function () {
        this.super.onCreate(null);
        app.init(this);
    }
});

module.exports = MainActivity;
//# sourceMappingURL=main.android.js.map
