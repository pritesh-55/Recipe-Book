const seatClassSchema = {
  type: "object",
  properties: {
    classType: {
      type: "string",
      enum: ["economy", "business", "first"]
    },
    price: {
      type: "number",
      minimum: 0
    },
    seatsTotal: {
      type: "integer",
      minimum: 0
    },
  },
  required: ["classType", "price", "seatsTotal"],
  additionalProperties: false
};

exports.addFlightSchema = {
  type: "object",
  properties: {
    from: {
      type: "string"
    },
    to: {
      type: "string"
    },
    departure: {
      type: "string",
      format: "date-time"
    },
    arrival: {
      type: "string",
      format: "date-time"
    },
    flightNumber: {
      type: "string"
    },
    status: {
      type: "string",
      enum: ["ontime", "delayed", "cancelled"]
    },
    seatClasses: {
      type: "array",
      items: seatClassSchema
    },
  },
  required: ["from", "to", "departure", "arrival", "flightNumber", "seatClasses"],
  additionalProperties: false
};

exports.searchFlightsSchema = {
  type: "object",
  properties: {
    from: {
      type: "string"
    },
    to: {
      type: "string"
    },
    date: {
      type: "string",
      format: "date-time"
    },
    minPrice: {
      type: "string",
      format: "digits"
    },
    maxPrice: {
      type: "string",
      format: "digits"
    },
    sort: {
      type: "string",
      enum: ["asc", "desc"]
    },
    page: {
      type: "string",
      pattern: "^[0-9]+$"
    },
    limit: {
      type: "string",
      pattern: "^[0-9]+$"
    },
  },
  additionalProperties: false
};

exports.fareUpdateBodySchema = {
  type: "object",
  properties: {
    classType: {
      type: "string",
      enum: ["economy", "business", "first"]
    },
    newPrice: {
      type: "number",
      minimum: 0
    },
  },
  required: ["classType", "newPrice"],
  additionalProperties: false
};

exports.fareUpdateParamsSchema = {
  type: "object",
  properties: {
    flightId: {
      type: 'string',
      pattern: '^[0-9a-fA-F]{24}$',
      required: true,
    },
  },
  additionalProperties: false
};