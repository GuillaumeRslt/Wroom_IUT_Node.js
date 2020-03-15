let model = require('../models/ecurie.js');

// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.Ecurie = 	function(request, response){

   model.getListeEcurie( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.listeEcurie = result;
       //console.log(result);
       response.render('listerEcurie', response);
});
};

module.exports.Ajouter = 	function(request, response){

   model.getListeEcurie( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.listeEcurie = result;
       //console.log(result);
       response.render('ajouterEcurie', response);
});
};

module.exports.Modifier = 	function(request, response){

   model.getListeEcurie( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
       response.listeEcurie = result;
       //console.log(result);
       response.render('modifierEcurie', response);
});
};


module.exports.Supprimer = 	function(request, response){
let data = request.params.num;
async.parallel ([
  function (callback) {
    model.supEcu(data, function (err, result) {
      callback(null, result) });
  },
],
  function (err, result){
    if (err) {
        // gestion de l'erreur
        console.log(err);
        return;
    }
    console.log(result);
    response.supEcurie = result;
    response.render('supprimerEcurie', response);
  }
); //fin async
};
