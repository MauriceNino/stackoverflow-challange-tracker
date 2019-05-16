"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var User = /** @class */ (function () {
    function User(_userName) {
        this.userName = "";
        this.stackoverflowUserObject = null;
        this.stackoverflowAnswers = null;
        this.stackoverflowStats = null;
        this.viableStackoverflowAnswers = null;
        this.viableStackoverflowStats = null;
        this.userName = _userName;
    }
    return User;
}());
var UserManager = /** @class */ (function () {
    function UserManager() {
    }
    UserManager.loadFullUserObj = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _b, _c, _d, _e, _f, _g, exception_1;
                        return __generator(this, function (_h) {
                            switch (_h.label) {
                                case 0:
                                    _h.trys.push([0, 8, , 9]);
                                    // Load the stackoverflow user object
                                    _a = user;
                                    return [4 /*yield*/, UserManager.getStackoverflowUser(user)
                                        // Get all answers of the user
                                    ];
                                case 1:
                                    // Load the stackoverflow user object
                                    _a.stackoverflowUserObject = _h.sent();
                                    // Get all answers of the user
                                    _b = user;
                                    return [4 /*yield*/, UserManager.getAnswersOfUser(user.stackoverflowUserObject, 1)
                                        // Get all the reputation changes of the user
                                    ];
                                case 2:
                                    // Get all answers of the user
                                    _b.stackoverflowAnswers = _h.sent();
                                    // Get all the reputation changes of the user
                                    _c = user;
                                    return [4 /*yield*/, UserManager.getStatsOfUser(user.stackoverflowUserObject, 1)];
                                case 3:
                                    // Get all the reputation changes of the user
                                    _c.stackoverflowStats = _h.sent();
                                    _d = user;
                                    return [4 /*yield*/, UserManager.getAnswersAfterDate(user.stackoverflowAnswers, UserManager.challangeStartDate)];
                                case 4:
                                    _d.viableStackoverflowAnswers = _h.sent();
                                    _e = user;
                                    return [4 /*yield*/, UserManager.getAnswersBeforeDate(user.viableStackoverflowAnswers, new Date())
                                        // Get all the stats that are viable for the challenge
                                    ];
                                case 5:
                                    _e.viableStackoverflowAnswers = _h.sent();
                                    // Get all the stats that are viable for the challenge
                                    _f = user;
                                    return [4 /*yield*/, UserManager.getStatsRelatedToAnswers(user.viableStackoverflowAnswers, user.stackoverflowStats)];
                                case 6:
                                    // Get all the stats that are viable for the challenge
                                    _f.viableStackoverflowStats = _h.sent();
                                    _g = user;
                                    return [4 /*yield*/, UserManager.calculatePointsOfUser(user)];
                                case 7:
                                    _g.calculatedPoints = _h.sent();
                                    resolve(user);
                                    return [3 /*break*/, 9];
                                case 8:
                                    exception_1 = _h.sent();
                                    reject(exception_1);
                                    return [3 /*break*/, 9];
                                case 9: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    UserManager.getStatsRelatedToAnswers = function (answers, stats) {
        return new Promise(function (resolve, reject) {
            var tempStats = [];
            stats.forEach(function (stat) {
                if (answers.map(function (a) { return a.answer_id; }).indexOf(stat.post_id) !== -1)
                    tempStats.push(stat);
            });
            resolve(tempStats);
        });
    };
    UserManager.calculatePointsOfUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var points;
                        return __generator(this, function (_a) {
                            points = 0;
                            user.viableStackoverflowStats.forEach(function (stat) {
                                points += stat.reputation_change;
                            });
                            resolve(points);
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    UserManager.getStatsBeforeDate = function (stackoverflowStats, compareDate) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, stackoverflowStats.filter(function (stat) {
                        var tempDate = new Date(stat.on_date * 1000);
                        return tempDate <= compareDate;
                    })];
            });
        });
    };
    UserManager.getStatsAfterDate = function (stackoverflowStats, compareDate) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, stackoverflowStats.filter(function (stat) {
                        var tempDate = new Date(stat.on_date * 1000);
                        return tempDate >= compareDate;
                    })];
            });
        });
    };
    UserManager.getStatsOfUser = function (stackoverflowUserObject, page) {
        return __awaiter(this, void 0, void 0, function () {
            var prom, data, arr, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        prom = new Promise(function (resolve, reject) {
                            if (stackoverflowUserObject == undefined)
                                reject();
                            $.ajax("https://api.stackexchange.com/2.2/users/" + stackoverflowUserObject.user_id + "/reputation?page=" + page + "&pagesize=100&site=stackoverflow", {
                                dataType: 'json',
                                error: function (msg) {
                                    reject(msg);
                                },
                                success: function (data) {
                                    resolve(data);
                                },
                                type: 'GET'
                            });
                        });
                        return [4 /*yield*/, prom];
                    case 1:
                        data = _c.sent();
                        console.log("In user " + stackoverflowUserObject.user_id + " with page " + page);
                        console.log(data.items);
                        arr = data.items.slice();
                        if (data.backoff != undefined)
                            UserManager.sleepBecauseStackoverflowLimits(data.backoff);
                        if (!data.has_more) return [3 /*break*/, 3];
                        _b = (_a = arr).concat;
                        return [4 /*yield*/, UserManager.getStatsOfUser(stackoverflowUserObject, ++page)];
                    case 2:
                        arr = _b.apply(_a, [_c.sent()]);
                        _c.label = 3;
                    case 3: return [2 /*return*/, arr];
                }
            });
        });
    };
    UserManager.getAnswersBeforeDate = function (stackoverflowAnswers, compareDate) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, stackoverflowAnswers.filter(function (answer) {
                        var tempDate = new Date(answer.creation_date * 1000);
                        return tempDate <= compareDate;
                    })];
            });
        });
    };
    UserManager.getAnswersAfterDate = function (stackoverflowAnswers, compareDate) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, stackoverflowAnswers.filter(function (answer) {
                        var tempDate = new Date(answer.creation_date * 1000);
                        return tempDate >= compareDate;
                    })];
            });
        });
    };
    UserManager.getAnswersOfUser = function (stackoverflowUserObject, page) {
        return __awaiter(this, void 0, void 0, function () {
            var prom, data, arr, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        prom = new Promise(function (resolve, reject) {
                            if (stackoverflowUserObject == undefined)
                                reject();
                            $.ajax("https://api.stackexchange.com/2.2/users/" + stackoverflowUserObject.user_id + "/answers?page=" + page + "&pagesize=100&order=desc&sort=creation&site=stackoverflow", {
                                dataType: 'json',
                                error: function (msg) {
                                    reject(msg);
                                },
                                success: function (data) {
                                    return resolve(data);
                                },
                                type: 'GET'
                            });
                        });
                        return [4 /*yield*/, prom];
                    case 1:
                        data = _c.sent();
                        console.log("In user " + stackoverflowUserObject.user_id + " with page " + page);
                        console.log(data.items);
                        arr = data.items.slice();
                        if (data.backoff != undefined)
                            UserManager.sleepBecauseStackoverflowLimits(data.backoff);
                        if (!data.has_more) return [3 /*break*/, 3];
                        _b = (_a = arr).concat;
                        return [4 /*yield*/, UserManager.getAnswersOfUser(stackoverflowUserObject, ++page)];
                    case 2:
                        arr = _b.apply(_a, [_c.sent()]);
                        _c.label = 3;
                    case 3: return [2 /*return*/, arr];
                }
            });
        });
    };
    UserManager.getStackoverflowUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        $.ajax("https://api.stackexchange.com/2.2/users?inname=" + user.userName + "&site=stackoverflow", {
                            dataType: 'json',
                            error: function (msg) {
                                reject(msg);
                            },
                            success: function (data) {
                                if (data.backoff != undefined)
                                    UserManager.sleepBecauseStackoverflowLimits(data.backoff);
                                resolve(data.items[0]); // Unwrap user
                            },
                            type: 'GET'
                        });
                    })];
            });
        });
    };
    UserManager.sleepBecauseStackoverflowLimits = function (milliseconds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, milliseconds); })];
            });
        });
    };
    UserManager.challangeStartDate = new Date('2019-03-30T00:00:00');
    return UserManager;
}());
