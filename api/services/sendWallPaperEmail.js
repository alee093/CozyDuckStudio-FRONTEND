import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export const sendWallPaperEmail = async (
  name,
  email
) => {

  await resend.emails.send({
    from: "Cozy Duck Studio <Letters@cozyduckstudio.shop>",

    to: email,

    subject: "Your duck has arrived! 🦆",

    html: `
      <!DOCTYPE html>
      <html>
      <head>
      <meta charset="UTF-8" />
      </head>

      <body style="
        margin:0;
        padding:40px 20px;
        background:#F5F0E8;
        font-family:Arial,sans-serif;
      ">

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="max-width:600px;margin:auto;"
        >
          <tr>
            <td
              style="
                background:#FFFDF9;
                border-radius:16px;
                padding:40px;
                border:1px solid #E5D9CC;
              "
            >

              <h1
                style="
                  color:#4C3A2E;
                  text-align:center;
                  font-size:36px;
                  margin-top:0;
                  margin-bottom:10px;
                "
              >
                Cozy Duck Studio
              </h1>

              <p
                style="
                  color:#4C3A2E;
                  font-size:22px;
                  text-align:center;
                  margin-bottom:30px;
                "
              >
                Hey ${name}! Congratulations ♡
              </p>

              <p
                style="
                  color:#4C3A2E;
                  font-size:16px;
                  line-height:1.8;
                "
              >
                As promised, here's your free wallpaper:
              </p>

              <div
                style="
                  text-align:center;
                  margin:35px 0;
                "
              >
                <a
                  href="https://drive.google.com/drive/folders/1S7vKQz0x8xOR4gvn5bJoDIz-9j6CJJKO"
                  style="
                    background:#4C3A2E;
                    color:white;
                    text-decoration:none;
                    padding:16px 32px;
                    border-radius:999px;
                    display:inline-block;
                    font-weight:bold;
                  "
                >
                  DOWNLOAD WALLPAPER
                </a>
              </div>

              <div
                style="
                  background:#F8F4EE;
                  padding:20px;
                  border-radius:12px;
                  margin-bottom:30px;
                "
              >
                <p>🦆 It enjoys staring dramatically into the distance.</p>

                <p>🦆 It may inspire questionable life choices.</p>

                <p>🦆 It cannot legally operate heavy machinery.</p>
              </div>

              <p
                style="
                  color:#4C3A2E;
                  line-height:1.8;
                "
              >
                I hope it brings a little extra duck energy to your day.
              </p>

              <p
                style="
                  color:#4C3A2E;
                  line-height:1.8;
                "
              >
                Since you're here, you should know that I spend an
                unreasonable amount of time creating ducks—cute ducks,
                weird ducks, punk ducks, and everything in between.
              </p>

              <p
                style="
                  color:#4C3A2E;
                  line-height:1.8;
                "
              >
                Every so often, I'll send:
              </p>

              <ul
                style="
                  color:#4C3A2E;
                  line-height:2;
                "
              >
                <li>New artwork</li>
                <li>Behind-the-scenes sketches</li>
                <li>Freebies</li>
                <li>Polls and community projects</li>
                <li>First access to new releases</li>
              </ul>

              <p
                style="
                  color:#4C3A2E;
                  line-height:1.8;
                "
              >
                No daily emails. No spam. Just ducks.
              </p>

              <p
                style="
                  color:#4C3A2E;
                  line-height:1.8;
                "
              >
                Enjoy the wallpaper, and if you end up using it,
                I'd love to see it. Just send me a screenshot
                or post it on your story ♡
              </p>

              <div
                style="
                  margin-top:40px;
                  color:#4C3A2E;
                  font-size:18px;
                "
              >
                – Lily
              </div>

              <hr
                style="
                  margin:40px 0 20px;
                  border:none;
                  border-top:1px solid #E5D9CC;
                "
              />

              <div
                style="
                  text-align:center;
                "
              >
                <a
                  href="https://cozyduckstudio.shop/api/unsubscribe?email=${encodeURIComponent(email)}"
                  style="
                    color:#8B6A55;
                    font-size:13px;
                    text-decoration:none;
                  "
                >
                  Unsubscribe
                </a>
              </div>

            </td>
          </tr>
        </table>

      </body>
      </html>
      `
  });
};