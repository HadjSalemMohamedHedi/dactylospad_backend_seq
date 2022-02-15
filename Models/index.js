const { Sequelize, Op } = require('sequelize');
const db = require('../config/database');

const UserModel = require('./User');
const ProduitModel = require('./Produit');
const CompteModel = require('./Compte');
const UtilisateurModel = require('./Utilisateur');

//CREATE MODELS
const User = UserModel(db, Sequelize);
const Produit = ProduitModel(db, Sequelize);
const Compte = CompteModel(db, Sequelize);
const Utilisateur = UtilisateurModel(db, Sequelize);





Compte.hasOne(Utilisateur);
Utilisateur.belongsTo(Compte);

//GENERATE TABLES IN DB
db.sync({ force: false }).then(() => {
    console.log('Tables Created')
}).catch(() => {
    console.error('Error Created Table !!! ')
})

module.exports = {
    User,
    Produit,
    Compte,
    Utilisateur,
    Op
}