exports.signUpSchema = {
  type: "object",
  properties: {
    username: {
      type: 'string',
      minLength: 1,
      maxLength: 20,
      pattern: '^[a-zA-Z ]+$',
    },
    email: {
      type: "string",
      format: "email"
    },
    password: {
      type: 'string',
      format: 'password',
      minLength: 8,
      maxLength: 20,
    },
  },
  required: ["username", "email", "password"],
  additionalProperties: false
};

exports.loginSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email"
    },
    password: {
      type: 'string',
      format: 'password',
      minLength: 8,
      maxLength: 20,
    },
  },
  required: ["email", "password"],
  additionalProperties: false
};

const commonRecipeSchema = {
    title: {
      type: "string",
      minLength: 1,
      maxLength: 20,
      description: "The title of the recipe."
    },
    ingredients: {
      type: "array",
      minItems: 1,
      maxItems: 10,
      items: {
        type: "string",
        minLength: 2,
        maxLength: 20,
      },
      description: "A list of ingredients for the recipe."
    },
    instructions: {
      type: "string",
      maxLength: 750,
      description: "The instructions for preparing the recipe."
    },
    cookingTime: {
      type: 'number',
      minimum: 2,
      maximum: 500,
      description: "The estimated cooking time in minutes for the recipe."
    },
    imageUrl: {
      type: "string",
      format: "uri",
      description: "An optional URL to an image of the recipe."
    }
  }

exports.createRecipeSchema = {
  type: "object",
  properties: commonRecipeSchema,
  required: [
    "title",
    "ingredients",
    "instructions",
    "cookingTime"
  ],
  additionalProperties: false
};

exports.createUpdateSchema = {
  type: "object",
  properties: commonRecipeSchema,
  additionalProperties: false
};