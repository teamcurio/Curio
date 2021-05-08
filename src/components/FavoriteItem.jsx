import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  IconButton,
  Image,
  useToast,
  Flex,
  Square,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { CloseIcon, ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";

//Styling:
const fadeIn = keyframes`
  0% { opacity:0; }
  100% { opacity:1; }
  `;

const ImageItem = ({ images, setToggle }) => {
  const [value, setValue] = useState(0);

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

  //For alert message
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

  //Delete favorite
  const handleDeleteFavorite = (event) => {
    event.preventDefault();
    let description;
    let duration;
    let image_id = images[value].image_id;

    let token = localStorage.getItem("curioToken");

    const body = {
      image_id,
    };

    fetch("/favorites/deleteFavorite", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.text())
      .then((data) => {
        if (data === "Favorite Deleted") {
          description = `${data}`;
          duration = 9000;
          status = "success";
          setToastMessage({ description, duration, status });
          setValue(0);
          // setImages(images.filter(item => item.image_id !== images[value].image_id))
          setToggle(true);
        } else {
          description = "Please re-login";
          duration = 9000;
          status = "warning";
          setToastMessage({ description, duration, status });
        }
      })
      .catch((error) => {
        description = `${error.err}`;
        duration = 9000;
        status = "error";
        setToastMessage({ description, duration, status });
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
              src={images[value].primary_image}
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
          <CloseIcon
            onClick={handleDeleteFavorite}
            style={{
              position: "absolute",
              margin: "7px",
              color: "black",
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
          {images[value].image_title}
        </Text>
        <Text
          align="center"
          color=" #ebc765"
          style={{ fontWeight: "bold", fontSize: "12px" }}
        >
          {images[value].object_name}
        </Text>
        {images[value].artist_display_name && (
          <Text align="center" style={{ fontSize: "15px" }}>
            <span style={{ fontWeight: "bold", fontSize: "13px" }}>
              Artist:
            </span>{" "}
            {images[value].artist_display_name}{" "}
          </Text>
        )}
        {images[value].artist_nationality &&
          images[value].artist_beginD_date &&
          images[value].artist_end_date && (
            <Text align="center" style={{ fontSize: "15px" }}>
              <span style={{ fontWeight: "bold", fontSize: "13px" }}>
                Artist Nationality:{" "}
              </span>
              {images[value].artist_nationality} |{" "}
              <span style={{ fontWeight: "bold", fontSize: "13px" }}>
                Artist Date:{" "}
              </span>
              {images[value].artist_beginD_date} -{" "}
              {images[value].artist_end_date}{" "}
            </Text>
          )}

        <Flex justifyContent="center">
          <Text align="center" style={{ fontSize: "15px" }}>
            <span style={{ fontWeight: "bold", fontSize: "13px" }}>Date: </span>
            c. {images[value].object_begin_date} -{" "}
            {images[value].object_end_date}{" "}
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
