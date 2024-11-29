import { createTransport, SendMailOptions } from "nodemailer";
import hbs, {
  NodemailerExpressHandlebarsOptions,
  TemplateOptions,
} from "nodemailer-express-handlebars";
import path from "path";

export const sendEmail = async (
  to?: string,
  activationCode?: string,
  subject?: string,
  template?: string
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

  
  //using custom email template with node mailer
  const handlebarsOption: NodemailerExpressHandlebarsOptions = {
    viewEngine: {
      extname: ".handlebars",
      partialsDir: path.resolve("./views"),
      defaultLayout: false as unknown as string,
    },
    viewPath: path.resolve('./views'),
    extname: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarsOption));

  let message = activationCode;



  let mailOptions:SendMailOptions & TemplateOptions = {
    from: "getyousync@gmail.com",
    to: to,
    subject: subject,
    text: message,
    html: activationCode,
    template: template,
    // context: {
    //   activationCode: activationCode
    // }
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('Error sending email:', error);
  }
};