"use strict";
var ChartManager = /** @class */ (function () {
    function ChartManager(_chart) {
        this.chart = _chart;
    }
    ChartManager.prototype.setTimeLineOfChart = function (date, date2) {
        var tempDate = new Date(date.getTime());
        while (tempDate <= date2) {
            tempDate.setDate(tempDate.getDate() + 1);
            this.chart.data.labels.push(this.getDateString(tempDate));
            this.chart.update();
        }
    };
    ChartManager.prototype.addPointUpdateToChart = function (user) {
        var _this = this;
        var dataSet = {
            label: user.userName,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: this.getRandomColor(),
            data: new Array(this.chart.data.labels.length).fill(NaN)
        };
        var sum = 0;
        user.viableStackoverflowStats.slice().reverse().forEach(function (stat) {
            var statDate = new Date(stat.on_date * 1000);
            sum += stat.reputation_change;
            var insertIndex = _this.chart.data.labels.indexOf(_this.getDateString(statDate));
            dataSet.data.splice(insertIndex, 1, sum);
        });
        if (isNaN(dataSet.data[0]))
            dataSet.data.splice(0, 1, 0);
        if (isNaN(dataSet.data[dataSet.data.length - 1]))
            dataSet.data.splice(dataSet.data.length - 1, 1, dataSet.data.slice().reverse().find(function (fdat) { return !isNaN(fdat); }));
        this.chart.data.datasets.push(dataSet);
        this.chart.update();
    };
    ChartManager.prototype.getRandomColor = function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    ChartManager.prototype.getDateString = function (date) {
        return date.toISOString().slice(0, 10);
    };
    return ChartManager;
}());
