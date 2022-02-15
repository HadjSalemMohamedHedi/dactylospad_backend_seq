module.exports = (db, type) => {
    return db.define('Produits', {
        IdUser: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Nom: {
            type: type.INTEGER,
        }
    })
}