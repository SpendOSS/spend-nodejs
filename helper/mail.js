require("dotenv").config();
var nodemailer = require("nodemailer");
const { generateOTP } = require("./otpGenerator");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendMail = (toMail, otp, message) => {
  let mailOptions = {
    from: process.env.MAIL_ID,
    to: toMail,
    subject: "SPEND OTP to Login/SignUp",
    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Static Template</title>
    
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style="
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: #ffffff;
          font-size: 14px;
        "
      >
        <div
          style="
            max-width: 680px;
            margin: 0 auto;
            padding: 45px 30px 60px;
            background: linear-gradient(180deg, #2A880A -84.63%, #1B1D1A 116.26%);
            background-repeat: no-repeat;
            background-size: 800px 452px;
            background-position: top center;
            font-size: 14px;
            color: #434343;
          "
        >
          <header>
            <table style="width: 100%;">
              <tbody>
                <tr style="height: 0; text-align: center">
                  <td>
                    <img
                      alt=""
                      src="https://firebasestorage.googleapis.com/v0/b/spendui.appspot.com/o/Spend..png?alt=media&token=9363a365-cb04-4b1d-9506-a01809fe396e"
                      height="40px"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </header>
    
          <main>
            <div
              style="
                margin: 0;
                margin-top: 70px;
                padding: 92px 30px 115px;
                background: #ffffff;
                border-radius: 30px;
                border: 2px solid #2a880a;
                text-align: center;
              "
            >
              <div style="width: 100%; max-width: 489px; margin: 0 auto;">
                <h1
                  style="
                    margin: 0;
                    font-size: 24px;
                    font-weight: 500;
                    color: #1f1f1f;
                  "
                >
                  Your OTP
                </h1>
                <p
                  style="
                    margin: 0;
                    margin-top: 17px;
                    font-size: 16px;
                    font-weight: 500;
                  "
                >
                  Hey,
                </p>
                <p
                  style="
                    margin: 0;
                    margin-top: 17px;
                    font-weight: 500;
                    letter-spacing: 0.56px;
                  "
                >
                  Thank you for choosing Spend. Use the following OTP to complete the ${message}. OTP is valid for
                  <span style="font-weight: 600; color: #1f1f1f;">5 minutes</span>.
                  Do not share this code with others, including Spend
                  employees.
                </p>
                <p
                  style="
                    margin: 0;
                    margin-top: 60px;
                    font-size: 30px;
                    font-weight: 600;
                    letter-spacing: 15px;
                    color: #2A880A;
                  "
                >
                  ${otp}
                </p>
              </div>
            </div>
    
            <p
              style="
                max-width: 400px;
                margin: 0 auto;
                margin-top: 90px;
                text-align: center;
                font-weight: 500;
                color: #8c8c8c;
              "
            >
              Need help? Ask at
              <a
                href="mailto:archisketch@gmail.com"
                style="color: #499fb6; text-decoration: none;"
                >spendsupport@gmail.com</a
              >
             
            </p>
          </main>
    
          <footer
            style="
              width: 100%;
              max-width: 490px;
              margin: 20px auto 0;
              text-align: center;
              border-top: 1px solid #e6ebf1;
            "
          >
            <p
              style="
                margin: 0;
                margin-top: 40px;
                font-size: 16px;
                font-weight: 600;
                color: #434343;
              "
            >
              Spend.
            </p>
            <p style="margin: 0; margin-top: 8px; color: #434343;">
              Address 540, City, State.
            </p>
        
            <p style="margin: 0; margin-top: 16px; color: #434343;">
              Copyright © 2022 Company. All rights reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendMail };


