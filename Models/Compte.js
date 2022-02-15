module.exports = (db, type) => {
    return db.define('Compte', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Email: {
            type: type.STRING,
        },
        Password: {
            type: type.STRING,
        },
        Role: {
            type: type.STRING,
        },
        DernierConnexion: {
            type: type.DATE,
        }
    })
}