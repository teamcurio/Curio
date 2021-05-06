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
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ImageItem from "./ImageItem"
import NavBar from './NavBar';


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
  const { colorMode, toggleColorMode } = useColorMode();
  const { searchTerm } = props.location.state;
  const handleChange = (e) => {
  
  return (
    <>
      <NavBar displaySearch={true}/>
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
}

export default ImageContainer;
