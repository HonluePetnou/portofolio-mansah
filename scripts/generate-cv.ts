import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { experiences, educationList, awardsList, languagesList, skillsGrouped } from "../src/data/experience";
import { projectsData } from "../src/data/projects";

// Output path
const outputPath = path.join(__dirname, "../public/resume.pdf");

// Ensure public directory exists
const publicDir = path.join(__dirname, "../public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create a new PDF document (A4, no margins automatically, we manage coordinates)
const doc = new PDFDocument({
  size: "A4",
  margins: { top: 0, bottom: 0, left: 0, right: 0 },
});

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

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
  { label: "Email", val: "fredericarmel.mansah@gmail.com" },
  { label: "Téléphone", val: "+228 90 00 00 00" },
  { label: "GitHub", val: "github.com/HonluePetnou" },
  { label: "LinkedIn", val: "linkedin.com/in/frederic-armel-mansah" },
  { label: "Portfolio", val: "mansah-portfolio.vercel.app" },
];

contactDetails.forEach((c) => {
  doc.font("Helvetica-Bold").fontSize(7.5).fillColor(COLORS.textDark).text(c.label, LEFT_X, leftY);
  leftY += 9;
  doc.font("Helvetica").fontSize(7).fillColor(COLORS.textMuted).text(c.val, LEFT_X, leftY, { width: LEFT_WIDTH });
  leftY += 13;
});

leftY += 8;

// Compétences Techniques (skillsGrouped)
doc.fillColor(COLORS.primary)
   .font("Helvetica-Bold")
   .fontSize(10)
   .text("COMPÉTENCES", LEFT_X, leftY);
leftY += 15;

skillsGrouped.forEach((g) => {
  doc.font("Helvetica-Bold").fontSize(7.5).fillColor(COLORS.textDark).text(`${g.category}: `, LEFT_X, leftY, { continued: true, width: LEFT_WIDTH });
  doc.font("Helvetica").fontSize(7).fillColor(COLORS.textMuted).text(g.skills.join(", "), { width: LEFT_WIDTH, lineGap: 1.5 });
  const textHeight = doc.heightOfString(`${g.category}: ${g.skills.join(", ")}`, { width: LEFT_WIDTH, lineGap: 1.5 });
  leftY += textHeight + 4;
});

leftY += 8;

// Formation (educationList)
doc.fillColor(COLORS.primary)
   .font("Helvetica-Bold")
   .fontSize(10)
   .text("FORMATION", LEFT_X, leftY);
leftY += 15;

educationList.forEach((e) => {
  doc.font("Helvetica-Bold").fontSize(7.5).fillColor(COLORS.textDark).text(e.school, LEFT_X, leftY);
  leftY += 10;
  doc.font("Helvetica").fontSize(7).fillColor(COLORS.textMuted).text(`${e.degree} - ${e.field}`, LEFT_X, leftY, { width: LEFT_WIDTH });
  leftY += doc.heightOfString(`${e.degree} - ${e.field}`, { width: LEFT_WIDTH }) + 2;
  doc.font("Helvetica-Oblique").fontSize(6.5).fillColor(COLORS.textMuted).text(e.period, LEFT_X, leftY);
  leftY += 12;
});

leftY += 8;

// Langues (languagesList)
doc.fillColor(COLORS.primary)
   .font("Helvetica-Bold")
   .fontSize(10)
   .text("LANGUES", LEFT_X, leftY);
leftY += 15;

