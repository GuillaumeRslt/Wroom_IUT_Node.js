let model = require('../models/pilote.js');

// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S //////////////

module.exports.Repertoire = 	function(request, response){
   response.title = 'Répertoire des pilotes';
   // liste des 1ere lettre des noms des pilotes
   model.getListeLettre( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.listeLettre = result;
       //console.log(result);
       response.render('repertoirePilotes', response);
    });
};

// /////////////////////////P I L O T E S    D O N T    L E    N O M    C O M M E N C E    P A R

module.exports.Pilote = 	function(request, response){
  let data = request.params.lettre;
  response.title = 'Pilotes dont le nom commence par' + data;

  async.parallel ([
    function (callback) {
      model.getListeLettre( function (err, result) {
        callback(null, result) });
    }, // result[0] : lettres
    function(callback) {
      model.getPiloteParLettre(data, function (err, result) {
        callback(null, result) });
    }, // result[1] : pilotes
  ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }

      response.listeLettre = result[0];
      response.listePilote = result[1];
      response.render('repertoirePilotes', response);
    }
  ); //fin async
};


// /////////////////////////D E T A I L S    D U    P I L O T E //////////////////////

module.exports.DescPilote = 	function(request, response){
  let data = request.params.num;
  response.title = "Détails Pilote";

  async.parallel ([
    function (callback) {
      model.getListeLettre( function (err, result) {
        callback(null, result) });
    }, // result[0] : lettres
    function(callback) {
   model.getDescPilote( data, function (err, result) {
        callback(null, result) });
    }, // result[1] : details pilote
    function(callback) {
   model.getSponsors( data, function (err, result) {
        callback(null, result) });
    }, // result[2] : sponsors
    function(callback) {
   model.getImages( data, function (err, result) {
        callback(null, result) });
    }, // result[3] : images (!=profile)
  ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }

      response.listeLettre = result[0];
      response.descPilote = result[1][0];
      response.sponsors = result[2];
      response.images = result[3];
      response.render('repertoirePilotes', response);
    }
  ); //fin async
};
