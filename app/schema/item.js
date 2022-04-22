const { object, string, date } = require('joi');

const createItemModel = object({
  PK: string().required(),
  SK: string().required(),
  id: string().guid().required(),
  name: string().alphanum().min(1).max(30),
  createdAt: date().iso(),
  updatedAt: date().iso()
});

const updateItemModel = object({
  id: string().guid().required(),
  name: string().alphanum().min(1).max(30),
  updatedAt: date().iso()
});

const deleteItemModel = object({
  id: string().guid().required()
});

module.exports = { 
  createItemModel,
  updateItemModel,
  deleteItemModel
}