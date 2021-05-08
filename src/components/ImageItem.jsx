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
        status: toastMessage.status,
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
    let token = localStorage.getItem("curioToken");

    const body = {
      image_id,
      primary_image,
      image_title,
      artist_display_name,
      artist_nationality,
      artist_begin_date,
      artist_end_date,
      object_name,
      object_begin_date,
      object_end_date,
    };

    console.log("body", body);

    fetch("/favorites/addFavorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.text())
      .then((data) => {
        if (data === "Favorite Saved") {
          title = "Success";
          description = `${data}`;
          duration = 9000;
          status = "success";
          setToastMessage({ title, description, duration, status });
        } else {
          title = "error";
          description = `${data}`
          duration = 9000;
          status = "error";
          setToastMessage({ title, description, duration, status });
        }
      })
      .catch((error) => {
        title = "error";
        description = "Favorite not saved"
        duration = 9000;
        status = "error";
        setToastMessage({ title, description, duration, status });
      });
  };

  return (
    <>
      <div style={{ height: "70vh", marginTop: "20px" }}>
        <Flex color="white">
          <Square size="30vw" style={{ height: "60vh", paddingRight: "20px" }}>
            <Box flex="1" align="right">
              <IconButton
                aria-label="favorite"
                icon={<ArrowBackIcon style={{ fontSize: "25px" }} />}
                onClick={decrementItem}
                boxSize="60px"
                bg="#ebc765"
                color="black"
                _hover={{ background: "black", color: "white" }}
              />
            </Box>
          </Square>
          <Box flex="1" align="center" size="40vw">
            <Image
              src={images[value].primaryImage}
              alt={images[value].title}
              boxSize="70vh"
              size="500px"
              border="3px solid black"
              borderRadius="3"
              boxShadow="lg"
            />
          </Box>
          <Square size="30vw" style={{ height: "60vh", paddingLeft: "20px" }}>
            <Box flex="1" align="left">
              <IconButton
                aria-label="favorite"
                icon={<ArrowForwardIcon style={{ fontSize: "25px" }} />}
                onClick={incrementItem}
                boxSize="60px"
                bg="#ebc765"
                color="black"
                _hover={{ background: "black", color: "white" }}
              />
            </Box>
          </Square>
        </Flex>
      </div>

      <Box
        backgroundColor="white"
        width="33vw"
        height="18vh"
        ml="auto"
        mr="auto"
        border="3px solid #ebc765"
        borderRadius="3"
        boxShadow="lg"
        mt="15px"
      >
        <Flex>
          <StarIcon
            onClick={(event) => handleAddFavorite(event)}
            style={{
              position: "absolute",
              margin: "7px",
              color: "#ebc765",
              fontSize: "15px",
            }}
          />
        </Flex>
        <Text
          align="center"
          mt="7px"
          mr="10px"
          ml="18px"
          color="black"
          style={{ fontWeight: "bold", fontSize: "15px" }}
        >
          {images[value].title}
        </Text>
        <Text
          align="center"
          color=" #ebc765"
          style={{ fontWeight: "bold", fontSize: "12px" }}
        >
          {images[value].objectName}
        </Text>
        {images[value].artistDisplayName && (
          <Text align="center" style={{ fontSize: "15px" }}>
            <span style={{ fontWeight: "bold", fontSize: "13px" }}>
              Artist:
            </span>{" "}
            {images[value].artistDisplayName}{" "}
          </Text>
        )}
        {images[value].artistNationality &&
          images[value].artistBeginDate &&
          images[value].artistEndDate && (
            <Text align="center" style={{ fontSize: "15px" }}>
              <span style={{ fontWeight: "bold", fontSize: "13px" }}>
                Artist Nationality:{" "}
              </span>
              {images[value].artistNationality} |{" "}
              <span style={{ fontWeight: "bold", fontSize: "13px" }}>
                Artist Date:{" "}
              </span>
              {images[value].artistBeginDate} - {images[value].artistEndDate}{" "}
            </Text>
          )}

        <Flex justifyContent="center">
          <Text align="center" style={{ fontSize: "15px" }}>
            <span style={{ fontWeight: "bold", fontSize: "13px" }}>Date: </span>
            c. {images[value].objectBeginDate} - {images[value].objectEndDate}{" "}
          </Text>{" "}
          {images[value].period && (
            <Text
              align="center"
              style={{ fontSize: "15px", paddingLeft: "5px" }}
            >
              |{" "}
              <span style={{ fontWeight: "bold", fontSize: "13px" }}>
                Period:{" "}
              </span>
              {images[value].period}
            </Text>
          )}
        </Flex>

        <Flex justifyContent="center">
          {images[value].department && (
            <Text align="center" style={{ fontSize: "15px" }}>
              <span style={{ fontWeight: "bold", fontSize: "13px" }}>
                Department:{" "}
              </span>
              {images[value].department}
            </Text>
          )}
          {images[value].culture && (
            <Text
              align="center"
              style={{ fontSize: "15px", paddingLeft: "5px" }}
            >
              |
              <span style={{ fontWeight: "bold", fontSize: "13px" }}>
                {" "}
                Culture:{" "}
              </span>
              {images[value].culture}
            </Text>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default ImageItem;
