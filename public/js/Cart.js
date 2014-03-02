var CartItem = require('./CartItem.js').CartItem;

/**
 * Cart
 */
function Cart() {
    /*
     * Self reference
     * 
     * @type {Cart}
     */
    var that = this;

    /*
     * An element of the inner private variable 'list'
     * 
     * @typedef {Object} ListItem
     * @property {CartItem} instance Reference to the item instance
     * @property {number}   quantity Quantity of that item
     */

    /*
     * Items list
     * 
     * @type {Object.<string,ListItem>}
     */
    var list = {};

    /**
     * Adds an item to the cart
     * 
     * @param {CartItem} item     Cart item
     * @param {number}   quantity Quantity to be added
     * 
     * @returns {Cart} for method chaining
     */
    this.addItem = function (item, quantity) {
        if (typeof item !== "object" || item === null || item.constructor !== CartItem) {
            throw 'The parameter #1 should be a CartItem instance';
        } else if (isNaN(quantity) || quantity < 1) {
            throw 'The parameter #2 should be a positive number';
        } else if (!that.hasItem(item)) {
            list[item.getName()] = {
                'instance': item,
                'quantity': quantity
            };
        } else {
            list[item.getName()].quantity += quantity;
        }

        return that;
    };

    /**
     * Reduces the quantity of an item or even removes it from the cart
     * 
     * @param {CartItem} item       Cart item
     * @param {number}   [quantity] The quantity to be removed. All if not defined.
     * 
     * @returns {Cart} for method chaining
     */
    this.removeItem = function (item, quantity) {
        if (typeof item !== "object" || item === null || item.constructor !== CartItem) {
            throw 'The parameter #1 should be a CartItem instance';
        } else if (that.hasItem(item)) {
            if (!isNaN(quantity)) {
                if (quantity > 0) {
                    list[item.getName()].quantity -= quantity;
                }
            } else {
                delete list[item.getName()];
            }
        }

        return that;
    };

    /**
     * Gets current quantity of given item
     * 
     * @param {CartItem} item Cart item
     * 
     * @returns {number} The quantity or 0 if the item is not in the cart
     */
    this.getQuantityOf = function (item) {
        if (typeof item !== "object" || item === null || item.constructor !== CartItem) {
            throw 'The parameter #1 should be a CartItem instance';
        } else if (!that.hasItem(item)) {
            return 0;
        } else {
            return list[item.getName()].quantity;
        }
    };

    /**
     * Indicates wether given item is already in the cart or not
     * 
     * @param {CartItem} item Cart item
     * 
     * @returns {boolean}
     */
    this.hasItem = function (item) {
        if (typeof item !== "object" || item === null || item.constructor !== CartItem) {
            throw 'The parameter #1 should be a CartItem instance';
        } else {
            return list.hasOwnProperty(item.getName());
        }
    };

    /**
     * Removes every item from the cart
     * 
     * @returns {Cart} for method chaining
     */
    this.empty = function () {
        for (var field in list) {
            if (list.hasOwnProperty(field)) {
                that.removeItem(list[field].instance);
            }
        }

        return that;
    };
}

module.exports.Cart = Cart;