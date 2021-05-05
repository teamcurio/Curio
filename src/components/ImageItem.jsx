import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const IMAGE_QUERY = gql`
  query ImageQuery($objectID: Int!) {
    Image(objectID: $objectID) {
      accessionYear
      isPublicDomain
      primaryImage
      department
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
`;

const ImageItem = ({ imageID }) => {
    
  return (
    <div>
      <Query query={IMAGE_QUERY} variables={{ objectID: imageID }}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>;
          if (error) console.log(error);
          console.log("data", data);
          console.log(imageID);
          return (
            <>
              <h1>{data.Image.primaryImage}</h1>
            </>
          );
        }}
      </Query>
    </div>
  );
};

export default ImageItem;
