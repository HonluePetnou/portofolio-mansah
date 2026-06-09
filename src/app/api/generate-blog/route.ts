import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { topic, lang = 'FR' } = body;

    if (!topic || typeof topic !== 'string' || topic.trim() === '') {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const openRouterKey = process.env.OPENROUTER_API_KEY;
    if (!openRouterKey) {
      console.error('OPENROUTER_API_KEY environment variable is not defined.');
      return NextResponse.json(
        { error: 'AI generation is not configured on the server.' },
        { status: 500 }
      );
    }

    const systemPrompt = `You are a professional technical writer and software engineer. Generate a structured blog post in JSON format based on the topic provided. The language of the post should be ${lang === 'FR' ? 'French' : 'English'}.
The output MUST be a valid JSON object matching the following structure exactly (do not output markdown ticks or wrapper tags, just the raw JSON object):
{
  "title": "A compelling, catchy title for the blog post",
  "excerpt": "A short, engaging summary or teaser of the article (1-2 sentences)",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "readTime": 5,
  "content": "Detailed blog post content in markdown. Include clear subheadings (##, ###), bullet points, and code samples if appropriate. Write completely in ${lang === 'FR' ? 'French' : 'English'}."
}`;

    // Requesting OpenRouter
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Topic: ${topic}` },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error response:', errorText);
      return NextResponse.json(
        { error: 'Failed to generate content from OpenRouter.' },
        { status: 502 }
      );
    }

    const responseData = await response.json();
    const generatedText = responseData.choices?.[0]?.message?.content;

    if (!generatedText) {
      return NextResponse.json(
        { error: 'No content received from AI generator.' },
        { status: 502 }
      );
    }

    try {
      const parsedContent = JSON.parse(generatedText);
      return NextResponse.json({ success: true, post: parsedContent });
    } catch (parseError) {
      console.error('Failed to parse generated text as JSON:', generatedText);
      return NextResponse.json({
        success: true,
        post: {
          title: topic,
          excerpt: 'Generation completed with formatting warning.',
          tags: ['AI'],
          readTime: 5,
          content: generatedText,
        }
      });
    }
  } catch (error: any) {
    console.error('Error in /api/generate-blog route:', error);
    return NextResponse.json(
      { error: 'Failed to generate blog post.' },
      { status: 500 }
    );
  }
}
