import React from "react";
import { Heading, Spinner, Flex } from "@chakra-ui/react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ImageItem from "./ImageItem";
import NavBar from "./NavBar";

//SINGLE IMAGE
const IMAGE_QUERY = gql`
  query ImageQuery($objectID: Int!) {
    Image(objectID: $objectID) {
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
`
//GraphQl query string:
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
  const { searchTerm } = props.location.state;

  return (
    <>
      <NavBar displaySearch={true} />
      <div>
        <Query query={IMAGES_QUERY} variables={{ searchTerm }}>
          {({ loading, error, data }) => {
            if (loading)
              return (
                <div style={{ marginTop: "200px", justifyItems: "center" }}>
                  <Heading align="center">Creating Your Gallery</Heading>
                  <Flex style={{ marginTop: "20px", justifyItems: "center" }}>
                    <Spinner margin="auto" align="center" size="xl" />
                  </Flex>
                </div>
              );
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

export default ImageContainer;
