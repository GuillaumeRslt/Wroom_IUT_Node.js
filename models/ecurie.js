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
module.exports.getListeEcurie = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT ecunum, ecunom as nom, ecunomdir as dir, ecupoints as point "
										+ "FROM ecurie";
            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//le 'data' de t'as fonction contiens donc le num passé dans l'adresse
			module.exports.supEcu = function (data, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql1 ="update pilote set ecunum = NULL where ecunum =" + connexion.escape(data);
            let sql2 = "delete from  voiture where ecunum =" + connexion.escape(data);
            let sql3 = "delete from  finance  where ecunum =" + connexion.escape(data);
            let sql4 = "delete from  ecurie  where ecunum =" + connexion.escape(data);
            connexion.query(sql1);
            connexion.query(sql2);
            connexion.query(sql3);
            connexion.query(sql4, callback);
            connexion.release();

        }
    });
}
