import React, { useState, useEffect } from "react";
import { Box, Stack, Spacer, VStack, HStack, Text, Button, IconButton, useColorMode } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const ImageItem = (props) => {
  const images = props.images.filter(image => image.isPublicDomain === true);
  const [value, setValue] = useState(0);
  const incrementItem = () => {
    value === images.length - 1 ? setValue(0) : setValue(value + 1);
  }
  const decrementItem = () => {
    value === 0 ? setValue(images.length - 1) : setValue(value - 1);
  }

  // useEffect(() => {
  //   console.log(value);
  // }, [value])
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <div>
        {images.map((item, idx) => {
          if (idx === value) {
            return <Text align="center" mt="40px" color="black">
              {item.objectName}
            </Text>
          }
        })
        }
      </div>
      <Stack direction={["column, row"]} spacing="24px">
        <Spacer></Spacer>
        <button
          style={{ outline: "none" }}
          onClick={decrementItem}
          id="-"
        >{`<<<`}</button>
        <Spacer></Spacer>
        {images.map((item, idx) => {
          if (idx === value) {
            return <Box
              backgroundColor="#222"
              backgroundImage={`url(${item.primaryImage})`}
              backgroundPosition="center"
              backgroundSize="cover"
              backgroundRepeat="no-repeat"
              width="80vw"
              height="60vh"
              // animation={`${fadeIn} ease 3s`}
              // display={item.show}
              key={`item-${idx}`}
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
                >
                </div>
              </div>
            </Box>
          }
        })
        }
        <Spacer></Spacer>
        <button style={{ outline: "none" }} onClick={incrementItem} id="+">
          {`>>>`}{" "}
        </button>
        <Spacer></Spacer>
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
          {images.map((item, idx) => {
            if (idx === value) {
              return <>
                <Text key={`artistDisplayName-${idx}`} align="center">{item.artistDisplayName}</Text>
                <Text key={`objectDate-${idx}`} align="center">{item.objectDate}</Text>
              </>
            }
          })
          }
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
