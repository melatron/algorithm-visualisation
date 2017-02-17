var CombSortClass = require('../classes/CombSortClass');
var QuickSortClass = require('../classes/QuickSortClass');

class AlgorithmService {
    static getComboActions(input, callback) {
        const comboSort = new CombSortClass(input);

        comboSort.sort();

        callback({
            actions: comboSort.actionsArray,
            sortedArr: comboSort.array
        });
    }

    static getQuickActions(input, callback) {
        const comboSort = new QuickSortClass(input);

        comboSort.sort();

        callback({
            actions: comboSort.actionsArray,
            sortedArr: comboSort.array
        });
    }
}

module.exports = AlgorithmService;
