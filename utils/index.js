const Joi = require('joi')

const isValidBook = book => {
  /* Create schema */
  const schema = Joi.object({
    author: Joi.string().min(3).max(512).required(),
    title: Joi.string().min(3).max(512).required(),
    inStock: Joi.boolean().required(),
    section: Joi.string()
      .valid('computer', 'self-development', 'fictions')
      .required(),
    addedOnDate: Joi.date(),
    qty: Joi.number(),
    coverPhoto: Joi.string()
  })

  const { error, value } = schema.validate(book)

  return { error, value }
}

const validateBookPatch = book => {
  /* Update schema */
  const schema = Joi.object({
    author: Joi.string().min(3).max(512),
    title: Joi.string().min(3).max(512),
    inStock: Joi.boolean(),
    section: Joi.string().valid('computer', 'self-development', 'fictions'),
    addedOnDate: Joi.date(),
    qty: Joi.number(),
    coverPhoto: Joi.string()
  })
  const { error, value } = schema.validate(book)
  return { error, value }
}

module.exports = {
  isValidBook,
  validateBookPatch
}