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
  Center,

} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { StarIcon, ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";

//Styling:
const fadeIn = keyframes`
  0% { opacity:0; }
  100% { opacity:1; }
  `;

const ImageItem = ({ images }) => {
  const [value, setValue] = useState(0);
  const { colorMode, toggleColorMode } = useColorMode();

  const toast = useToast();

  //Filter out only images that can be shown publicly
  images = images.filter((image) => image.isPublicDomain === true);

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

  const handleAddFavorite = (event) => {
    event.preventDefault();
    let title;
    let description;
    let duration;

    let primary_image = images[value].primaryImage;
    let image_title = images[value].title || null;
    let artist_display_name = images[value].artistDisplayName || null;
    let artist_nationality = images[value].artistNationality || null;
    let object_name = images[value].objectName || null;
    let object_begin_date = images[value].objectBeginDate || null;
    let object_end_date = images[value].objectEndDate || null;
    let image_id = images[value].objectID;
    let artist_begin_date = images[value].artistBeginDate || null;
    let artist_end_date = images[value].artistEndDate || null;
    let token = localStorage.getItem('curioToken');

    const body = {
      image_id, primary_image, image_title, artist_display_name,
      artist_nationality, artist_begin_date, artist_end_date, object_name,
      object_begin_date, object_end_date
    }

    console.log('body', body);

    fetch('/favorites/addFavorite', {
      method: 'POST',
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
      {/* <div style={{ marginTop: "50px", marginBottom: "30px" }}> */}
      {/* <Text align="center" mt="40px" color="black">
          {images[value].objectName}
        </Text> */}
      {/* </div> */}
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
              src={images[value].primaryImage}
              alt={images[value].title}
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
            <Text align="center">{images[value].artistDisplayName} </Text>
            {images[value].artistNationality && images[value].artistBeginDate && images[value].artistEndDate && (<Text align="center">{images[value].artistNationality}, {images[value].artistBeginDate} - {images[value].artistEndDate} </Text>)}

            <Text align="center" mt="40px" color="black">
              {images[value].objectName}
            </Text>
            <Text align="center">c. {images[value].objectBeginDate} - {images[value].objectEndDate}</Text>
          </VStack>
          <HStack justifyContent="space-between">
            {/* <Button align="left" onClick={toggleColorMode}>
              Toggle {colorMode === "light" ? "Dark" : "Light"}
            </Button> */}
            <IconButton id={`${images[value].objectID}`} onClick={(event) => handleAddFavorite(event)} aria-label="favorite" icon={<StarIcon />} />
          </HStack>
        </Box>
      </div>
    </>
  );
};

export default ImageItem;


