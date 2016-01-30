/**
 * Created by MelatroN on 27/01/2016.
 */

'use strict';

var combo = require('../classes/CombSortClass');
var quick = require('../classes/QuickSortClass');

exports.getComboActions = function (input, callback) {
    "use strict";

    let comboSort = new combo.CombSortClass(input);

    comboSort.sort();

    callback({
        actions: comboSort.actionsArray,
        sortedArr: comboSort.array
    });
};

exports.getQuickActions = function (input, callback) {
    "use strict";

    let comboSort = new quick.QuickSortClass(input);

    comboSort.sort();

    callback({
        actions: comboSort.actionsArray,
        sortedArr: comboSort.array
    });
};