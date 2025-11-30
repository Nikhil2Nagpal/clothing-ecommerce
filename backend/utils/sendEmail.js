const nodemailer = require('nodemailer');

const sendOrderEmail = async (order, user) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Order Confirmation - #${order._id}`,
      html: `
        <h1>Thank you for your order!</h1>
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>
        <h3>Items:</h3>
        <ul>
          ${order.items.map(item => `
            <li>${item.name} (${item.size}) x${item.qty} - $${item.price * item.qty}</li>
          `).join('')}
        </ul>
        <h2>Total: $${order.totalPrice}</h2>
        <p>Thank you for shopping with us!</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    throw error;
  }
};

module.exports = sendOrderEmail;