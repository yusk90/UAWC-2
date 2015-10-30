(function (app) {
    app.FooterWidgetView = app.BaseWidgetView.extend({
        tagName: 'footer',
        placeHolder: 'Це підвал - відредагувати можна просто натиснувши на текст правою кнопкою миші',
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