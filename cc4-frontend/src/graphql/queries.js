/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getItem = /* GraphQL */ `
  query GetItem($input: GetItemInput) {
    getItem(input: $input) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const listItems = /* GraphQL */ `
  query ListItems($input: ListItemsInput) {
    listItems(input: $input) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
