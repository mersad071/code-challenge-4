import { API, graphqlOperation } from "aws-amplify";
import { listItems, getItem } from '../graphql/queries';
import { createItem, deleteItem, updateItem } from '../graphql/mutations';

const list = async (limit, nextToken) => {
  const result = (await API.graphql(
    graphqlOperation(listItems, { input: { limit, nextToken } })
  ))
  return result;
}

const get = async (id) => {
  const result = (await API.graphql(
    graphqlOperation(getItem, { input: { id } })
  ))
  return result;
}

const add = async (item) => {
  console.log(item);
  const result = (await API.graphql(
    graphqlOperation(createItem, { input: item })
  ));
  return result;
}

const update = async (item) => {
  const result = (await API.graphql(
    graphqlOperation(updateItem, { input: item })
  ));
  return result;
}

const remove = async (id) => {
  const result = (await API.graphql(
    graphqlOperation(deleteItem, { input: { id } })
  ));
  return result;
}

export {
  list,
  get,
  add,
  update,
  remove
}