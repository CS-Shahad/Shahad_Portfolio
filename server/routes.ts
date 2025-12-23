import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.projects.list.path, async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  });

  app.get(api.skills.list.path, async (_req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  });

  // Seed data function
  async function seedData() {
    const existingProjects = await storage.getProjects();
    if (existingProjects.length === 0) {
      await storage.createProject({
        title: "Financial Fraud Detection System",
        description: "Real-time machine learning detection for fraudulent transactions.",
        problem: "Increasing fraudulent transactions leading to financial loss and manual verification bottlenecks.",
        solution: "Developed a random forest classifier integrated with a streaming pipeline to score transactions in milliseconds.",
        impact: "Achieved 98% accuracy and reduced manual review time by 40%.",
        category: "AI",
        techStack: ["Python", "Scikit-learn", "SQL", "Pandas"],
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80"
      });
      
      await storage.createProject({
        title: "Automated Invoice Processing RPA",
        description: "End-to-end RPA solution for invoice data extraction.",
        problem: "Manual data entry from invoices was error-prone and consumed 30+ hours of team time weekly.",
        solution: "Build an Azure AI Search and Power Automate flow that extracts text via OCR and populates ERP records automatically.",
        impact: "Eliminated data entry errors and saved 20 hours/week per department.",
        category: "Automation",
        techStack: ["Power Automate", "Python", "Azure OCR"],
        imageUrl: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&q=80"
      });
      
      await storage.createProject({
        title: "Executive Sales Analytics Dashboard",
        description: "Interactive Power BI dashboard for real-time sales KPIs.",
        problem: "Leadership lacked visibility into regional sales performance, relying on stale weekly reports.",
        solution: "Implemented a live SQL Server connection to Power BI with customized DAX measures for real-time trend analysis.",
        impact: "Enabled immediate response to market shifts and improved forecasting accuracy by 15%.",
        category: "Data",
        techStack: ["Power BI", "DAX", "SQL Server"],
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
      });
    }

    const existingSkills = await storage.getSkills();
    if (existingSkills.length === 0) {
      const skillsData = [
        { name: "SQL", category: "Data" },
        { name: "Python (Pandas, NumPy)", category: "Data" },
        { name: "Power BI", category: "Data" },
        { name: "Machine Learning", category: "AI" },
        { name: "NLP", category: "AI" },
        { name: "Scikit-learn", category: "AI" },
        { name: "Power Automate", category: "Automation" },
        { name: "Selenium", category: "Automation" },
        { name: "Git", category: "Tools" },
        { name: "VS Code", category: "Tools" },
      ];
      
      for (const skill of skillsData) {
        await storage.createSkill(skill);
      }
    }
  }

  // Run seeding
  seedData().catch(console.error);

  return httpServer;
}
