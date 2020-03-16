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
module.exports.getListeCircuit = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT c.CIRNOM as nom, c.CIRLONGUEUR as longu, c.CIRNBSPECTATEURS as nbrSpec FROM circuit c ORDER BY `nom` ASC ";

            //console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

// //le 'data' de t'as fonction contiens donc le num passé dans l'adresse
// 			module.exports.supCir = function (data, callback) {
//     db.getConnection(function (err, connexion) {
//         if (!err) {
//             let sql1 ="update grandprix set cirnum = NULL where cirnum =" + connexion.escape(data);
//             let sql2 = "delete from  circuit where cirnum =" + connexion.escape(data);
//             connexion.query(sql1);
//             connexion.query(sql2);
//             connexion.query(sql3);
//             connexion.query(sql4, callback);
//             connexion.release();
//
//         }
//     });
// }
