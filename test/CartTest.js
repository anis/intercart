var Cart = require('../public/js/Cart.js').Cart;
var CartItem = require('../public/js/CartItem.js').CartItem;

var assert = require('assert');
var expect = require('expect.js');

var cart = new Cart();
var tomato = new CartItem('tomato');
var potato = new CartItem('potato');
var redBull = new CartItem('redBull');

describe('Cart', function () {
    describe('#addItem', function () {
        it('should take an Item as first parameter', function () {
            expect(function () {
                cart.addItem();
            }).to.throwError(function (e) {
                assert.equal(
                    e,
                    'The parameter #1 should be a CartItem instance'
                );
            });
        });

        it('should take a number as second parameter', function () {
            expect(function () {
                cart.addItem(tomato);
            }).to.throwError(function (e) {
                assert.equal(e, 'The parameter #2 should be a positive number');
            });
        });

        it('should take a positive number as second parameter', function () {
            expect(function () {
                cart.addItem(tomato, -1337);
            }).to.throwError(function (e) {
                assert.equal(e, 'The parameter #2 should be a positive number');
            });
        });

        it('should return itself', function () {
            assert.equal(cart.addItem(potato, 1), cart);
        });
    });

    describe('#getQuantityOf', function () {
        it('should take an Item as first parameter', function () {
            expect(function () {
                cart.getQuantityOf();
            }).to.throwError(function (e) {
                assert.equal(
                    e,
                    'The parameter #1 should be a CartItem instance'
                );
            });
        });

        it('should return 0 if the item has not been added', function () {
            assert.equal(cart.getQuantityOf(tomato), 0);
        });

        it('should return the actual quantity', function () {
            cart.addItem(tomato, 1337);
            assert.equal(cart.getQuantityOf(tomato), 1337);
        });
    });

    describe('#addItem', function () {
        it('should be cumulative', function () {
            cart.addItem(tomato, 3);
            assert.equal(cart.getQuantityOf(tomato), 1340);
        });
    });

    describe('#removeItem', function () {
        it('should take an Item as first parameter', function () {
            expect(function () {
                cart.removeItem();
            }).to.throwError(function (e) {
                assert.equal(
                    e,
                    'The parameter #1 should be a CartItem instance'
                );
            });
        });

        it('should remove an item when no quantity is precised', function () {
            cart.removeItem(tomato);
            assert.equal(cart.getQuantityOf(tomato), 0);
        });

        it('should reduce the quantity of an item when precised', function () {
            cart.addItem(tomato, 1337);
            cart.removeItem(tomato, 37);
            assert.equal(cart.getQuantityOf(tomato), 1300);
        });

        it('should do nothing if the given number is negative', function () {
            cart.removeItem(tomato, -37);
            assert.equal(cart.getQuantityOf(tomato), 1300);
        });

        it('should do nothing if the item of which the quantity should be reduced is not in the cart', function () {
            cart.removeItem(redBull, 1337);
        });

        it('should return itself', function () {
            assert.equal(cart.removeItem(potato), cart);
        });
    });

    describe('#hasItem', function () {
        it('should take an Item as first parameter', function () {
            expect(function () {
                cart.hasItem();
            }).to.throwError(function (e) {
                assert.equal(
                    e,
                    'The parameter #1 should be a CartItem instance'
                );
            });
        });

        // Yeah, well, could not find any better assertion description..
        it('should indicate the accurate information', function () {
            assert.equal(true, cart.hasItem(tomato));
            assert.equal(false, cart.hasItem(redBull));
            cart.removeItem(tomato);
            assert.equal(false, cart.hasItem(tomato));
        });
    });

    describe('#empty', function () {
        it('should remove every item', function () {
            cart.addItem(tomato, 25);
            cart.addItem(potato, 10);
            cart.addItem(redBull,   1989);

            cart.empty();

            assert.equal(cart.getQuantityOf(tomato), 0);
            assert.equal(cart.getQuantityOf(potato), 0);
            assert.equal(cart.getQuantityOf(redBull), 0);
        });

        it('should return itself', function () {
            assert.equal(cart.empty(), cart);
        });
    });

    describe('#foreach', function () {
        it('should apply the callback to each item', function () {
            cart.addItem(tomato, 1337);
            cart.addItem(potato, 42);

            cart.foreach(function (item) {
                cart.addItem(item.instance, item.quantity);
            });

            assert.equal(cart.getQuantityOf(tomato), 2674);
            assert.equal(cart.getQuantityOf(potato), 84);
        });
    });
});