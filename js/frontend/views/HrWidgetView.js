(function (app) {
    app.HrWidgetView = app.BaseWidgetView.extend({
        tagName: 'hr',
        initialize: function () {
            this.baseInitialize();
        },
        render: function () {
            this.$el.append(this.editView.render().el);
            return this;
        }
    })
})(app);