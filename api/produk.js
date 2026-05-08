export default async function handler(req, res) {
  // Ambil API Key dari Environment Variable Vercel Anda
  const api_key = process.env.DEV_API_KEY; 

  try {
    const response = await fetch('https://api.griyaflazz.xyz/service/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': api_key // Ini yang paling penting sesuai foto dokumentasi
      },
      body: JSON.stringify({
        status: "active", // Hanya mengambil produk yang aktif
        limit: "200",
        page: "1"
      })
    });

    const data = await response.json();
    
    // Griya Flazz mengembalikan data dalam format { success: true, data: [...] }
    if (data.success) {
      res.status(200).json(data.data);
    } else {
      res.status(400).json({ message: data.message || 'Gagal mengambil data' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Koneksi ke Griya Flazz bermasalah' });
  }
}
