define(['chai', 'public/js/src/CartItem'], function (chai, CartItem) {
    var assert = chai.assert;

    describe('CartItem', function () {
        describe('#constructor', function () {
            it('@name should be mandatory', function () {
                assert.throws(function() {
                    new CartItem();
                }, 'The name is mandatory');
            });

            it('@name should be a string', function () {
                assert.throws(function () {
                    new CartItem(1337);
                }, 'The name must be a string');
            });
        });

        describe('#getName', function () {
            it('should return the name', function () {
                var randomName = +(new Date()) + '',
                    cart = new CartItem(randomName);

                assert.equal(cart.getName(), randomName);
            });
        });
    });
});