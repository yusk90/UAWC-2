$(function () {
    app.users = new app.UsersCollection();
    if (document.querySelector('#registration-form')) {
        new app.RegistrationView();
    }
    if (document.querySelector('#signin-form')) {
        new app.SigninView();
    }
    if (document.querySelector('#themes-widget')) {
        new app.ThemesView();
    }
    if (document.querySelector('#constructor-widget')) {
        new app.ConstructorView();
    }
});