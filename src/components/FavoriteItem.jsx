import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Spacer,
  VStack,
  HStack,
  Text,
  Button,
  IconButton,
  useColorMode,
  Image,
  useToast,
  Flex,
  Square,
  Center
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { CloseIcon, ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";

//Styling:
const fadeIn = keyframes`
  0% { opacity:0; }
  100% { opacity:1; }
  `;

const ImageItem = ({ images, setImages, toggle, setToggle }) => {
  const [value, setValue] = useState(0);
  const { colorMode, toggleColorMode } = useColorMode();

  const toast = useToast();

  //Handle function to move images carousel forwards and backwards
  const incrementItem = () => {
    value === images.length - 1 ? setValue(0) : setValue(value + 1);
  };
  const decrementItem = () => {
    value === 0 ? setValue(images.length - 1) : setValue(value - 1);
  };

  // SetInterval to move through array of images at a set timer
  useEffect(() => {
    const interval = setInterval(() => {
      value === images.length - 1
        ? setValue(() => 0)
        : setValue(() => value + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, [value]);
  const [toastMessage, setToastMessage] = useState(undefined);

  useEffect(() => {
    if (toastMessage) {
      toast({
        title: toastMessage.title,
        description: toastMessage.description,
        status: "warning",
        duration: toastMessage.duration,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }, [toastMessage, toast]);

  const handleDeleteFavorite = (event) => {
    event.preventDefault();
    let title;
    let description;
    let duration;
    let image_id = images[value].image_id;

    let token = localStorage.getItem('curioToken');

    const body = {
      image_id
    }

    fetch('/favorites/deleteFavorite', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${token}`,
      },
      body: JSON.stringify(body)
    })
      .then((res) => res.text())
      .then((data) => {
        title = 'Success';
        description = `${data}`;
        duration = 9000;
        setToastMessage({ title, description, duration });
        // setImages(images.filter(item => item.image_id !== images[value].image_id))
        setToggle(true);
      })
      .catch((error) => {
        title = 'error';
        description = `${error.err}`;
        duration = 9000;
        setToastMessage({ title, description, duration });
      });
  };


  return (
    <>
      <div style={{ height: "60vh" }}>
        <Flex color="white">
          <Square size="30vw" style={{ marginLeft: "0px", paddingLeft: "0px", height: "60vh", align: "right" }}>
            <Box flex="1" align="right" >
              <IconButton
                aria-label="favorite"
                icon={<ArrowBackIcon style={{ color: "black" }} />}
                onClick={incrementItem}
                boxSize="60px"
              />
            </Box>
          </Square>
          <Box flex="1" align="center" size="40vw">
            <Image
              src={images[value].primary_image}
              alt={images[value].image_title}
              boxSize="60vh"
              size="475px"
            />
          </Box>
          <Square size="30vw" style={{ height: "60vh" }}>
            <Box flex="1" align="left" >
              <IconButton
                aria-label="favorite"
                icon={<ArrowForwardIcon style={{ color: "black" }} />}
                onClick={decrementItem}
                boxSize="60px"
              />
            </Box>
          </Square>
        </Flex>
      </div>
      <div style={{ marginTop: "10px" }}>
        <Box
          backgroundColor="white"
          border="1px solid black"
          backgroundSize="cover"
          width="30vw"
          height="30vh"
          ml="auto"
          mr="auto"
        >
          <VStack>
            <Text align="center">{images[value].artist_display_name} </Text>
            {images[value].artist_nationality && images[value].artist_begin_date && images[value].artist_end_date && (< Text align="center">{images[value].artist_nationality}, {images[value].artist_begin_date} - {images[value].artist_end_date} </Text>)}
            < Text align="center" mt="40px" color="black">
              {images[value].object_name}
            </Text>
            <Text align="center">c. {images[value].object_begin_date} - {images[value].object_end_date}</Text>
          </VStack>
          <HStack justifyContent="space-between">
            {/* <Button align="left" onClick={toggleColorMode}>
              Toggle {colorMode === "light" ? "Dark" : "Light"}
            </Button> */}
            <IconButton id={`${images[value].image_id}`} onClick={handleDeleteFavorite} aria-label="favorite" icon={<CloseIcon />} />
          </HStack>
        </Box>
      </div>
    </>
  );
};

export default ImageItem;
