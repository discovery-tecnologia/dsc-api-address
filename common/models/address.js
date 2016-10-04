'use strict';
var g = require('strong-globalize')();

module.exports = function(Address) {

    /**
     * Rest create event
     */
    Address.afterRemote('create', function(ctx, user, next) {
        console.log('create');
        next();
    });

    /**
     * Rest update event
     */
    Address.afterRemote('update', function(ctx, user, next) {
        console.log('update');
        next();
    });

    /**
     * Internal event
     */
    Address.observe('before save', function(ctx, next) {
        if (ctx.isNewInstance) {
            // create
        } else {
            // update
        }
        next();
    });

    // Google Maps API has a rate limit of 10 requests per second
    // Seems we need to enforce a lower rate to prevent errors
    var lookupGeo = require('function-rate-limit')(5, 1000, function() {
        var geoService = Address.app.dataSources.geo;
        geoService.geocode.apply(geoService, arguments);
    });

    Address.remoteMethod('cep', {
        description: 'Obtains adrress by CEP.',
        accepts: {arg: 'cep', type: 'string', required: true},
        http: {path: '/cep/:cep', verb: 'get'},
        returns: [
            {arg: 'id', type: 'string', root: true},
            {arg: 'cep', type: 'string', root: true},
            {arg: 'logradouro', type: 'string', root: true},
            {arg: 'bairro', type: 'string', root: true},
            {arg: 'localidade', type: 'string', root: true},
            {arg: 'uf', type: 'string', root: true},
            {arg: 'geo', type: 'string'}
        ]
    });

    Address.cep = function(cep, cb) {
        Address.findOne({where: {cep: cep}}, function(err, address) {

            console.log(address);
            
            // geo code the address
            lookupGeo(address.logradouro, address.localidade, address.cep, function(err, result) {

                console.log(result);

                if (result && result[0]) {
                    address.geo = result[0];

                    cb(null, address);
                    //next();
                } else {
                    //TODO: Need to find out how to handle this with better a UX experience
                    next(new Error('could not find location'));
                }
            });

            // persiste o novo endereço
            /*Address.create(address, function (err, newAddress) {
                console.log('Created: ', newAddress.toObject());
                User.findById(newAddress.id, function (err, newAddress) {
                    console.log('Found: ', newAddress.toObject());
                });
            });*/
        });
    }

};
