const Joi = require('joi');
const { object, string, date } = Joi.types();

const createItemModel = object.keys({
  PK: string.required(),
  SK: string.required(),
  id: string.guid().required(),
  name: string.alphanum().min(1).max(30),
  createdAt: date.iso(),
  updatedAt: date.iso()
});

const updateItemModel = object.keys({
  id: string.guid().required(),
  name: string.alphanum().min(1).max(30),
  updatedAt: date.iso()
});

const deleteItemModel = object.keys({
  id: string.guid().required()
});

module.exports = { 
  createItemModel,
  updateItemModel,
  deleteItemModel
}