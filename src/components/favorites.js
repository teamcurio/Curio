// favorites module
// input: userID
// return: array of image objects from museum

const favorites = (userID) => {
  /*        localStorage.setItem('curioToken', data.token);
        localStorage.setItem('curioUser', data.user);*/
  const token = localStorage.getItem('curioToken');
  let favoriteImages = [];
  fetch(`/favorites/getfavorites`, {
    method:'GET',
    headers: {
      'Content-Type':'Application/json',
      Authorization: `${token}`,
    }
  })
    .then((res) => res.json())
    .then((data) => favoriteImages = data)
    .catch((err) => console.log(
      'failed to get back favorites'
    ));
  return favoriteImages;
};

export default favorites;