import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Button,
  Spacer,
  Stack,
  useColorMode,
  Text,
  VStack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { StarIcon } from "@chakra-ui/icons";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const fadeIn = keyframes`
  0% { opacity:0; }
  100% { opacity:1; }
  `;

const IMAGES_QUERY = gql`
  query ImagesQuery($searchTerm: String!) {
    Images(searchTerm: $searchTerm) {
      total
      objectIDs
      info {
        objectID
        accessionYear
        isPublicDomain
        primaryImage
        department
        objectName
        title
        culture
        period
        artistDisplayName
        artistDisplayBio
        artistNationality
        objectDate
        objectBeginDate
        objectEndDate
        objectUrl
        constituents {
          constituentID
          name
        }
        tags {
          term
        }
      }
    }
  }
`;

const ImageContainer = (props) => {
  const [value, setValue] = useState(1);
  // const [delay, setDelay] = useState(5000);
  const [infoArray, setInfoArray] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();

  const { searchTerm } = props.location.state;

  useEffect(() => {
    console.log(infoArray);
  }, [infoArray])

  const handleChange = (e) => {
    if (e.target.id === "+") {
      value === 4 ? setValue(0) : setValue(value + 1);
      infoArray.map((i) => {
        return (i.show = "none");
      });
      infoArray[value].show = "block";
    } else {
      console.log(value - 1);
      if (value - 1 === -1) {
        setValue(4);
      } else {
        setValue(value - 1);
      }
      infoArray.map((i) => {
        return (i.show = "none");
      });
      infoArray[value].show = "block";
    }
  };
  // useInterval(() => {
  //   // Your custom logic here
  //   value === 4 ? setValue(1) : setValue(value + 1);
  //   infoArray.map((i) => {
  //     return (i.show = "none");
  //   });
  //   infoArray[value].show = "block";
  // }, delay);

  return (
    <>
      <div>
        <Text align="center" mt="40px" color="black">
          Title
        </Text>
      </div>
      <Stack direction={["column, row"]} spacing="24px">
        <Spacer></Spacer>
        <button
          style={{ outline: "none" }}
          onClick={handleChange}
          id="-"
        >{`<<<`}</button>
        <Spacer></Spacer>
        <Query query={IMAGES_QUERY} variables={{ searchTerm }}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);
            data.Images.info.forEach((item, idx) => {
              if (idx === 0) item['show'] = 'block';
              else item['show'] = 'none';
              // item['show'] = 'block'
            })
            // console.log("info:", data.Images.info[0])
            // console.log("info:", data.Images.info[1])
            setInfoArray(data.Images.info)
            return (
              <>
                {data.Images.info.map((item, idx) => (
                  <Box
                    backgroundColor="#222"
                    backgroundImage={`url(${item.primaryImage})`}
                    backgroundPosition="center"
                    backgroundSize="cover"
                    backgroundRepeat="no-repeat"
                    width="80vw"
                    height="60vh"
                    animation={`${fadeIn} ease 3s`}
                    display={item.show}
                    key={`key-${idx}`}
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
                ))}
              </>
            );
          }}
        </Query>

        <Spacer></Spacer>
        <button style={{ outline: "none" }} onClick={handleChange} id="+">
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
          <Text align="center">Artist</Text>
          <Text align="center">Date</Text>
          <Text align="center">Description</Text>
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
// function useInterval(callback, delay) {
//   const savedCallback = useRef();

//   // Remember the latest function.
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   // Set up the interval.
//   useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay);
//       return () => clearInterval(id);
//     }
//   }, [delay]);
// }

export default ImageContainer;
