import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-all duration-300 border-slate-200">
        <div className="aspect-video bg-slate-100 relative overflow-hidden">
          {project.imageUrl ? (
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300">
              {/* Abstract pattern placeholder */}
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          )}
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-slate-800 font-medium">
              {project.category}
            </Badge>
          </div>
        </div>
        
        <CardHeader className="pb-2">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <p className="text-slate-600 leading-relaxed text-sm line-clamp-4">
            {project.description}
          </p>
          
          <div className="mt-6 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs text-slate-500 border-slate-200 bg-slate-50">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        
        {project.link && (
          <CardFooter className="pt-2 pb-6 border-t border-slate-50 mt-auto">
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-900 flex items-center gap-2 hover:underline"
            >
              View Project <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
