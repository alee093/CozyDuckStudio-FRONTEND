import { connectDB } from "./lib/mongodb.js";
import Subscriber from "./models/Subscriber.js";
import { sendWallpaperEmail } from "./services/sendWallpaperEmail.js";

export default async function handler(
  req,
  res
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    let { name, email } = req.body;

    const nameRegex = /^[\p{L}\s]+$/u;

    name = name.trim();
    email = email.trim().toLowerCase();

    if (!name || !email) {
      return res.status(400).json({
        message: "Missing fields.",
      });
    }

    if (name.length < 3) {
      return res.status(400).json({
        message: "Name: Min 3 characters.",
      });
    }

    if (name.length > 50) {
      return res.status(400).json({
        message: "Name too long.",
      });
    }

    if (!nameRegex.test(name)) {
      return res.status(400).json({
        message: "Letters only.",
      });
    }

    await connectDB();

    const existingSubscriber =
      await Subscriber.findOne({
        email,
      });

    if (existingSubscriber) {
      return res.status(409).json({
        message:
          "You're already subscribed ♡",
      });
    }

    await Subscriber.create({
      name,
      email,
    });

    await sendWallpaperEmail(
      name,
      email
    );

    return res.status(201).json({
      message:
        "YAY! Duck gift has been sent ♡",
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(409).json({
        message:
          "You're already subscribed ♡",
      });
    }

    return res.status(500).json({
      message: "Server error.",
    });
  }
}