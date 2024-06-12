const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  "101226702177-ok6d8e86stk9c1g3dom21u07jitqja4m.apps.googleusercontent.com",
  "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",
  "https://developers.google.com/oauthplayground"
);
oAuth2Client.setCredentials({
  refresh_token:
    "1//04YxabYLAYDylCgYIARAAGAQSNwF-L9IrDlvULsrHj26hY_DRCmi4oPJ68--O3kgmulSgcTerSVkdiD0qrXR7m6S_dkmu2-ZrlLE",
});

module.exports = class Email {
  constructor(user, toke, d) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.from = `FALTH`;
  }

  async newTransport() {
    const accessToken = await oAuth2Client.getAccessToken();
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "nguyenthanhlich112002@gmail.com",
        clientId:
          "101226702177-ok6d8e86stk9c1g3dom21u07jitqja4m.apps.googleusercontent.com",
        clientSecret: "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",
        refreshToken:
          "1//04YxabYLAYDylCgYIARAAGAQSNwF-L9IrDlvULsrHj26hY_DRCmi4oPJ68--O3kgmulSgcTerSVkdiD0qrXR7m6S_dkmu2-ZrlLE",
        accessToken: accessToken,
      },
    });
  }

  // Send the actual email

  async send(template, subject) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: `${this.token}`,
    };
    const transport = await this.newTransport();
    await transport.sendMail(mailOptions);
  }

  //   async sendWelcome() {
  //     await this.send("verifySignUp", "Welcome to FALTH!");
  //   }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for only 10 minutes)"
    );
  }
  //   async sendAcceptEmail() {
  //     await this.send("acceptedEmail", "Email xác nhận đăng ký");
  //   }
  //   async sendRefuseEmail() {
  //     await this.send("refuseEmail", "Email xác nhận đăng ký");
  //   }
};
