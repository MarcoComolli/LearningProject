define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InfoDisplay = (function () {
        function InfoDisplay(nRowsSelected, avgRevenues, minYear, maxYear) {
            this.selectedRows = nRowsSelected;
            this.avgRevenues = avgRevenues;
            this.minYear = minYear;
            this.maxYear = maxYear;
        }
        return InfoDisplay;
    }());
    exports.InfoDisplay = InfoDisplay;
});
