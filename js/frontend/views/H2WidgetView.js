(function (app) {
    app.H2WidgetView = app.BaseWidgetView.extend({
        tagName: 'h2',
        placeHolder: 'Відредагуй підзаголовок просто натиснувши на текст правою кнопкою миші',
        initialize: function () {
            this.baseInitialize();
        },
        render: function () {
            this.$el.attr('contenteditable', true);
            this.$el.html(this.placeHolder);
            this.$el.append(this.editView.render().el);
            return this;
        }
    })
})(app);