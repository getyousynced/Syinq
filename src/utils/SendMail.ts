import { createTransport, SendMailOptions } from "nodemailer";
import path from "path";

export const sendEmail = async (
  to: string,
  activationCode: number,
  subject: string,
  template: string
) => {
  try {
    let transporter = createTransport({
      host: "smtpout.secureserver.net", // Changed to recommended host
      port: 587,
      secure: false, // CRITICAL: false for port 587
      auth: {
        user: "support@syinq.com",
        pass: "6Ds$5An%@syinq", // Use EMAIL account password, not GoDaddy login
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false // Add this if certificate issues persist
      }
    });

    const hbsModule = await import("nodemailer-express-handlebars");
    const hbs = hbsModule.default;

    const expressHandlebarsModule = await import("express-handlebars");
    const { create } = expressHandlebarsModule;

    const hbsInstance = create({
      extname: ".handlebars",
      partialsDir: path.resolve("./src/views"),
      layoutsDir: path.resolve("./src/views"),
      defaultLayout: false,
    });

    const handlebarsOptions = {
      viewEngine: hbsInstance,
      viewPath: path.resolve("./src/views"),
      extName: ".handlebars",
    };

    transporter.use("compile", hbs(handlebarsOptions));

    const mailOptions: SendMailOptions & { template: string; context: any } = {
      from: "support@syinq.com",
      to,
      subject,
      template,
      context: {
        activationCode,
      },
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Email sending error details:", error);
    throw error; // Re-throw to see actual error
  }
};
