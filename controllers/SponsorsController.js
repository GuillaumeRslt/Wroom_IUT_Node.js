let model = require('../models/sponsor.js');

var async = require('async');

// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.Sponsor = 	function(request, response){

   model.getListeSponsor( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.listeSponsor = result;
       //console.log(result);
       response.render('listerSponsors', response);
});
};

module.exports.Ajouter = 	function(request, response){

   model.getListeSponsor( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.listeSponsor = result;
       //console.log(result);
       response.render('AjouterSponsors', response);
});
};

module.exports.Modifier = 	function(request, response){

   model.getListeSponsor( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.listeSponsor = result;
       //console.log(result);
       response.render('ModifierSponsors', response);
});
};

module.exports.Supprimer = 	function(request, response){

let data = request.params.num;

async.parallel ([
  function (callback) {
    console.log('trois');

    model.supSponsor(data, function (err, result) {
      callback(null, result) });
      console.log('quatre');

  },
  function (callback) {
    model.getListeSponsor( function (err, result) {
      callback(null, result) });
      console.log('cinq');

  },
],
  function (err, result){
    if (err) {
        // gestion de l'erreur
        console.log(err);
        return;
    }

    response.listeSponsor = result[1];
    response.est_supprime = true;
    console.log('six');


    response.render('listerSponsors', response);
  }
); //fin async
};
