(function (app) {
    app.ContactsWidgetView = app.BaseWidgetView.extend({
        tagName: 'div',
        elemHTML: '<ul><li>Адрес - 1</li><li>Адрес - 2</li><li>Телефон - </li></ul>',
        initialize: function () {
            this.baseInitialize();
        },
        render: function () {
            this.$el.attr('contenteditable', true);
            this.$el.html(this.elemHTML);
            this.$el.append(this.editView.render().el);
            return this;
        }
    })
})(app);