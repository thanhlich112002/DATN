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

  async sendPasswordReset(user, token) {
    try {
      const transport = await this.newTransport();

      const mailOptions = {
        from: "Luxury Ferfumes nước hoa cao cấp <nguyenthanhlich112002@gmail.com>",
        to: user.email,
        subject: "Đặt lại mật khẩu",
        html: `
          <p>Xin chào ${user.firstName},</p>
          <p>Mã của bạn là  ${token},</p>
          <p>Bạn vừa yêu cầu đặt lại mật khẩu. Vui lòng làm theo các bước để hoàn tất quá trình.</p>
          <p>Nếu bạn không yêu cầu thay đổi mật khẩu, vui lòng bỏ qua email này.</p>
        `,
      };

      await transport.sendMail(mailOptions);
      console.log("Đã gửi email đặt lại mật khẩu thành công.");
    } catch (error) {
      console.error("Lỗi khi gửi email đặt lại mật khẩu:", error.message);
    }
  }

  async sendOrderCancel(order, subject) {
    try {
      const transport = await this.newTransport();
      let productsHTML = "";
      order.cart.forEach((item) => {
        productsHTML += `
<div style="display: flex; gap:20px; align-items: center; justify-content: center; margin-bottom: 20px; border: 1px solid #ccc; padding: 10px; border-radius: 5px; max-width: 600px; margin: 0 auto;">
    <img src="${item.product.images[0]}" alt="Hình ảnh sản phẩm" style="width: 100px; height: 100px; object-fit: cover; border-radius: 5px;">
    <div style="flex: 1;">
      <h3 style="margin: 0; font-size: 18px; color: #333;">Tên sản phẩm: ${item.product.name}</h3>
      <p style="margin: 5px 0; font-size: 14px; color: #666;">Số lượng: ${item.quantity}</p>
    </div>
  </div>
        `;
      });
      const mailOptions = {
        from: "Luxury Ferfumes nước hoa cao cấp <nguyenthanhlich112002@gmail.com>",
        to: order.user.email,
        subject: subject,
        html: `
          <h3>Xin chào ${order.user.firstName},</3>
          <h3>Cảm ơn bạn đã đặt hàng tại Luxury Ferfumes</h3>
          <h3>Chi tiết đơn hàng của bạn:</h3>
          <h4>ID: ${order._id}<h4>
          <h4>Giá trị đơn hàng: ${order.totalPrice}<h4>
          <h4>Phí vận chuyển: ${order.shipCost}<h4>
          <h4>Tình trạng: ${order.status}<h4>
          <div class="product-table">
              ${productsHTML}
          </div>
        `,
      };

      await transport.sendMail(mailOptions);
      console.log("Đã gửi email xác nhận đơn hàng thành công.");
    } catch (error) {
      console.error("Lỗi khi gửi email xác nhận đơn hàng:", error.message);
    }
  }
};
