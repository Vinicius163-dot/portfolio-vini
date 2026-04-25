import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, message } = req.body ?? {};

  if (!name?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "RESEND_API_KEY not configured" });
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "vinicius.possato@alest.com.br",
      subject: `Portfolio — mensagem de ${name.trim()}`,
      text: `Nome: ${name.trim()}\n\nMensagem:\n${message.trim()}`,
      html: `<p><strong>Nome:</strong> ${name.trim()}</p><p><strong>Mensagem:</strong></p><p>${message.trim().replace(/\n/g, "<br>")}</p>`,
    });

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ error: "Failed to send email" });
  }
}
