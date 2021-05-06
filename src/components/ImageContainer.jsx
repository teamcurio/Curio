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
  Heading
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { StarIcon } from "@chakra-ui/icons";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ImageItem from "./ImageItem"

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
  // const [value, setValue] = useState(1);
  // const [delay, setDelay] = useState(5000);
  // const [infoArray, setInfoArray] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();

  const { searchTerm } = props.location.state;

  // useEffect(() => {
  //   console.log(infoArray);
  // }, [infoArray])

  const handleChange = (e) => {
    // if (e.target.id === "+") {
    //   value === 4 ? setValue(0) : setValue(value + 1);
    //   infoArray.map((i) => {
    //     return (i.show = "none");
    //   });
    //   infoArray[value].show = "block";
    // } else {
    //   console.log(value - 1);
    //   if (value - 1 === -1) {
    //     setValue(4);
    //   } else {
    //     setValue(value - 1);
    //   }
    //   infoArray.map((i) => {
    //     return (i.show = "none");
    //   });
    //   infoArray[value].show = "block";
    // }
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
        <h1>Hi</h1>
        <Query query={IMAGES_QUERY} variables={{ searchTerm }}>
          {({ loading, error, data }) => {
            if (loading) return <div style={{ marginTop: '100px' }}><Heading align='center'>Creating Your Gallery</Heading></div>;
            if (error) console.log(error);
            return (
              <>
                <ImageItem images={data.Images.info} />
              </>
            );
          }}
        </Query>
      </div>
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
