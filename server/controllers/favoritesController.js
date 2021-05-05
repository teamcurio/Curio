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

favoritesController.addFavorite = (req, res, next) => {
    const { image_id } = req.body;
    const user_id = res.locals.user_id;

    const addFaveQuery = `INSERT INTO "Favorites" (user_id, image_id) VALUES ($1, $2) RETURNING *`
    const values = [user_id, image_id];

    db.query(addFaveQuery, values)
        .then((data) => {
            return next();
        })
        //TODO: err.constraint?
        .catch((err) => {
            return next({
                message: { err: 'Error adding Favorite to database'}
            })
        })
};

favoritesController.deleteFavorite = (req, res, next) => {
    const { image_id} = req.body;
    const user_id = res.locals.user_id;

    const deleteFave = `DELETE FROM "Favorites" WHERE user_id=$1 AND image_id=$2 RETURNING *;`
    const values = [user_id, image_id];

    db.query(deleteFave, values)
        .then((data) => {
            console.log(data)
            if (data.rows[0]) return next();
            else {
                return next({
                    message: { err: 'Favorite does not exist for user.'}
                });
            }
        })
        .catch((err) => {
            return next({
                message: { err: 'Error deleting favorite from database'}
            })
        })
};

module.exports = favoritesController