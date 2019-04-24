"use strict";
$(document).ready(function () {
    var users = [
        new User("MauriceNino"),
        new User("Thomas Herzog"),
        new User("Erhard Siegl"),
        new User("Wirnse")
    ];
    users.forEach(function (user) {
        UserManager.loadFullUserObj(user)
            .then(function (fullUser) {
            console.log("Name: " + fullUser.userName);
            console.log("Points: " + fullUser.calculatedPoints);
            console.log(fullUser);
        }).catch(function (exception) {
            console.error(exception.responseJSON);
        });
    });
});
