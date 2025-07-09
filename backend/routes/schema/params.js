exports.idParamsSchema = {
  type: 'object',
  properties: {
    userId: {
      type: 'string',
      pattern: '^[0-9a-fA-F]{24}$',
      required: true,
    },
  },
  additionalProperties: false,
};

exports.createBookingSchema = {
  type: "object",
  properties: {
    flightId: {
      type: 'string',
      pattern: '^[0-9a-fA-F]{24}$',
    },
    seatClass: {
      type: "string",
      enum: ["economy", "business", "first"]
    },
    seats: {
      type: 'number',
      minimum: 1,
    },
  },
  required: ["flightId", "seatClass", "seats"],
  additionalProperties: false
};

exports.cancelBookingSchema = {
  type: "object",
  properties: {
    bookingId: {
      type: 'string',
      pattern: '^[0-9a-fA-F]{24}$',
    },
    userId: {
      type: 'string',
      pattern: '^[0-9a-fA-F]{24}$',
    },
  },
  required: ["bookingId", "userId"],
  additionalProperties: false
};