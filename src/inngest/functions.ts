import { inngest } from "./client";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../sanity/env";
import { sendEmail, getEmailTemplate } from "@/lib/mail";

// Helper to get Sanity client with Write permissions
const getWriteClient = () => {
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!token) {
    throw new Error("SANITY_WRITE_TOKEN is not defined");
  }
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  });
};

export const autoReplyAfterDelay = inngest.createFunction(
  { id: "auto-reply-after-delay", triggers: [{ event: "contact.submitted" }] },
  async ({ event, step }: { event: any; step: any }) => {
    const { messageId, name, email, messageText, lang = "FR" } = event.data;

    // 1. Sleep for 2 hours
    await step.sleep("wait-for-developer-response", "2h");

    // 2. Fetch the current state from Sanity
    const client = getWriteClient();
    const doc = await step.run("fetch-message-state", async () => {
      return await client.getDocument(messageId);
    });

    if (!doc) {
      console.log(`Document ${messageId} not found in Sanity. Aborting.`);
      return { success: false, reason: "Document not found" };
    }

    // 3. Stop if developer has already replied manually
    if (doc.replied === true) {
      console.log(`Message ${messageId} already replied manually. Stopping auto-reply.`);
      return { success: true, reason: "Already replied manually" };
    }

    // 4. Generate AI professional backup reply using OpenRouter
    const polishedReply = await step.run("generate-ai-backup-reply", async () => {
      const openRouterKey = process.env.OPENROUTER_API_KEY;
      if (!openRouterKey) {
        throw new Error("OPENROUTER_API_KEY is not defined");
      }

      const prompt = `You are a professional AI assistant for Honlue Petnou Frederic Armel (Mansah), a Software Engineer & QA Automation Specialist.
The user sent a contact form message. Here are the details:
- Name: ${name}
- Email: ${email}
- Message:
"${messageText}"

The developer hasn't replied yet. Generate a polite, formal, professional auto-acknowledgement email in the language of the original message (${lang === "FR" ? "French" : "English"}).
State that I have received their message, I am interested, and I will get back to them in detail very soon. In the meantime, invite them to review my portfolio or schedule a meeting.
Sign off professionally as "Mansah".
Output ONLY the raw content of the email, no subject line, no placeholders, no markdown code ticks, just the polished paragraphs.`;

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openRouterKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "user", content: prompt }
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.statusText}`);
      }

      const resData = await response.json();
      return resData.choices?.[0]?.message?.content || "Bonjour, j'ai bien reçu votre message et je vous recontacterai rapidement. Cordialement, Mansah.";
    });

    // 5. Send email via Nodemailer
    await step.run("send-backup-email", async () => {
      const htmlContent = getEmailTemplate(polishedReply, name);
      await sendEmail({
        to: email,
        subject: lang === "FR" ? `Accusé de réception - Mansah Portfolio` : `Message Received - Mansah Portfolio`,
        html: htmlContent,
      });
    });

    // 6. Update Sanity document state to autoReplied = true
    await step.run("update-sanity-document", async () => {
      await client
        .patch(messageId)
        .set({ autoReplied: true })
        .commit();
    });

    // 7. Notify developer on Telegram that auto-reply was sent
    await step.run("send-telegram-notification", async () => {
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;
      if (!botToken || !chatId) {
        throw new Error("Telegram configuration env variables are not defined");
      }

      const telegramMsg = `🤖 *Auto-réponse IA envoyée*
À : *${name}* (${email})
Délai de 2h expiré sans réponse. L'IA a envoyé un accusé de réception professionnel en votre nom.`;

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMsg,
          parse_mode: "Markdown",
        }),
      });
    });

    return { success: true, reason: "Auto-reply sent successfully" };
  }
);
