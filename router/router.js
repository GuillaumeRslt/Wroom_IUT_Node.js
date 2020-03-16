
let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');
let SponsorsController = require('./../controllers/SponsorsController');
let ConnexionController = require('./../controllers/ConnexionController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

// connexion
    //app.get('/connexion', ConnexionController.Connexion);
    app.post('/accueil', ConnexionController.VerifConnexion);
    app.get('/deconnexion', ConnexionController.deconnexion);

// pilotes
    app.get('/listerPilote', PiloteController.Pilote);
    app.get('/ajouterPilote', PiloteController.Ajouter);
    app.get('/modifierPilote', PiloteController.Modifier);
    app.post('/listerPilote', PiloteController.Ajout);


 // circuits
   app.get('/listerCircuits', CircuitController.Circuit);
   app.get('/ajouterCircuit', CircuitController.Ajouter);
   app.get('/modifierCircuit', CircuitController.Modifier);
   app.get('/supprimerCircuit/:num', CircuitController.Supprimer);


// Ecuries
   app.get('/listerEcurie', EcurieController.Ecurie);
   app.get('/ajouterEcurie', EcurieController.Ajouter);
   app.get('/modifierEcurie', EcurieController.Modifier);
   app.get('/supprimerEcurie/:num', EcurieController.Supprimer);

 //Résultats
   app.get('/listerResultats', ResultatController.DescResultat);

//Sponsors
   app.get('/listerSponsors', SponsorsController.Sponsor);
   app.get('/ajouterSponsors', SponsorsController.Ajouter);
   app.get('/modifierSponsors', SponsorsController.Modifier);
   app.get('/supprimerSponsor/:num', SponsorsController.Supprimer);


// tout le reste
app.get('*', HomeController.NotFound);
app.post('*', HomeController.NotFound);

};
