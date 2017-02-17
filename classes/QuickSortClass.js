/**
 * Created by MelatroN on 28/01/2016.
 */

"use strict";

var BaseSortClass = require("./BaseSortClass");

class CombSortClass extends BaseSortClass {
    constructor(array) {
        super(array);
    }

    sort(left, right) {
        var pivot = null;
        var newPivot = null;

        if (typeof left !== 'number') {
            left = 0;
        }

        if (typeof right !== 'number') {
            right = this.array.length - 1;
        }

        if (left < right) {
            pivot = left + Math.ceil((right - left) * 0.5);
            newPivot = this.partition(pivot, left, right);

            this.sort(left, newPivot - 1);
            this.sort(newPivot + 1, right);
        }
    }

    partition(pivot, left, right) {
        var storeIndex = left,
            pivotValue = this.array[pivot];

        this.swap(pivot, right);

        for (var v = left; v < right; v++) {
            if (this.array[v] < pivotValue) {
                this.swap(v, storeIndex);
                storeIndex++;
            }
        }

        this.swap(right, storeIndex);

        return storeIndex;
    }

}

module.exports = CombSortClass;