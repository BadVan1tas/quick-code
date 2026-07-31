const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

async function generateCustomQR() {
  const upiString = "upi://pay?pa=9992145372@mbkns&pn=QuickCode%20Agency&cu=INR";
  const outputPath = path.join(__dirname, '../public/upi-qr-custom.png');

  await QRCode.toFile(outputPath, upiString, {
    errorCorrectionLevel: 'H',
    type: 'png',
    margin: 2,
    color: {
      dark: '#000000',
      light: '#ffffff'
    },
    width: 600
  });

  console.log("Generated custom QR code at:", outputPath);
}

generateCustomQR().catch(console.error);
