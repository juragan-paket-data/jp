const crypto = require('crypto');

export default async function handler(req, res) {
  // Mengambil data dari variabel rahasia yang kita setting di Vercel tadi
  const username = process.env.DEV_USERNAME;
  const apiKey = process.env.DEV_API_KEY;
  
  // Membuat Signature keamanan sesuai aturan supplier (Digiflazz)
  const sign = crypto.createHash('md5').update(username + apiKey + "pricelist").digest('hex');

  try {
    const response = await fetch('https://api.digiflazz.com/v1/price-list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cmd: 'prepaid',
        username: username,
        sign: sign
      })
    });

    const data = await response.json();
    
    // Kirim data produk ke website Anda
    res.status(200).json(data.data);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data' });
  }
}
