module.exports = function(app) {

    var User = app.models.User;

    User.create({email: 'foo@bar.com', password: 'bar'}, function (err, userInstance) {
        console.log(userInstance);
    });
};