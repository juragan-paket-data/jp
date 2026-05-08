export default async function handler(req, res) {
  const api_key = process.env.DEV_API_KEY; // Ambil dari Vercel
  
  try {
    const response = await fetch('https://zeinstore.id/api/v1/prepaid/services', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        api_key: api_key,
        action: 'services' // Perintah untuk mengambil daftar produk
      })
    });

    const data = await response.json();

    // Zeinstore biasanya mengembalikan data dalam format { status: true, data: [...] }
    if (data.status) {
      res.status(200).json(data.data);
    } else {
      res.status(400).json({ message: data.message || 'Gagal mengambil data' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Koneksi ke Zeinstore gagal' });
  }
}
