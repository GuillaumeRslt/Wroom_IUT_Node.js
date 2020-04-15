
let db = require('../configDb');
///////////////////////// liste écuries ////////////////////
module.exports.getListeEcurie = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT ecunum, payadrdrap, ecunom"
								+ " FROM ecurie e"
								+ " INNER JOIN pays p ON p.paynum=e.paynum"
								+ " ORDER BY ecunom";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

/////////////////////////////////// details écurie ////////////////////////
module.exports.getDetEcurie = function (data,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT DISTINCT e.ECUNOM as nom, e.ECUNOMDIR as dir, e.ECUADRSIEGE as adresse,"
								+ " pa.PAYNOM as pays, e.ECUADRESSEIMAGE as img, fp.FPNOM as pneu"
								+ " FROM ecurie e INNER JOIN pays pa ON pa.PAYNUM = e.PAYNUM"
								+ " LEFT JOIN fourn_pneu fp ON fp.FPNUM = e.FPNUM"
								+ " LEFT JOIN pilote p ON p.ECUNUM = e.ECUNUM"
								+ " WHERE e.ecunum = " + connexion.escape(data);

            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

/////////////////////// pilotes de l'écurie /////////////////////////
module.exports.getPiloteEcurie = function (data,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT p.pilnum, p.PILNOM as nompilote, p.PILPRENOM as prenompilote, phoadresse, piltexte"
						 			+ " FROM PILOTE P INNER JOIN ECURIE e ON p.ECUNUM = e.ECUNUM"
									+ " join photo ph on p.pilnum=ph.pilnum"
									+ " WHERE e.ecunum = " + connexion.escape(data)
									+ " and (phonum = 1 or phonum is null)";

            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

/////////////////////// voitures de l'écurie //////////////////////
module.exports.getPhotoEcurie = function (data,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT v.VOINOM as nomVoiture, v.VOIADRESSEIMAGE as imgVoit, tv.TYPELIBELLE as libelle"
								+ " FROM VOITURE v INNER JOIN type_voiture tv ON v.TYPNUM = tv.TYPNUM"
								+ " INNER JOIN ecurie e ON v.ECUNUM = e.ECUNUM"
								+ " WHERE e.ecunum = " + connexion.escape(data);

            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
