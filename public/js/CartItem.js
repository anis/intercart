/**
 * A cart item
 * 
 * @param {string} name Name of the item
 */
function CartItem(name) {
    /**
     * Gets the name
     * 
     * @returns {string}
     */
    this.getName = function () {
        return name;
    };

    // Ensure the name is valid
    if (name === undefined) {
        throw 'The name is mandatory';
    } else if (typeof name !== 'string') {
        throw 'The name must be a string';
    }
};

module.exports.CartItem = CartItem;