module.exports = (db, type) => {
    return db.define('Utilisateur', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nom: {
            type: type.STRING,
        },
        Prenom: {
            type: type.STRING,
        },
        Adresse: {
            type: type.STRING,
        },
        Ville: {
            type: type.STRING,
        }
        
    })
}