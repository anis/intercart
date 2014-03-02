var CartItem = require('../public/js/CartItem').CartItem;

var expect = require('expect.js');
var assert = require('assert');

describe('CartItem', function () {
    describe('#constructor', function () {
        it('@name should be mandatory', function () {
            expect(function () {
                new CartItem();
            }).to.throwError(function (e) {
                assert.equal(e, 'The name is mandatory');
            }); 
        });

        var invalidNames = [null,1337,[],{},new Object()];
        for (var i = 0; i < invalidNames.length; i += 1) {
            it('@name should be a string [' + i + ']', (function (invalidName) {
                return function () {
                    expect(function () {
                        new CartItem(invalidName);
                    }).to.throwError(function (e) {
                        assert.equal(e, 'The name must be a string');
                    });
                };  
            })(invalidNames[i]));
        }
    });

    describe('#getName', function () {
        it('should return the name', function () {
            var randomName = +(new Date()) + '',
                cart = new CartItem(randomName);

            assert.equal(cart.getName(), randomName);
        });
    });
});