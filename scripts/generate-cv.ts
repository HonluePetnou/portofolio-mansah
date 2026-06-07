import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { experiences } from "../src/data/experience";
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
  accent: "#39FF14",       // Neon Green (used subtly)
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
   .fontSize(11)
   .text("CONTACT", LEFT_X, leftY);
leftY += 18;

const contactDetails = [
  { label: "Email", val: "fredericarmel.mansah@gmail.com" },
  { label: "Phone", val: "+228 90 00 00 00" }, // Placeholder or adjustable
  { label: "GitHub", val: "github.com/HonluePetnou" },
  { label: "LinkedIn", val: "linkedin.com/in/frederic-armel-mansah" },
  { label: "Portfolio", val: "mansah-portfolio.vercel.app" },
];

doc.font("Helvetica").fontSize(7.5).fillColor(COLORS.textDark);
contactDetails.forEach((c) => {
  doc.font("Helvetica-Bold").text(c.label, LEFT_X, leftY);
  leftY += 10;
  doc.font("Helvetica").text(c.val, LEFT_X, leftY, { width: LEFT_WIDTH, lineGap: 2 });
  leftY += 14;
});

leftY += 10;

// Skills
doc.fillColor(COLORS.primary)
   .font("Helvetica-Bold")
   .fontSize(11)
   .text("CORE SKILLS", LEFT_X, leftY);
leftY += 18;

