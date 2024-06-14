const nodemailer = require("nodemailer");
const ejs = require("ejs");
const logger = require("@base/logger");
const config = require("@config");
const { host, port, userName, password, toAddress } = config.mail;

const sendEmail = async (options, to = toAddress) => {
  return new Promise(async (resolve, reject) => {
    const { data, subject, file_name } = options;
    ejs.renderFile(
      `${__dirname}/../views/emails/${file_name}.ejs`,
      { data },
      async (err, html) => {
        if (err) return logger.warn(`Email send error:`, err);

        const transporter = nodemailer.createTransport({
          host,
          port,
          auth: {
            user: userName,
            pass: password,
          },
        });

        transporter.sendMail(
          {
            to,
            subject,
            html,
          },
          (error, info) => {
            if (error) resolve(error);
            else resolve(info);
          }
        );
      }
    );
  });
};

module.exports = sendEmail;
