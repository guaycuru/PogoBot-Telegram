'use strict';

var fs = require('fs'),
    _ = require('lodash'),
    pokedex = JSON.parse(fs.readFileSync(__dirname + '/../locale/pokemon.en.json'));

exports.pokedex = pokedex;

// Receives an array and returns the pokedex numbers of the given pokemen
// If a given pokemon name doesn't exist, it is ignored.
exports.getPokemonIdsByNames = function(names) {
    return names.map(function(name) {
        return _.findKey(pokedex, function(p) {
            return p === name;
        });
    }).filter(function(p) {
        return p !== undefined;
    }).map(function(p) {
        return Number(p);
    });
};
