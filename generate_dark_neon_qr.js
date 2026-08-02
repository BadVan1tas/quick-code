const QRCode = require('qrcode');
const path = require('path');

async function generateDarkNeonQR() {
  const upiString = "upi://pay?pa=9992145372@mbkns&pn=QuikCode%20Agency&cu=INR";
  const outputPath = path.join(__dirname, 'public/upi-qr-dark-neon.png');

  // Generate QR Code with Dark Indigo/Neon Styling
  await QRCode.toFile(outputPath, upiString, {
    errorCorrectionLevel: 'H',
    type: 'png',
    margin: 2,
    color: {
      dark: '#818cf8',  // Glowing Neon Indigo modules
      light: '#0b1123'  // Dark background matching QuikCode theme
    },
    width: 600
  });

  console.log("Generated Dark Neon QR code at:", outputPath);
}

generateDarkNeonQR().catch(console.error);
