import fs from "fs";
import path from "path";

// 1. Manually parse .env.local to load credentials
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const separatorIdx = trimmed.indexOf("=");
    if (separatorIdx === -1) return;
    const key = trimmed.substring(0, separatorIdx).trim();
    let val = trimmed.substring(separatorIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.substring(1, val.length - 1);
    }
    process.env[key] = val;
  });
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Error: NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN is missing from .env.local");
  process.exit(1);
}

async function run() {
  const ndjsonPath = path.join(process.cwd(), "sanity-data.ndjson");
  if (!fs.existsSync(ndjsonPath)) {
    console.error(`Error: File ${ndjsonPath} not found!`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(ndjsonPath, "utf-8");
  const lines = fileContent.split("\n").filter((l) => l.trim().length > 0);
  const documents = lines.map((line) => JSON.parse(line));

  console.log(`Parsed ${documents.length} documents from sanity-data.ndjson.`);
  console.log(`Syncing data to Sanity project ID "${projectId}" (dataset "${dataset}")...`);

  // Build the batch createOrReplace mutations
  const mutations = documents.map((doc) => ({
    createOrReplace: doc,
  }));

  const url = `https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${dataset}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ mutations }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("SUCCESS: Sanity database successfully updated!");
      console.log(`Results: ${result.results?.length || 0} operations executed.`);
    } else {
      console.error("ERROR syncing data to Sanity API:", result);
      process.exit(1);
    }
  } catch (error) {
    console.error("Network error executing Sanity mutation:", error);
    process.exit(1);
  }
}

run();
