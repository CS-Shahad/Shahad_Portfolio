import { Github, Linkedin, Mail } from "lucide-react";


export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12">
      <div className="container-width px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-slate-900">Shahad Al-Matrafi</h3>
            <p className="text-sm text-slate-500 mt-1">
              Data Analysis | AI | Automation
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            {/* <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
              <Github className="w-5 h-5" />
            </a> */}
            <a 
            href="https://www.linkedin.com/in/shahad-almatrafi-b5193829b" 
            className="text-slate-400 hover:text-slate-900 transition-colors"
            target="_blank"
            rel="noopener noreferrer">
            <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:shahadalmatrafi5@gmail.com" className="text-slate-400 hover:text-slate-900 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Shahad Al-Matrafi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
