import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../../../sanity/env';
import { inngest } from '../../../inngest/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, lang = 'FR' } = body;

    // Simple validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const token = process.env.SANITY_WRITE_TOKEN;
    if (!token) {
      console.error('SANITY_WRITE_TOKEN environment variable is not defined.');
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    // 1. Create client and save to Sanity
    const sanityClient = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token,
    });

    const doc = await sanityClient.create({
      _type: 'contactMessage',
      name,
      email,
      message,
      replied: false,
      autoReplied: false,
      timestamp: new Date().toISOString(),
    });

    // 2. Trigger Inngest Event for 2h delayed auto-reply
    try {
      await inngest.send({
        name: 'contact.submitted',
        data: {
          messageId: doc._id,
          name,
          email,
          messageText: message,
          lang,
        },
      });
    } catch (inngestErr) {
      console.error('Failed to trigger Inngest background event:', inngestErr);
      // Don't fail the request if Inngest fails, keep going to notify Telegram
    }

    // 3. Send direct notification to Telegram Bot
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const telegramText = `✉️ *Nouveau message de contact !*

👤 *Nom* : ${name}
📧 *Email* : ${email}
💬 *Message* :
${message}

---
*Répondez à ce message pour écrire au client.*
_email: ${email} | id: ${doc._id}_`;

      try {
        const telResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: telegramText,
            parse_mode: 'Markdown',
          }),
        });
        if (!telResponse.ok) {
          console.error('Telegram notification API responded with error:', await telResponse.text());
        }
      } catch (telErr) {
        console.error('Failed to send Telegram notification:', telErr);
      }
    } else {
      console.warn('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env variables are not defined. Telegram notification skipped.');
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error in /api/contact route handler:', error);
    return NextResponse.json(
      { error: 'Failed to process contact message.' },
      { status: 500 }
    );
  }
}
