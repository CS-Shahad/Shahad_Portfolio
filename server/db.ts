import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// دعم ESM و CommonJS معاً
let __dirname: string;
try {
  // لو ESM
  const __filename = fileURLToPath(import.meta.url);
  __dirname = path.dirname(__filename);
} catch {
  // لو CommonJS
  __dirname = path.dirname(require.main?.filename || "");
}

const dataDir = path.join(__dirname, "data");
const projectsFile = path.join(dataDir, "projects.json");
const skillsFile = path.join(dataDir, "skills.json");
const messagesFile = path.join(dataDir, "messages.json");

// دوال Projects
export function getProjects() {
  const data = fs.readFileSync(projectsFile, "utf-8");
  return JSON.parse(data);
}

export function saveProjects(projects: any[]) {
  fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2));
}

// دوال Skills
export function getSkills() {
  const data = fs.readFileSync(skillsFile, "utf-8");
  return JSON.parse(data);
}

export function saveSkills(skills: any[]) {
  fs.writeFileSync(skillsFile, JSON.stringify(skills, null, 2));
}

// دوال Messages
export function getMessages() {
  const data = fs.readFileSync(messagesFile, "utf-8");
  return JSON.parse(data);
}

export function saveMessages(messages: any[]) {
  fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
}


// هذي النسخة كانت تشتغل على القيت هب مود سبيس بس ما تزبط لما ارفعها على ريندر
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// // مسار ملفات JSON
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const dataDir = path.join(__dirname, "data");
// const projectsFile = path.join(dataDir, "projects.json");
// const skillsFile = path.join(dataDir, "skills.json");
// const messagesFile = path.join(dataDir, "messages.json");

// // دوال Projects
// export function getProjects() {
//   const data = fs.readFileSync(projectsFile, "utf-8");
//   return JSON.parse(data);
// }

// export function saveProjects(projects: any[]) {
//   fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2));
// }

// // دوال Skills
// export function getSkills() {
//   const data = fs.readFileSync(skillsFile, "utf-8");
//   return JSON.parse(data);
// }

// export function saveSkills(skills: any[]) {
//   fs.writeFileSync(skillsFile, JSON.stringify(skills, null, 2));
// }

// // دوال Messages
// export function getMessages() {
//   const data = fs.readFileSync(messagesFile, "utf-8");
//   return JSON.parse(data);
// }

// export function saveMessages(messages: any[]) {
//   fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
// }





// الملف الاساسي لما كان متصل بقاعدة بيانات ولكن بيئة القيت هب ما تسمح بالاتصال من هذا النوع
// import { drizzle } from "drizzle-orm/node-postgres";
// import pg from "pg";
// import * as schema from "@shared/schema";

// const { Pool } = pg;

// if (!process.env.DATABASE_URL) {
//   throw new Error(
//     "DATABASE_URL must be set. Did you forget to provision a database?",
//   );
// }

// export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// export const db = drizzle(pool, { schema });
