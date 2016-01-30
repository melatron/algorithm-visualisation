/**
 * Created by MelatroN on 27/01/2016.
 */

var AlgorithmService = require('../services/AlgorithmService');

exports.combSort = function (req, res) {
    "use strict";
    var data = req.body;
    //var array = data.array;
    var array = data['array[]'].map(Number);

    if (!Array.isArray(array)) {
        array = [5, 8, 4, 3, 9, 10, 20, -4, 7, 1, 15, 23, 31, -10];
    }

    AlgorithmService.getComboActions(array, function (data) {
        res.json(data);
    });
};

exports.quickSort = function (req, res) {
    "use strict";
    var data = req.body;
    //var array = data.array;
    var array = data['array[]'].map(Number);

    if (!Array.isArray(array)) {
        array = [5, 8, 4, 3, 9, 10, 20, -4, 7, 1, 15, 23, 31, -10];
    }

    AlgorithmService.getQuickActions(array, function (data) {
        res.json(data);
    });
};