const skillGroups = [
  {
    title: "Frontend Engineering",
    skills: ["React / Next.js 16", "TypeScript / JavaScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "QA & Testing",
    skills: ["Cucumber (BDD)", "Cucumber Automation", "Regression Testing", "Unit Testing"],
  },
  {
    title: "Tools & Backend",
    skills: ["Node.js / Express", "FastAPI / Python", "SQL (PostgreSQL)", "Git & CI/CD Pipelines"],
  },
];

skillGroups.forEach((g) => {
  doc.font("Helvetica-Bold").fontSize(8.5).fillColor(COLORS.textDark).text(g.title, LEFT_X, leftY);
  leftY += 11;
  doc.font("Helvetica").fontSize(7.5).fillColor(COLORS.textMuted);
  g.skills.forEach((s) => {
    doc.text(`• ${s}`, LEFT_X + 4, leftY);
    leftY += 10;
  });
  leftY += 5;
});

leftY += 10;

// Strengths
doc.fillColor(COLORS.primary)
   .font("Helvetica-Bold")
   .fontSize(11)
   .text("STRENGTHS", LEFT_X, leftY);
leftY += 18;

const strengthsList = [
  "Technical Leadership",
  "Product-Oriented Mindset",
  "Agile & Scrum Delivery",
  "Strict Quality Standards",
  "Effective Collaboration",
];

doc.font("Helvetica").fontSize(7.5).fillColor(COLORS.textDark);
strengthsList.forEach((s) => {
  doc.text(`✓  ${s}`, LEFT_X, leftY);
  leftY += 12;
});


// ==========================================
// RIGHT COLUMN (MAIN) - Starts at X: 215
// ==========================================
let rightY = 40;
const RIGHT_X = 215;
const RIGHT_WIDTH = PAGE_WIDTH - RIGHT_X - 30; // 350 pt width

// Header: Name & Title
doc.fillColor(COLORS.primary)
   .font("Helvetica-Bold")
   .fontSize(22)
   .text("Frédéric Armel Mansah", RIGHT_X, rightY);
rightY += 26;

doc.fillColor(COLORS.textDark)
   .font("Helvetica-Bold")
   .fontSize(12)
   .text("Senior Frontend Engineer & QA Specialist", RIGHT_X, rightY);
rightY += 16;

doc.fillColor(COLORS.textMuted)
   .font("Helvetica")
   .fontSize(8.5)
   .text(
     "Product-oriented Software Engineer with a strong track record of building performant frontend architectures and establishing robust test automation frameworks. Specialized in crafting responsive web applications, modular React structures, and preventative QA automation.",
     RIGHT_X,
     rightY,
     { width: RIGHT_WIDTH, align: "justify", lineGap: 2 }
   );
rightY += 46;

// Section: Professional Experience
doc.fillColor(COLORS.primary)
   .font("Helvetica-Bold")
   .fontSize(11)
   .text("PROFESSIONAL EXPERIENCE", RIGHT_X, rightY);
rightY += 6;

// Add horizontal separator line
doc.moveTo(RIGHT_X, rightY).lineTo(RIGHT_X + RIGHT_WIDTH, rightY).strokeColor(COLORS.divider).lineWidth(0.5).stroke();
rightY += 12;

experiences.forEach((exp) => {
  // Role & Period
  doc.font("Helvetica-Bold").fontSize(9.5).fillColor(COLORS.textDark).text(exp.role, RIGHT_X, rightY);
  
  // Period aligned right
  doc.font("Helvetica-Bold").fontSize(8).fillColor(COLORS.textMuted).text(exp.period, RIGHT_X, rightY, { align: "right", width: RIGHT_WIDTH });
  rightY += 11;
  
  // Company
  doc.font("Helvetica-Bold").fontSize(8.5).fillColor(COLORS.primary).text(exp.company, RIGHT_X, rightY);
  rightY += 11;

  // Description
  doc.font("Helvetica-Oblique").fontSize(8).fillColor(COLORS.textMuted).text(exp.description, RIGHT_X, rightY, { width: RIGHT_WIDTH });
  rightY += 10;

  // Achievements
  doc.font("Helvetica").fontSize(7.5).fillColor(COLORS.textDark);
  exp.achievements.forEach((ach) => {
    doc.text("• ", RIGHT_X + 5, rightY);
    doc.text(ach, RIGHT_X + 12, rightY, { width: RIGHT_WIDTH - 12, lineGap: 1.5 });
    
    // Calculate vertical offset for text wrapping
    const textHeight = doc.heightOfString(ach, { width: RIGHT_WIDTH - 12, lineGap: 1.5 });
    rightY += textHeight + 2;
  });
  
  rightY += 10;
});

// Section: Selected Projects
doc.fillColor(COLORS.primary)
   .font("Helvetica-Bold")
   .fontSize(11)
   .text("KEY PROJECTS", RIGHT_X, rightY);
rightY += 6;

doc.moveTo(RIGHT_X, rightY).lineTo(RIGHT_X + RIGHT_WIDTH, rightY).strokeColor(COLORS.divider).lineWidth(0.5).stroke();
rightY += 10;

// Filter for top 2 key projects to avoid overflow
const selectedProjects = projectsData.slice(0, 3);

selectedProjects.forEach((proj) => {
  // Title & Stack
  const stackString = `[${proj.stack.join(", ")}]`;
  doc.font("Helvetica-Bold").fontSize(9.5).fillColor(COLORS.textDark).text(proj.title, RIGHT_X, rightY);
  
  doc.font("Helvetica").fontSize(7.5).fillColor(COLORS.primary).text(stackString, RIGHT_X, rightY, { align: "right", width: RIGHT_WIDTH });
  rightY += 11;

  // Description
  doc.font("Helvetica").fontSize(7.5).fillColor(COLORS.textMuted).text(proj.description, RIGHT_X, rightY, { width: RIGHT_WIDTH, lineGap: 1 });
  
  const descHeight = doc.heightOfString(proj.description, { width: RIGHT_WIDTH, lineGap: 1 });
  rightY += descHeight + 3;

  // Metric or Impact if present
  if (proj.metrics && proj.metrics.length > 0) {
    const metricText = `Impact: ${proj.metrics.map(m => `${m.label} (${m.value})`).join("  |  ")}`;
    doc.font("Helvetica-Bold").fontSize(7.5).fillColor(COLORS.textDark).text(metricText, RIGHT_X, rightY, { width: RIGHT_WIDTH });
    rightY += 10;
  }
  
  rightY += 10;
});

// Finalize Document
doc.end();

writeStream.on("finish", () => {
  console.log(`Successfully generated resume at ${outputPath}`);
});
