
let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');
let AccueilController = require('./../controllers/AccueilController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', AccueilController.GrandPrixDate);
    app.get('/accueil', AccueilController.GrandPrixDate);

// pilotes
    app.get('/repertoirePilote/', PiloteController.Repertoire);
    app.get('/detailsPilote/:num', PiloteController.Pilote);
    app.get('/descPilote/:nom', PiloteController.DescPilote);

 // circuits
  app.get('/circuits', CircuitController.DescCircuit);
  app.get('/detailsCircuit/:nom', CircuitController.DescCircuit);

// Ecuries
   app.get('/ecuries', EcurieController.DescEcurie);
   app.get('/detailsEcurie/:nom', EcurieController.DescEcurie);

 //Résultats
   app.get('/resultats', ResultatController.ListerResultat);
   app.get('/detailsGP/:num', ResultatController.DescResultat);


// tout le reste
app.get('*', HomeController.NotFound);
app.post('*', HomeController.NotFound);

};
