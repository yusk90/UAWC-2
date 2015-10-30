(function (app) {
    app.CounterWidgetView = app.BaseWidgetView.extend({
        tagName: 'div',
        className: 'update',
        template: '<div class="center__counter">' +
                    '<div class="center__process"></div>' +
                    '<strong>73<sup>%</sup></strong>' +
                    '</div>',
        initialize: function () {
            this.baseInitialize();
        },
        render: function () {
            this.$el.html(this.template);
            this.$el.append(this.editView.render().el);
            return this;
        }
    })
})(app);