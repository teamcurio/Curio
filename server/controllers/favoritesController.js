const db = require("../models/curioModel");


const favoritesController = {};

favoritesController.getFavorites = (req, res, next) => {
    const user_id = res.locals.user_id;
    console.log('user id', user_id);

    const getFaveQuery = `SELECT image_id FROM "Favorites" WHERE user_id=$1`;
    const value = [user_id];

    db.query(getFaveQuery, value)
        .then((data) => {
            console.log(data.rows)
            res.locals.favorites = data.rows;
            return next()
        })
        .catch((err) => {
            return next({
                message: { err: 'Error getting favorites from database'}
            });
        });
};

favoritesController.addFavorites = (req, res) => {

};

favoritesController.deleteFavorites = (req, res) => {

};

module.exports = favoritesController