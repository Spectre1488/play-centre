// Серверная функция Vercel: принимает заявку и отправляет её в Telegram.
// Токен и chat_id берутся из переменных окружения.
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  const { text } = req.body || {};
  if (!text || typeof text !== 'string' || text.length > 2000) {
    return res.status(400).json({ ok: false });
  }
  const r = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text }),
    }
  );
  return res.status(r.ok ? 200 : 502).json({ ok: r.ok });
};
