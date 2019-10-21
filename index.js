"use strict";
var users = [
    new User("MauriceNino"),
    new User("Thomas Herzog"),
    new User("Erhard Siegl"),
    new User("Wirnse"),
    new User("patrick.holzer"),
    new User("meaningqo"),
    new User("ClemensKaserer")
];
$(document).ready(function () {
    var today = new Date();
    $("#fromDate").val(UserManager.challangeStartDate.toISOString().slice(0, 10));
    $("#toDate").val(today.toISOString().slice(0, 10));
    Chart.defaults.line.spanGaps = true;
    var elem = document.getElementById('myChart');
    var ctx = elem.getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        options: {
            maintainAspectRatio: false,
            responsive: true
        }
    });
    var cm = new ChartManager(chart);
    cm.setTimeLineOfChart(UserManager.challangeStartDate, new Date());
    users.forEach(function (user) {
        UserManager.loadFullUserObj(user)
            .then(function (fullUser) {
            console.log("Name: " + fullUser.userName);
            console.log("Points: " + fullUser.calculatedPoints);
            console.log(fullUser);
            cm.addPointUpdateToChart(fullUser);
        }).catch(function (exception) {
            console.error(exception.responseJSON);
        });
    });
});
function updateChart() {
    $('#myChart').remove();
    $('#chartWrapper').append('<canvas id="myChart" height="60%"></canvas>');
    var startDate = new Date($("#fromDate").val());
    var endDate = new Date($("#toDate").val());
    Chart.defaults.line.spanGaps = true;
    var elem = document.getElementById('myChart');
    var ctx = elem.getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        options: {
            maintainAspectRatio: false,
            responsive: true
        }
    });
    var cm = new ChartManager(chart);
    cm.setTimeLineOfChart(startDate, endDate);
    users.forEach(function (user) {
        cm.addPointUpdateToChart(user);
    });
}
