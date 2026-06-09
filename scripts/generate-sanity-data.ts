import fs from "fs";
import path from "path";
import { experiences } from "../src/data/experience";
import { projectsData } from "../src/data/projects";
import { blogPosts } from "../src/data/blog";
import { testimonialsData } from "../src/data/testimonials";

// Helper to convert plain texts and section details to Portable Text blocks for Sanity
function createPortableText(intro: string, sections: any[], quote?: string) {
  const blocks: any[] = [];
  let keyIndex = 0;

  const nextKey = () => `block-key-${keyIndex++}`;

  // Add introduction
  if (intro) {
    blocks.push({
      _type: "block",
      _key: nextKey(),
      style: "normal",
      children: [
        {
          _type: "span",
          _key: nextKey(),
          text: intro,
        },
      ],
    });
  }

  // Add quote if present
  if (quote) {
    blocks.push({
      _type: "block",
      _key: nextKey(),
      style: "blockquote",
      children: [
        {
          _type: "span",
          _key: nextKey(),
          text: quote,
        },
      ],
    });
  }

  // Add sections
  sections.forEach((sec) => {
    if (sec.heading) {
      blocks.push({
        _type: "block",
        _key: nextKey(),
        style: "h2",
        children: [
          {
            _type: "span",
            _key: nextKey(),
            text: sec.heading,
          },
        ],
      });
    }

    if (sec.body) {
      blocks.push({
        _type: "block",
        _key: nextKey(),
        style: "normal",
        children: [
          {
            _type: "span",
            _key: nextKey(),
            text: sec.body,
          },
        ],
      });
    }

    if (sec.codeSnippet) {
      // Represent code snippets as custom codeBlock objects
      blocks.push({
        _type: "codeBlock",
        _key: nextKey(),
        code: sec.codeSnippet.code,
        language: sec.codeSnippet.language,
      });
    }
  });

  return blocks;
}

function run() {
  const documents: any[] = [];

  // 1. Experiences
  experiences.forEach((exp, idx) => {
    documents.push({
      _id: `experience-${idx + 1}`,
      _type: "experience",
      role: {
        _type: "localeString",
        FR: exp.role.FR,
        EN: exp.role.EN,
      },
      company: exp.company,
      period: {
        _type: "localeString",
        FR: exp.period.FR,
        EN: exp.period.EN,
      },
      description: {
        _type: "localeString",
        FR: exp.description.FR,
        EN: exp.description.EN,
      },
      achievements: {
        _type: "localeStringArray",
        FR: exp.achievements.FR,
        EN: exp.achievements.EN,
      },
      order: idx + 1,
    });
  });

  // 2. Projects
  projectsData.forEach((proj, idx) => {
    // Map category
    let category = "frontend";
    if (proj.category === "AI & Full Stack") category = "ai";
    else if (proj.category === "QA & Automation") category = "qa";

    // Map metrics
    const metricsMapped = (proj.metrics || []).map((m, mIdx) => ({
      _key: `metric-${mIdx}`,
      _type: "metric",
      label: {
        _type: "localeString",
        FR: m.label.FR,
        EN: m.label.EN,
      },
      value: m.value,
    }));

    documents.push({
      _id: `project-${idx + 1}`,
      _type: "project",
      title: proj.title,
      slug: {
        _type: "slug",
        current: proj.slug,
      },
      category,
      stack: proj.stack,
      description: {
        _type: "localeText",
        FR: proj.description.FR,
        EN: proj.description.EN,
      },
      challenge: proj.challenge ? {
        _type: "localeText",
        FR: proj.challenge.FR,
        EN: proj.challenge.EN,
      } : undefined,
      strategy: proj.strategy ? {
        _type: "localeText",
        FR: proj.strategy.FR,
        EN: proj.strategy.EN,
      } : undefined,
      impact: proj.impact ? {
        _type: "localeText",
        FR: proj.impact.FR,
        EN: proj.impact.EN,
      } : undefined,
      demoUrl: proj.demoUrl,
      repoUrl: proj.repoUrl,
      metrics: metricsMapped,
      order: idx + 1,
    });
  });

  // 3. Blog Posts
  blogPosts.forEach((post, idx) => {
    // Convert intro/sections/quote to localeBlock structure
    const bodyFr = createPortableText(
      post.introduction.FR,
      post.sections.map(s => ({ heading: s.heading.FR, body: s.body.FR, codeSnippet: s.codeSnippet })),
      post.quote?.FR
    );

    const bodyEn = createPortableText(
      post.introduction.EN,
      post.sections.map(s => ({ heading: s.heading.EN, body: s.body.EN, codeSnippet: s.codeSnippet })),
      post.quote?.EN
    );

    // Standardize read time (e.g. "5 min read" -> extract 5)
    let readMinutes = 5;
    const match = post.readTime.EN.match(/\d+/);
    if (match) {
      readMinutes = parseInt(match[0], 10);
    }

    // Convert "Oct 12, 2025" to date format YYYY-MM-DD
    const parseDate = (dStr: string) => {
      try {
        const d = new Date(dStr);
        if (!isNaN(d.getTime())) {
          return d.toISOString().split("T")[0];
        }
      } catch (e) {}
      return "2025-10-12";
    };

    documents.push({
      _id: `blog-post-${idx + 1}`,
      _type: "blogPost",
      title: {
        _type: "localeString",
        FR: post.title.FR,
        EN: post.title.EN,
      },
      slug: {
        _type: "slug",
        current: post.slug,
      },
      excerpt: {
        _type: "localeText",
        FR: post.excerpt.FR,
        EN: post.excerpt.EN,
      },
      body: {
        _type: "localeBlock",
        FR: bodyFr,
        EN: bodyEn,
      },
      publishDate: parseDate(post.date),
      readTime: readMinutes,
      tags: [post.category],
    });
  });

  // 4. Testimonials
  testimonialsData.forEach((test, idx) => {
    documents.push({
      _id: `testimonial-${idx + 1}`,
      _type: "testimonial",
      name: test.name,
      role: {
        _type: "localeString",
        FR: test.designation.FR,
        EN: test.designation.EN,
      },
      quote: {
        _type: "localeText",
        FR: test.quote.FR,
        EN: test.quote.EN,
      },
    });
  });

  // Write NDJSON output
  const ndjson = documents.map((doc) => JSON.stringify(doc)).join("\n");
  const outputPath = path.join(__dirname, "../sanity-data.ndjson");
  fs.writeFileSync(outputPath, ndjson, "utf-8");
  console.log(`Successfully generated ${documents.length} documents for Sanity in ${outputPath}`);
}

run();
