import mongoose from "mongoose";

const subscriberSchema =
  mongoose.models.Subscriber?.schema ||
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

export default mongoose.models.Subscriber ||
  mongoose.model(
    "Subscriber",
    subscriberSchema
  );