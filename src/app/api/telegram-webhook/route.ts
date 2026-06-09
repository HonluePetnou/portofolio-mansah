import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../../../sanity/env';
import { sendEmail, getEmailTemplate } from '../../../lib/mail';

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

export async function POST(request: Request) {
  try {
    const update = await request.json();
    console.log('Received Telegram Webhook Update:', JSON.stringify(update));

    const message = update.message;
    if (!message) {
      return NextResponse.json({ success: true, reason: 'No message object' });
    }

    const chatId = message.chat?.id?.toString();
    const fromId = message.from?.id?.toString();
    const myChatId = process.env.TELEGRAM_CHAT_ID;

    // Verify it is a reply and comes from the authorized developer
    if (fromId !== myChatId || chatId !== myChatId) {
      console.log('Skipping message from unauthorized user or chat:', fromId);
      return NextResponse.json({ success: true, reason: 'Unauthorized sender' });
    }

    const replyToMessage = message.reply_to_message;
    if (!replyToMessage) {
      console.log('Message is not a reply. Skipping.');
      return NextResponse.json({ success: true, reason: 'Not a reply' });
    }

    const originalText = replyToMessage.text || '';
    const emailMatch = originalText.match(/email:\s*([^\s|]+)/);
    const idMatch = originalText.match(/id:\s*([^\s|]+)/);

    if (!emailMatch || !idMatch) {
      console.log('Original message text does not contain email or document ID. Skipping.');
      return NextResponse.json({ success: true, reason: 'Metadata not found in parent message' });
    }

    const clientEmail = emailMatch[1];
    const messageId = idMatch[1];
    const developerReply = message.text || '';

    if (!developerReply.trim()) {
      return NextResponse.json({ success: true, reason: 'Empty reply text' });
    }

    const sanityClient = getWriteClient();

    // 1. Fetch message details from Sanity to get name
    const doc = await sanityClient.getDocument(messageId);
    if (!doc) {
      console.error(`Document with ID ${messageId} not found in Sanity`);
      return NextResponse.json({ error: 'Message document not found in Sanity' }, { status: 404 });
    }

    const clientName = doc.name || 'Client';
    const isFrench = originalText.toLowerCase().includes('bonjour') || doc.message?.toLowerCase().includes('bonjour') || clientEmail.includes('.fr');

    // Send typing indicator to Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    await fetch(`https://api.telegram.org/bot${botToken}/sendChatAction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, action: 'typing' }),
    });

    // 2. Call OpenRouter to polish the reply
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    let polishedEmail = developerReply;

    if (openRouterKey) {
      const prompt = `You are a professional assistant. The developer replied to a client inquiry with this brief text: "${developerReply}". 
Rewrite it into a formal, polite, professional email response in ${isFrench ? 'French' : 'English'}. 
Do not include a subject line, do not include placeholders (like [your name] or [date]), and output ONLY the polished paragraphs of the email. Sign off as Mansah.`;

      try {
        const aiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openRouterKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            messages: [{ role: 'user', content: prompt }],
          }),
        });

        if (aiResponse.ok) {
          const aiData = await aiResponse.json();
          polishedEmail = aiData.choices?.[0]?.message?.content || developerReply;
        } else {
          console.error('OpenRouter polishing request failed:', await aiResponse.text());
        }
      } catch (aiErr) {
        console.error('Failed to connect to OpenRouter for email polishing:', aiErr);
      }
    }

    // 3. Send email using Gmail SMTP via Nodemailer
    const htmlBody = getEmailTemplate(polishedEmail, clientName);
    const emailSubject = isFrench ? `Réponse à votre message - Mansah Portfolio` : `Reply to your message - Mansah Portfolio`;

    await sendEmail({
      to: clientEmail,
      subject: emailSubject,
      html: htmlBody,
    });

    // 4. Update Sanity document to replied: true
    await sanityClient
      .patch(messageId)
      .set({ replied: true })
      .commit();

    // 5. Send Telegram confirmation message
    const confirmationText = `✅ *E-mail envoyé avec succès !*
👤 À : *${clientName}* (${clientEmail})
💬 *Votre note* : "${developerReply}"
🤖 *Version polie IA envoyée* :
${polishedEmail}`;

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: confirmationText,
        parse_mode: 'Markdown',
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error in /api/telegram-webhook handler:', error);
    try {
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;
      if (botToken && chatId) {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: `❌ *Erreur de traitement du webhook* : ${error.message || error}`,
          }),
        });
      }
    } catch (ignore) {}

    return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
  }
}
