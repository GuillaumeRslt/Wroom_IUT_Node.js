/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

/*
* Récupérer l'intégralité les écuries avec l'adresse de la photo du pays de l'écurie
* @return Un tableau qui contient le N°, le nom de l'écurie et le nom de la photo du drapeau du pays
*/
module.exports.getListePilote = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT p.PILNUM as num, p.PILNOM as nom, p.PILPRENOM as prenom, p.PILDATENAIS as dateNai FROM pilote p ORDER BY `nom` ASC";

            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getNationalite = function (callback) {

	db.getConnection(function(err, connexion){
		if(!err){

			let sql = "SELECT paynum, paynat FROM pays ORDER BY paynat";

			connexion.query(sql, callback);

			connexion.release();
		}
	});
};

module.exports.ajouterPilote = function (data, callback) {

	db.getConnection(function(err, connexion){
		if(!err){
			let sql = "insert into pilote set ?";

			connexion.query(sql, data, callback);

			connexion.release();
		}
	});
};

module.exports.getPilote = function (data, callback) {

	db.getConnection(function(err, connexion){
        if(!err){

						let sql ="SELECT pilnum, pilnom, pilprenom, pildatenais, piltaille, pilpoids,"
								+ " pilpoints, piltexte, p.paynum, paynat, p.ecunum, ecunom"
								+ " FROM pilote p"
								+ "	JOIN ecurie e ON p.ecunum=e.ecunum"
								+ " JOIN pays ON pays.paynum=p.paynum"
								+ " WHERE pilnum = " + connexion.escape(data);

            connexion.query(sql, callback);

            connexion.release();
         }
      });
};

module.exports.modifierPilote = function (data, callback) {

	db.getConnection(function(err, connexion){
        if(!err){

						let sql ="update pilote set ? where pilnum = "
									+ connexion.escape(data.pilnum);
								console.log(sql);
								console.log(data);
            connexion.query(sql, data, callback);

            connexion.release();
         }
      });
};

module.exports.supprimerPi = function (data, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
					  let sql1 = "delete from sponsorise where pilnum =" + connexion.escape(data);
            let sql2 = "delete from photo where pilnum =" + connexion.escape(data);
						let sql3 = "delete from course where pilnum =" + connexion.escape(data);
            let sql4 = "delete from pilote  where pilnum =" + connexion.escape(data);
            connexion.query(sql1);
            connexion.query(sql2);
            connexion.query(sql3);
            connexion.query(sql4, callback);
            connexion.release();
        }
    });
}