/**
 * Created by MelatroN on 28/01/2016.
 */

"use strict";

var BaseSortClass = require("./BaseSortClass");

class CombSortClass extends BaseSortClass.BaseSort {
    constructor(array) {
        super(array);
    }

    sort() {
        let interval = Math.floor(this.array.length / 1.3);

        while (interval > 0) {
            for (var i = 0; i + interval < this.array.length; i++) {
                if (this.compare(this.array[i], this.array[i + interval], i, i+ interval) === 1) {

                    this.swap(i, i + interval);
                } else {
                    this.noSwap(i, i + interval);
                }
            }
            interval = Math.floor(interval / 1.3);
        }
        return this.array;
    }
}

exports.CombSortClass = CombSortClass;