let model = require('../models/circuit.js');
//
// ////////////////////// D E T A I l     C I R C U I T S

module.exports.DescCircuit = 	function(request, response){
  let data = request.params.nom;
  console.log('desccircuit');
  async.parallel ([
    function (callback) {
      model.getListeCircuit( function (err, result) {
        callback(null, result) });
    },
    function(callback) {
      model.getDetCircuit(data, function (err, result) {
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
      response.listeCircuit = result[0];
      response.detailsCircuits = result[1];
      response.render('detailsCircuit', response);
    }
  ); //fin async
};
