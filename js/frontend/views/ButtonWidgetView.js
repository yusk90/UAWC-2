(function (app) {
    app.ButtonWidgetView = app.BaseWidgetView.extend({
        tagName: 'button',
        className: 'center__button',
        buttonValue: 'Допомогти',
        initialize: function () {
            this.baseInitialize();
        },
        render: function () {
            this.$el.attr('contenteditable', true);
            this.$el.html(this.buttonValue);
            this.$el.append(this.editView.render().el);
            return this;
        }
    })
})(app);