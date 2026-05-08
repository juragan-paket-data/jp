export default async function handler(req, res) {
  const api_key = process.env.DEV_API_KEY;
  // Jika Zeinstore minta ID Member/ID Buyer, pastikan DEV_USERNAME di Vercel sudah diisi ID tersebut
  const api_id = process.env.DEV_USERNAME; 

  try {
    const response = await fetch('https://zeinstore.id/api/v1/prepaid/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: api_key,       // Beberapa supplier pakai 'key' bukan 'api_key'
        sign: api_id,      // Beberapa supplier minta ID di kolom sign
        action: 'services'
      })
    });

    const data = await response.json();
    
    // Kirim hasilnya ke layar untuk kita intip masalahnya
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Koneksi ke server Zeinstore terputus" });
  }
}
