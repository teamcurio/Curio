const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
} = require('graphql');
<<<<<<< HEAD

=======
// const { ModuleFilenameHelpers } = require("webpack");
>>>>>>> main

//Image Type
const ImageType = new GraphQLObjectType({
  name: 'Image',
  fields: () => ({
    objectID: { type: GraphQLInt },
    accessionYear: { type: GraphQLString },
    isPublicDomain: { type: GraphQLBoolean },
    primaryImage: { type: GraphQLString },
    constituents: { type: new GraphQLList(ConstituentsType) },
    department: { type: GraphQLString },
    objectName: { type: GraphQLString },
    title: { type: GraphQLString },
    culture: { type: GraphQLString },
    period: { type: GraphQLString },
    artistDisplayName: { type: GraphQLString },
    artistDisplayBio: { type: GraphQLString },
    artistNationality: { type: GraphQLString },
    objectDate: { type: GraphQLString },
    objectBeginDate: { type: GraphQLInt },
    objectEndDate: { type: GraphQLInt },
    objectUrl: { type: GraphQLString },
    tags: { type: new GraphQLList(TagType) },
  }),
});

//Constituents Type
const ConstituentsType = new GraphQLObjectType({
  name: 'Constituents',
  fields: () => ({
    constituentID: { type: GraphQLInt },
    name: { type: GraphQLString },
  }),
});

//Tag type
const TagType = new GraphQLObjectType({
  name: 'Tag',
  fields: () => ({
    term: { type: GraphQLString },
  }),
});

const ImagesType = new GraphQLObjectType({
  name: 'Images',
  fields: () => ({
    total: { type: GraphQLInt },
    objectIDs: { type: new GraphQLList(GraphQLInt) },
    // Images: { type: new GraphQLList(ImageType) }
  }),
});


//Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    Images: {
      type: ImagesType,
      args: {
        searchTerm: { type: GraphQLString },
      },
      resolve(parent, args) {
        return axios
          .get(
            `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${args.searchTerm}`
          )
          .then((response) => response.data);
        // .then(response => {
        //   // console.log(response.objectIDs);
        //   response.objectIDs.map(objectID => {
        //     // console.log('hi');
        //     return axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
        //       .then(objResponse => objResponse.data);
        //   });
        // });

        // .then(objResponse => {
        //   // console.log(objResponse);
        //   // const image = new ImageType
        //   // images.push(objResponse);
        //   // const obj = new ImageType;
        //   // images.push(obj);
        //   return objResponse;
        // });
        // });
        // // console.log(images);
        // console.log(finalResponse);
        // return response;
        // }));
      },
    },
    Image: {
      type: ImageType,
      args: {
        objectID: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return axios
          .get(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${args.objectID}`
          )
          .then((response) => response.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
