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

  return (
    <>
      <div>
        <Text align="center" mt="40px" color="black">
          {images[value].objectName}
        </Text>
      </div>
      <Stack direction={["column, row"]} spacing="24px">
        <Spacer />
        {/* <button style={{ outline: "none" }} onClick={decrementItem} id="-"> */}
          <IconButton aria-label="favorite"  icon={<ArrowBackIcon />} onClick={decrementItem} id="-"/>
        {/* </button> */}
        <Spacer />

        <Box
          backgroundColor="#222"
          backgroundImage={`url(${images[value].primaryImage})`}
          backgroundPosition="center"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          animation={`${fadeIn} ease 3s`}
          width="80vw"
          height="60vh"
          mt="10px"
          ml="auto"
          mr="auto"
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backdropFilter: "contrast(.8)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "inherit",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></div>
          </div>
        </Box>

        <Spacer />
        <button style={{ outline: "none" }} onClick={incrementItem} id="+">
          <IconButton aria-label="favorite" icon={<ArrowForwardIcon />} />
        </button>
        <Spacer />
      </Stack>
      <Box
        backgroundColor="white"
        border="1px solid black"
        backgroundSize="cover"
        width="80vw"
        height="21vh"
        mt="10px"
        ml="auto"
        mr="auto"
      >
        <VStack>
          <Text align="center">{images[value].artistDisplayName}</Text>
          <Text align="center">{images[value].objectDate}</Text>
        </VStack>
        <HStack justifyContent="space-between">
          <Button align="left" onClick={toggleColorMode}>
            Toggle {colorMode === "light" ? "Dark" : "Light"}
          </Button>
          <IconButton aria-label="favorite" icon={<StarIcon />} />
        </HStack>
      </Box>
    </>
  );
};

export default ImageItem;
