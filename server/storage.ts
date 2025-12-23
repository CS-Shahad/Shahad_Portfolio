import * as db from "./db";
import {
  type Project, type InsertProject,
  type Skill, type InsertSkill,
  type Message, type InsertMessage
} from "@shared/schema";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  getSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class JsonStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return db.getProjects();
  }

  async getProject(id: number): Promise<Project | undefined> {
    return db.getProjects().find((p: Project) => p.id === id);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const projects = db.getProjects();
    const newProject: Project = {
  id: projects.length ? Math.max(...projects.map((p: Project)  => p.id)) + 1 : 1,
  title: project.title,
  description: project.description,
  techStack: project.techStack,
  category: project.category,
  link: project.link ?? null,
  problem: project.problem ?? null,
  solution: project.solution ?? null,
  impact: project.impact ?? null,
  imageUrl: project.imageUrl ?? null,
};
    projects.push(newProject);
    db.saveProjects(projects);
    return newProject;
  }

  async getSkills(): Promise<Skill[]> {
    return db.getSkills();
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const skills = db.getSkills();
    const newSkill: Skill = {
      id: skills.length ? Math.max(...skills.map((s: Skill) => s.id)) + 1 : 1,
      ...skill,
    };
    skills.push(newSkill);
    db.saveSkills(skills);
    return newSkill;
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const messages = db.getMessages();
    const newMessage: Message = {
      id: messages.length ? Math.max(...messages.map((m: Message) => m.id)) + 1 : 1,
      createdAt: new Date(),
      ...message,
    };
    messages.push(newMessage);
    db.saveMessages(messages);
    return newMessage;
  }
}

export const storage = new JsonStorage();


// لما كان داتابيس
// import { db } from "./db";
// import {
//   projects, skills, messages,
//   type Project, type InsertProject,
//   type Skill, type InsertSkill,
//   type Message, type InsertMessage
// } from "@shared/schema";
// import { eq } from "drizzle-orm";

// export interface IStorage {
//   getProjects(): Promise<Project[]>;
//   getProject(id: number): Promise<Project | undefined>;
//   createProject(project: InsertProject): Promise<Project>;
//   getSkills(): Promise<Skill[]>;
//   createSkill(skill: InsertSkill): Promise<Skill>;
//   createMessage(message: InsertMessage): Promise<Message>;
//   getProject(id: number): Promise<Project | undefined>;
// }

// export class DatabaseStorage implements IStorage {
//   async getProjects(): Promise<Project[]> {
//     return await db.select().from(projects);
//   }

//   async getProject(id: number): Promise<Project | undefined> {
//     const [project] = await db.select().from(projects).where(eq(projects.id, id));
//     return project;
//   }

//   async getProject(id: number): Promise<Project | undefined> {
//     const [project] = await db.select().from(projects).where(eq(projects.id, id));
//     return project;
//   }

//   async createProject(project: InsertProject): Promise<Project> {
//     const [newProject] = await db.insert(projects).values(project).returning();
//     return newProject;
//   }

//   async getSkills(): Promise<Skill[]> {
//     return await db.select().from(skills);
//   }

//   async createSkill(skill: InsertSkill): Promise<Skill> {
//     const [newSkill] = await db.insert(skills).values(skill).returning();
//     return newSkill;
//   }

//   async createMessage(message: InsertMessage): Promise<Message> {
//     const [newMessage] = await db.insert(messages).values(message).returning();
//     return newMessage;
//   }
// }

// export const storage = new DatabaseStorage();
