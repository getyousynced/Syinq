import { createTransport, SendMailOptions } from "nodemailer";
import path from "path";

export const sendEmail = async (
  to: string,
  activationCode: string | undefined,
  subject: string,
  template: string,
  userName: string
) => {
  let transporter = createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "getyousync@gmail.com",
      pass: "wfud kthn eeza khdr",
    },
  });

  try {
    // Dynamic import to handle ES module compatibility
    const hbsModule = await import("nodemailer-express-handlebars");
    const hbs = hbsModule.default; // Extract default export

    const expressHandlebarsModule = await import("express-handlebars");
    const { create } = expressHandlebarsModule;

    // Create an ExpressHandlebars instance
    const hbsInstance = create({
      extname: ".handlebars",
      partialsDir: path.resolve("./views"),
      layoutsDir: path.resolve("./views"),
      defaultLayout: false,
    });

    // Configure Handlebars for Nodemailer
    const handlebarsOptions = {
      viewEngine: hbsInstance, // Pass the correct instance
      viewPath: path.resolve("./views"),
      extName: ".handlebars",
    };

    // Attach Handlebars plugin dynamically
    transporter.use("compile", hbs(handlebarsOptions));

    // Mail options
    const mailOptions: SendMailOptions & { template: string; context: any } = {
      from: "getyousync@gmail.com",
      to,
      subject,
      template,
      context: {
        activationCode,
        userName,
      },
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
