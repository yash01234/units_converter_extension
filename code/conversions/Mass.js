/**
 * Our mass class handles all mass related conversions
 */

class Mass {
    /**
     *
     * @param {Object} unit Mass unit
     * @param {Array} arr Array of all conversions
     */
    constructor(unit, arr) {
        this.unit = unit;
        this.arr = arr;
    }

    /**
     * Get a number's precision
     * @property {Function} getPrecision function for precision
     * @param {number} number
     * @returns precise numbers
     */
    getPrecision(number) {
        let parts = number.toString().split('.');
        if (parts.length <= 1) {
            return number < 0 ? parts[0].length - 1 : parts[0].length;
        }
        let intlen = number < 0 ? parts[0].length - 1 : parts[0].length;
        return intlen + parts[1].length;
    }

    /**
     * Return number with a max precison of 10
     * @param {number} number value to convert
     * @param {number} precision upto number precision
     * @returns precise value with precision of upto 10
     */
    getPreciseNumber(number, precision) {
        return number.toFixed(Math.min(Math.max(this.getPrecision(number), precision), 2));
    }

    /**
     * Our standard conversion is Kilograms, so we try to convert all selection to Kilograms
     * @property {Function} getStandardConversion function to convert into Kgs
     * @param {Object} quantity user query unit
     * @returns All values converted to Kilograms
     */

    getStandardConversion(quantity) {
        //We use a switch case to make appropriate conversion
        switch (this.unit.toLowerCase()) {
            case 'kilograms':
                return quantity;
            case 'grams':
                return quantity / 1000;
            case 'pounds':
                return quantity / 2.20462262;
            case 'tonnes':
                return quantity * 1000;
            case 'milligrams':
                return quantity / 1000000;
            case 'micrograms':
                return quantity / 1000000000;
            case 'ounces':
                return quantity / 35.273962;
            case 'ton':
                return quantity * 907.18474;
            default:
                return null;
        }
    }

    /**
     *From our standard conversion we try to convert into all the other units specified in arr property of this class
    with a precision no more than 10
     * @param {Object} quantity value to convert
     * @param {number} precision upto this number precise
     * @returns connverted value with precision upto 10
     */

    getAllConversions(quantity, precision) {
        let res = '';
        this.arr.forEach(u => {
            switch (u.toLowerCase()) {
                case 'kilograms':
                    res += ',' + this.getPreciseNumber(quantity, precision) + ' | Kgs';
                    break;
                case 'grams': {
                    let conv = quantity * 1000;
                    res += ',' + this.getPreciseNumber(conv, precision) + ' | gms';
                    break;
                }
                case 'pounds': {
                    let conv = quantity * 2.20462262;
                    res += ',' + this.getPreciseNumber(conv, precision) + ' | lbs';
                    break;
                }
                case 'tonnes': {
                    let conv = quantity / 1000;
                    res += ',' + this.getPreciseNumber(conv, precision) + ' | tonnes';
                    break;
                }
                case 'milligrams': {
                    let conv = quantity * 1000000;
                    res += ',' + this.getPreciseNumber(conv, precision) + ' | milligrams';
                    break;
                }
                case 'micrograms': {
                    let conv = quantity * 1000000000;
                    res += ',' + this.getPreciseNumber(conv, precision) + ' | micrograms';
                    break;
                }
                case 'ounces': {
                    let conv = quantity * 35.273962;
                    res += ',' + this.getPreciseNumber(conv, precision) + ' | ounces';
                    break;
                }
                case 'ton': {
                    let conv = quantity / 907.18474;
                    res += ',' + this.getPreciseNumber(conv, precision) + ' | tons';
                    break;
                }
            }
        });
        let result = this.dataAlignment(res);
        return result;
    }

    dataAlignment(res) {
        let str = '';
        var converions = res.split(',');
        converions.shift();
        var arr = [];
        converions.forEach(function(item) {
            arr.push(item.split('.')[0]);
        });
        var max_len = Math.max.apply(
            Math,
            arr.map(function(el) {
                return el.length;
            }),
        );

        for (var i in converions) {
            var curelt = converions[i];
            var cur_len = curelt.split('.')[0].length;
            if (cur_len < max_len) {
                var temp = '';
                var data = curelt.split('|');
                var fill = '';
                while (cur_len < max_len) {
                    fill += ' ';
                    cur_len = cur_len + 1;
                }
                str += ',' + data[0] + fill + '|' + data[1];
            }
        }
        return str;
    }
}
module.exports = Mass;