languagesList.forEach((l) => {
  doc.font("Helvetica-Bold").fontSize(7.5).fillColor(COLORS.textDark).text(`${l.name} : `, LEFT_X, leftY, { continued: true, width: LEFT_WIDTH });
  doc.font("Helvetica").fontSize(7).fillColor(COLORS.textMuted).text(l.level, { width: LEFT_WIDTH });
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
doc.fillColor(COLORS.textDark)
   .font("Helvetica-Bold")
   .fontSize(9.5)
   .text("Senior Frontend Engineer · QA Specialist · Product Builder", RIGHT_X, rightY, { width: RIGHT_WIDTH });
rightY += 18;

// PROFIL Section (3-4 lines max)
const profileText = "Ingénieur logiciel orienté produit, spécialisé dans la conception d'architectures frontend performantes et de frameworks d'automatisation de tests robustes. Expert dans la livraison d'applications web réactives avec des structures React modulaires et du QA préventif pour assurer la fiabilité.";

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
drawAbsoluteSectionHeader("EXPÉRIENCE PROFESSIONNELLE");

experiences.forEach((exp) => {
  const itemY = rightY;
  
  // Role (Title)
  doc.font("Helvetica-Bold").fontSize(9.5).fillColor(COLORS.textDark).text(exp.role, RIGHT_X, itemY, { width: RIGHT_WIDTH - 90 });
  
  // Period aligned to the right (absolute draw on same Y line)
  doc.font("Helvetica-Bold").fontSize(7.5).fillColor(COLORS.textMuted).text(exp.period, RIGHT_X, itemY, { align: "right", width: RIGHT_WIDTH });
  
  // Role height + Company spacing
  const roleHeight = doc.heightOfString(exp.role, { width: RIGHT_WIDTH - 90 });
  rightY = itemY + roleHeight + 4; // Generous 4pt gap below role

  // Company (Blue)
  doc.font("Helvetica-Bold").fontSize(8.5).fillColor(COLORS.primary).text(exp.company, RIGHT_X, rightY, { width: RIGHT_WIDTH });
  rightY += 14; // Safer 14pt height shift (avoiding text overlap)

  // Description
  doc.font("Helvetica-Oblique").fontSize(7.5).fillColor(COLORS.textMuted).text(exp.description, RIGHT_X, rightY, { width: RIGHT_WIDTH });
  rightY += 14; // Safer 14pt height shift

  // Achievements (Bullet points)
  doc.font("Helvetica").fontSize(7).fillColor(COLORS.textDark);
  exp.achievements.forEach((ach) => {
    doc.text("• ", RIGHT_X + 5, rightY);
    doc.text(ach, RIGHT_X + 12, rightY, { width: RIGHT_WIDTH - 12, lineGap: 1.5 });
    
    const textHeight = doc.heightOfString(ach, { width: RIGHT_WIDTH - 12, lineGap: 1.5 });
    rightY += textHeight + 4; // Clean spacing between bullets
  });
  
  rightY += 6;
});

// Section: Selected Projects
drawAbsoluteSectionHeader("PROJETS CLÉS");

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
  doc.font("Helvetica").fontSize(7.5).fillColor(COLORS.textMuted).text(proj.description, RIGHT_X, rightY, { width: RIGHT_WIDTH, lineGap: 1.5 });
  const descHeight = doc.heightOfString(proj.description, { width: RIGHT_WIDTH, lineGap: 1.5 });
  rightY += descHeight + 5;

  // Metric or Impact if present
  if (proj.metrics && proj.metrics.length > 0) {
    const metricText = `Impact: ${proj.metrics.map(m => `${m.label} (${m.value})`).join("  |  ")}`;
    doc.font("Helvetica-Bold").fontSize(7).fillColor(COLORS.textDark).text(metricText, RIGHT_X, rightY, { width: RIGHT_WIDTH });
    rightY += 10;
  }
  
  rightY += 6;
});

// Section: Distinctions & Prix
drawAbsoluteSectionHeader("DISTINCTIONS & PRIX");

awardsList.forEach((a) => {
  const startY = rightY;
  doc.font("Helvetica-Bold").fontSize(8.5).fillColor(COLORS.textDark).text(a.event, RIGHT_X, startY, { width: RIGHT_WIDTH - 150 });
  doc.font("Helvetica").fontSize(7.5).fillColor(COLORS.textMuted).text(` — ${a.result} — ${a.date}`, RIGHT_X, startY, { align: "right", width: RIGHT_WIDTH });
  
  const eventHeight = doc.heightOfString(a.event, { width: RIGHT_WIDTH - 150 });
  rightY = startY + eventHeight + 4;
});

// Finalize Document
doc.end();

writeStream.on("finish", () => {
  console.log(`Successfully generated resume at ${outputPath}`);
});
