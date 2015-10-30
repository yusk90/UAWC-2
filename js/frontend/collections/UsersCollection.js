(function (app) {
    app.UsersCollection = Backbone.Collection.extend({
        model: app.UserModel,
        localStorage: new Backbone.LocalStorage('Users'),
        initialize: function () {
            this.fetch({reset: true});
        }
    })
})(app);