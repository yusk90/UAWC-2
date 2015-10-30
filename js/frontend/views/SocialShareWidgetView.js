(function (app) {
    app.SocialShareWidgetView = app.BaseWidgetView.extend({
        tagName: 'div',
        elemHTML: '<script type="text/javascript" src="//yastatic.net/share/share.js" charset="utf-8"></script><div class="yashare-auto-init" data-yashareL10n="ru" data-yashareType="none" data-yashareQuickServices="vkontakte,facebook,twitter,odnoklassniki,moimir"></div>',
        initialize: function () {
            this.baseInitialize();
        },
        render: function () {
            this.$el.html(this.elemHTML);
            this.$el.append(this.editView.render().el);
            return this;
        }
    })
})(app);