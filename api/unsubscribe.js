import { connectDB } from "./lib/mongodb.js";
import Subscriber from "./models/Subscriber.js";

export default async function handler(
  req,
  res
) {
  const { email } = req.query;

  try {
    await connectDB();

    await Subscriber.deleteOne({
      email,
    });

    return res.send(`
      <!DOCTYPE html>
      <html>
      <head>
      <title>Unsubscribed</title>
      </head>

      <body style="
        background:#F5F0E8;
        display:flex;
        justify-content:center;
        align-items:center;
        height:100vh;
        font-family:Arial,sans-serif;
      ">

        <div style="
          background:white;
          padding:40px;
          border-radius:16px;
          text-align:center;
          max-width:500px;
        ">
          <h1 style="color:#4C3A2E;">
            You're unsubscribed 🦆
          </h1>

          <p style="color:#4C3A2E;">
            You won't receive any more duck emails.
          </p>

          <a
            href="https://cozyduckstudio.shop"
            style="
              display:inline-block;
              margin-top:20px;
              background:#4C3A2E;
              color:white;
              padding:12px 24px;
              border-radius:999px;
              text-decoration:none;
            "
          >
            Return to Cozy Duck Studio
          </a>
        </div>

      </body>
      </html>
    `);
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .send("Something went wrong");
  }
}