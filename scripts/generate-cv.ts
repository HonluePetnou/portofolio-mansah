import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { experiences, educationList, awardsList, languagesList, skillsGrouped } from "../src/data/experience";
import { projectsData } from "../src/data/projects";

// Ensure public directory exists
const publicDir = path.join(__dirname, "../public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Colors matching the portfolio website
const COLORS = {
  primary: "#5E50F9",      // Royal Violet
  sidebarBg: "#F4F3FF",    // Elegant Lavender-tinted off-white
  textDark: "#0F172A",     // Slate 900
  textMuted: "#475569",    // Slate 600
  textLight: "#FFFFFF",    // White
  divider: "#E2E8F0",      // Slate 200
};

// Page Dimensions
const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;

function generateCV(lang: "EN" | "FR", outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
    });

    const writeStream = fs.createWriteStream(outputPath);
    doc.pipe(writeStream);

    // Draw Sidebar Background (Left Column)
    const SIDEBAR_WIDTH = 190;
    doc.rect(0, 0, SIDEBAR_WIDTH, PAGE_HEIGHT).fill(COLORS.sidebarBg);

    // ==========================================
    // LEFT COLUMN (SIDEBAR) - Starts at X: 20
    // ==========================================
    let leftY = 40;
    const LEFT_X = 20;
    const LEFT_WIDTH = SIDEBAR_WIDTH - 40; // 150 pt width

    // Contact Info
    doc.fillColor(COLORS.primary)
       .font("Helvetica-Bold")
       .fontSize(10)
       .text("CONTACT", LEFT_X, leftY);
    leftY += 15;

    const contactDetails = [
      { label: { EN: "Email", FR: "Email" }, val: "fredericarmel.mansah@gmail.com" },
      { label: { EN: "Phone", FR: "Téléphone" }, val: "+228 90 00 00 00" },
      { label: { EN: "GitHub", FR: "GitHub" }, val: "github.com/HonluePetnou" },
      { label: { EN: "LinkedIn", FR: "LinkedIn" }, val: "linkedin.com/in/frederic-armel-mansah" },
      { label: { EN: "Portfolio", FR: "Portfolio" }, val: "mansah-portfolio.vercel.app" },
    ];

    contactDetails.forEach((c) => {
      doc.font("Helvetica-Bold").fontSize(7.5).fillColor(COLORS.textDark).text(c.label[lang], LEFT_X, leftY);
      leftY += 9;
      doc.font("Helvetica").fontSize(7).fillColor(COLORS.textMuted).text(c.val, LEFT_X, leftY, { width: LEFT_WIDTH });
      leftY += 13;
    });

    leftY += 8;

    // Compétences Techniques (skillsGrouped)
    const skillsHeader = lang === "FR" ? "COMPÉTENCES" : "TECHNICAL SKILLS";
    doc.fillColor(COLORS.primary)
       .font("Helvetica-Bold")
       .fontSize(10)
       .text(skillsHeader, LEFT_X, leftY);
    leftY += 15;

    skillsGrouped.forEach((g) => {
      const categoryText = g.category[lang];
      const listText = g.skills[lang].join(", ");
      doc.font("Helvetica-Bold").fontSize(7.5).fillColor(COLORS.textDark).text(`${categoryText}: `, LEFT_X, leftY, { continued: true, width: LEFT_WIDTH });
      doc.font("Helvetica").fontSize(7).fillColor(COLORS.textMuted).text(listText, { width: LEFT_WIDTH, lineGap: 1.5 });
      const textHeight = doc.heightOfString(`${categoryText}: ${listText}`, { width: LEFT_WIDTH, lineGap: 1.5 });
      leftY += textHeight + 4;
    });

    leftY += 8;

    // Formation (educationList)
    const educationHeader = lang === "FR" ? "FORMATION" : "EDUCATION";
    doc.fillColor(COLORS.primary)
       .font("Helvetica-Bold")
       .fontSize(10)
       .text(educationHeader, LEFT_X, leftY);
    leftY += 15;

    educationList.forEach((e) => {
      doc.font("Helvetica-Bold").fontSize(7.5).fillColor(COLORS.textDark).text(e.school, LEFT_X, leftY);
      leftY += 10;
      const degreeText = `${e.degree[lang]} - ${e.field[lang]}`;
      doc.font("Helvetica").fontSize(7).fillColor(COLORS.textMuted).text(degreeText, LEFT_X, leftY, { width: LEFT_WIDTH });
      leftY += doc.heightOfString(degreeText, { width: LEFT_WIDTH }) + 2;
      doc.font("Helvetica-Oblique").fontSize(6.5).fillColor(COLORS.textMuted).text(e.period[lang], LEFT_X, leftY);
      leftY += 12;
    });

    leftY += 8;

    // Langues (languagesList)
    const languagesHeader = lang === "FR" ? "LANGUES" : "LANGUAGES";
    doc.fillColor(COLORS.primary)
       .font("Helvetica-Bold")
       .fontSize(10)
       .text(languagesHeader, LEFT_X, leftY);
    leftY += 15;

    languagesList.forEach((l) => {
      const nameText = l.name[lang];
      const levelText = l.level[lang];
      doc.font("Helvetica-Bold").fontSize(7.5).fillColor(COLORS.textDark).text(`${nameText} : `, LEFT_X, leftY, { continued: true, width: LEFT_WIDTH });
      doc.font("Helvetica").fontSize(7).fillColor(COLORS.textMuted).text(levelText, { width: LEFT_WIDTH });
      leftY += 11;
    });

    // ==========================================
    // RIGHT COLUMN (MAIN) - Absolute Positioning
    // ==========================================
    let rightY = 40;
    const RIGHT_X = 215;
    const RIGHT_WIDTH = PAGE_WIDTH - RIGHT_X - 30; // 350 pt width

    // Header: Name (17pt fits perfectly on one line without wrapping)
    const nameText = "PETNOU HONLUE FREDERIC ARMEL";
    doc.fillColor(COLORS.primary)
       .font("Helvetica-Bold")
       .fontSize(17)
       .text(nameText, RIGHT_X, rightY, { width: RIGHT_WIDTH });
    rightY += 22;

    // Tagline
    const taglineText = lang === "FR" 
      ? "Ingénieur Frontend Senior · Spécialiste QA · Product Builder" 
      : "Senior Frontend Engineer · QA Specialist · Product Builder";
    doc.fillColor(COLORS.textDark)
       .font("Helvetica-Bold")
       .fontSize(9.5)
       .text(taglineText, RIGHT_X, rightY, { width: RIGHT_WIDTH });
    rightY += 18;

    // PROFIL Section (3-4 lines max)
    const profileText = lang === "FR"
      ? "Ingénieur logiciel orienté produit, spécialisé dans la conception d'architectures frontend performantes et de frameworks d'automatisation de tests robustes. Expert dans la livraison d'applications web réactives avec des structures React modulaires et du QA préventif pour assurer la fiabilité."
      : "Product-oriented software engineer specializing in high-performance frontend architectures and robust test automation frameworks. Expert in delivering responsive web applications with modular React structures and preventive QA to ensure reliability.";

    doc.fillColor(COLORS.textMuted)
       .font("Helvetica")
       .fontSize(8)
       .text(profileText, RIGHT_X, rightY, { width: RIGHT_WIDTH, align: "justify", lineGap: 2.5 });

    const profileHeight = doc.heightOfString(profileText, { width: RIGHT_WIDTH, lineGap: 2.5 });
    rightY += profileHeight + 25;

    // Section Draw Helpers to keep rightY updated cleanly
    const drawAbsoluteSectionHeader = (title: string) => {
      doc.rect(RIGHT_X, rightY, 3, 11).fill(COLORS.primary);
      doc.fillColor(COLORS.primary)
         .font("Helvetica-Bold")
         .fontSize(10.5)
         .text(title, RIGHT_X + 8, rightY);
      rightY += 15;
      
      // Separator Line
      doc.moveTo(RIGHT_X, rightY).lineTo(RIGHT_X + RIGHT_WIDTH, rightY).strokeColor(COLORS.divider).lineWidth(0.5).stroke();
      rightY += 12;
    };

    // Section: Professional Experience
    const expHeader = lang === "FR" ? "EXPÉRIENCE PROFESSIONNELLE" : "PROFESSIONAL EXPERIENCE";
    drawAbsoluteSectionHeader(expHeader);

    experiences.forEach((exp) => {
      const itemY = rightY;
      
      // Role (Title)
      doc.font("Helvetica-Bold").fontSize(9.5).fillColor(COLORS.textDark).text(exp.role[lang], RIGHT_X, itemY, { width: RIGHT_WIDTH - 90 });
      
      // Period aligned to the right (absolute draw on same Y line)
      doc.font("Helvetica-Bold").fontSize(7.5).fillColor(COLORS.textMuted).text(exp.period[lang], RIGHT_X, itemY, { align: "right", width: RIGHT_WIDTH });
      
      // Role height + Company spacing
      const roleHeight = doc.heightOfString(exp.role[lang], { width: RIGHT_WIDTH - 90 });
      rightY = itemY + roleHeight + 4; // Generous 4pt gap below role

      // Company (Blue)
      doc.font("Helvetica-Bold").fontSize(8.5).fillColor(COLORS.primary).text(exp.company, RIGHT_X, rightY, { width: RIGHT_WIDTH });
      rightY += 14; // Safer 14pt height shift (avoiding text overlap)

      // Description
      doc.font("Helvetica-Oblique").fontSize(7.5).fillColor(COLORS.textMuted).text(exp.description[lang], RIGHT_X, rightY, { width: RIGHT_WIDTH });
      rightY += 14; // Safer 14pt height shift

      // Achievements (Bullet points)
      doc.font("Helvetica").fontSize(7).fillColor(COLORS.textDark);
      exp.achievements[lang].forEach((ach) => {
        doc.text("• ", RIGHT_X + 5, rightY);
        doc.text(ach, RIGHT_X + 12, rightY, { width: RIGHT_WIDTH - 12, lineGap: 1.5 });
        
        const textHeight = doc.heightOfString(ach, { width: RIGHT_WIDTH - 12, lineGap: 1.5 });
        rightY += textHeight + 4; // Clean spacing between bullets
      });
      
      rightY += 6;
    });

    // Section: Selected Projects
    const projectsHeader = lang === "FR" ? "PROJETS CLÉS" : "KEY PROJECTS";
    drawAbsoluteSectionHeader(projectsHeader);

    const selectedProjects = projectsData.slice(0, 3);

    selectedProjects.forEach((proj) => {
      const startY = rightY;
      const stackString = `[${proj.stack.join(", ")}]`;

      // Project Title
      doc.font("Helvetica-Bold").fontSize(9.5).fillColor(COLORS.textDark).text(proj.title, RIGHT_X, startY, { width: RIGHT_WIDTH - 120 });
      
      // Stack on the right
      doc.font("Helvetica").fontSize(7).fillColor(COLORS.primary).text(stackString, RIGHT_X, startY, { align: "right", width: RIGHT_WIDTH });
      
      const titleHeight = doc.heightOfString(proj.title, { width: RIGHT_WIDTH - 120 });
      rightY = startY + titleHeight + 4;

      // Description
      const descText = proj.description[lang];
      doc.font("Helvetica").fontSize(7.5).fillColor(COLORS.textMuted).text(descText, RIGHT_X, rightY, { width: RIGHT_WIDTH, lineGap: 1.5 });
      const descHeight = doc.heightOfString(descText, { width: RIGHT_WIDTH, lineGap: 1.5 });
      rightY += descHeight + 5;

      // Metric or Impact if present
      if (proj.metrics && proj.metrics.length > 0) {
        const metricText = `Impact: ${proj.metrics.map(m => `${m.label[lang]} (${m.value})`).join("  |  ")}`;
        doc.font("Helvetica-Bold").fontSize(7).fillColor(COLORS.textDark).text(metricText, RIGHT_X, rightY, { width: RIGHT_WIDTH });
        rightY += 10;
      }
      
      rightY += 6;
    });

    // Section: Distinctions & Prix
    const awardsHeader = lang === "FR" ? "DISTINCTIONS & PRIX" : "AWARDS & HONORS";
    drawAbsoluteSectionHeader(awardsHeader);

    awardsList.forEach((a) => {
      const startY = rightY;
      doc.font("Helvetica-Bold").fontSize(8.5).fillColor(COLORS.textDark).text(a.event, RIGHT_X, startY, { width: RIGHT_WIDTH - 150 });
      doc.font("Helvetica").fontSize(7.5).fillColor(COLORS.textMuted).text(` — ${a.result[lang]} — ${a.date}`, RIGHT_X, startY, { align: "right", width: RIGHT_WIDTH });
      
      const eventHeight = doc.heightOfString(a.event, { width: RIGHT_WIDTH - 150 });
      rightY = startY + eventHeight + 4;
    });

    // Finalize Document
    doc.end();
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });
}

async function run() {
  const resumeFrPath = path.join(__dirname, "../public/resume-fr.pdf");
  const resumeEnPath = path.join(__dirname, "../public/resume-en.pdf");
  const fallbackPath = path.join(__dirname, "../public/resume.pdf");

  console.log("Generating French resume...");
  await generateCV("FR", resumeFrPath);
  
  console.log("Generating English resume...");
  await generateCV("EN", resumeEnPath);

  console.log("Generating fallback resume...");
  await generateCV("FR", fallbackPath);

  console.log("All Resumes generated successfully.");
}

run().catch((err) => {
  console.error("Error generating resumes:", err);
  process.exit(1);
});
