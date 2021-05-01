import React from 'react';
import gql from "graphql-tag";
import ImageItem from './ImageItem'
import { Query } from "react-apollo";

const IMAGES_QUERY = gql`
    query ImagesQuery($searchTerm: String!) {
        Images(searchTerm: $searchTerm) {
            total
            objectIDs
        }
    }
`

const Images = () => {
    let searchTerm = "sunflower"
    return (
        <div>
            <Query query={IMAGES_QUERY} variables={{searchTerm}}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return <h4>Loading...</h4>
                        if (error) console.log(error)
                        console.log(data.Images.objectIDs)
                        return <>
                            {
                                data.Images.objectIDs.map(imageID => (
                                    <ImageItem key={imageID} imageID={imageID}/>
                                   
                                ))
                            }                
                        </>
                    } 
                }
         
            </Query>
        </div>
    )
}

export default Images
