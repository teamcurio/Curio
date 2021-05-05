// favorites module
// input: userID
// return: array of image objects from museum

const favorites = (userID) => {
  let favoriteImages = [];
  fetch(`/favorites/getfavorites/${userID}`)
    .then((res) => res.json())
    .then((data) => favoriteImages = data)
    .catch((err) => console.log(
      'failed to get back favorites'
    ))
  return favoriteImages;
}

export default favorites;