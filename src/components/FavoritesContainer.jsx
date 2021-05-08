import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import FavoriteItem from './FavoriteItem';
import { Heading } from "@chakra-ui/react";

const FavoritesContainer = () => {
  const [images, setImages] = useState([])

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('curioToken');
    fetch('/favorites/getfavorites', {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `${token}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setImages(data);
        setToggle(false)
      })
      .catch((err) => console.log(
        'failed to get back favorites'
      ));
  }, [toggle]);
  return (
    <>
      <NavBar displaySearch={true} />
      <div >
        {!images.length ? <Heading align="center" mt="200px">No Favorites Found</Heading>:
          < FavoriteItem images={images} toggle={toggle} setToggle={setToggle} setImages={setImages} />
        }
      </div>
    </>
  )
};

export default FavoritesContainer;