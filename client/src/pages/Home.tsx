import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Bot, Brain, Database, Zap, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema } from "@shared/schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { useProjects, useSkills, useSendMessage } from "@/hooks/use-portfolio";

export default function Home() {
  const { data: projects, isLoading: isProjectsLoading } = useProjects();
  const { data: skills, isLoading: isSkillsLoading } = useSkills();
  const sendMessage = useSendMessage();

  const form = useForm({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data: any) => {
    sendMessage.mutate(data, {
      onSuccess: () => form.reset()
    });
  };

  const skillsByCategory = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-slate-200">
      <Navigation />

      {/* HERO SECTION */}
      <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-32 bg-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-20 z-0 hidden lg:block" />
        
        <div className="container-width px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div 
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Available for new opportunities
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
                Turning Complex Data into <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-400">Intelligent Action.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                I'm Shahad Al-Matrafi, a Data & AI Professional, specializing in predictive analytics, 
                automation pipelines, and turning raw data into strategic business value.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button size="lg" className="min-w-[160px] h-12 text-base bg-slate-900 text-white hover:bg-slate-800">
                  View Projects
                </Button>
                <Button size="lg" variant="outline" className="min-w-[160px] h-12 text-base border-slate-300">
                  Download CV
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1 w-full max-w-lg lg:max-w-none"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Hero Image / Graphic */}
              <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-slate-100 border border-slate-200">
                {/* Descriptive comment for Unsplash image */}
                {/* modern minimal abstract 3d geometric shapes gray white clean */}
                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
                  alt="Data Visualization Abstract" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/10 to-transparent mix-blend-multiply" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="section-padding bg-slate-50">
        <div className="container-width">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Technical Expertise</h2>
            <p className="text-slate-600 text-lg">
              A comprehensive toolkit for end-to-end data solutions, from ingestion to insight.
            </p>
          </div>

          {isSkillsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[1,2,3,4].map(i => <div key={i} className="h-64 bg-slate-200 rounded-xl animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Data Analysis", icon: <BarChart3 className="w-6 h-6" />, category: "Data" },
                { title: "Artificial Intelligence", icon: <Brain className="w-6 h-6" />, category: "AI" },
                { title: "Automation", icon: <Zap className="w-6 h-6" />, category: "Automation" },
                { title: "Infrastructure", icon: <Database className="w-6 h-6" />, category: "Tools" },
              ].map((category, idx) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-700 mb-4">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsByCategory?.[category.category]?.map((skill) => (
                      <span key={skill.id} className="text-sm text-slate-600 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ABOUT ME SECTION */}
      <section id="about" className="section-padding bg-white relative">
        <div className="container-width">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <div className="flex-1 order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-slate-100 rounded-full z-0" />
                <div className="relative z-10 bg-slate-50 p-8 rounded-2xl border border-slate-100">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">My Background</h3>
                  <div className="space-y-4 text-slate-600 leading-relaxed">
                    <p>
                      With a strong foundation in Computer Science and specialized focus on Data Science, 
                      I bridge the gap between technical complexity and business strategy.
                    </p>
                    <p>
                      My journey began with raw data analysis, but quickly evolved into building automated 
                      intelligence systems. I don't just report on what happened; I build models that predict 
                      what will happen next and automations that act on those insights.
                    </p>
                    <p>
                      I am passionate about using AI to solve real-world problems, from fraud detection 
                      systems to automated reporting pipelines that save teams hundreds of hours annually.
                    </p>
                  </div>
                  
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm text-center">
                      <div className="text-3xl font-bold text-slate-900 mb-1">3+</div>
                      <div className="text-xs text-slate-500 uppercase tracking-wide">Years Experience</div>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm text-center">
                      <div className="text-3xl font-bold text-slate-900 mb-1">15+</div>
                      <div className="text-xs text-slate-500 uppercase tracking-wide">Projects Delivered</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Data Scientist.<br/>
                Problem Solver.<br/>
                Strategist.
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                I help organizations make better decisions through data. Whether it's building 
                dashboards in Power BI, automating workflows with Python, or training machine 
                learning models, my goal is always the same: clarity and efficiency.
              </p>
              
              <div className="space-y-4">
                {[
                  "Certified Data Analyst",
                  "Expert in Python & SQL",
                  "Power BI & Tableau Specialist",
                  "Machine Learning Practitioner"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="section-padding bg-slate-50">
        <div className="container-width">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Projects</h2>
              <p className="text-slate-600 text-lg">
                Selected works demonstrating problem-solving capabilities across Data Science, AI, and Automation.
              </p>
            </div>
            <Button variant="outline" className="hidden md:flex">View GitHub</Button>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="bg-white p-1 border border-slate-200 rounded-lg">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="data">Data Analysis</TabsTrigger>
              <TabsTrigger value="ai">AI & ML</TabsTrigger>
              <TabsTrigger value="automation">Automation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-8">
              {isProjectsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1,2,3].map(i => <div key={i} className="h-96 bg-slate-200 rounded-2xl animate-pulse" />)}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects?.map((project, idx) => (
                    <ProjectCard key={project.id} project={project} index={idx} />
                  ))}
                </div>
              )}
            </TabsContent>
            
            {/* We could filter client-side for the other tabs to avoid extra requests, simplistic implementation here */}
            {['data', 'ai', 'automation'].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects?.filter(p => p.category.toLowerCase().includes(tab) || (tab === 'data' && p.category === 'Data')).map((project, idx) => (
                    <ProjectCard key={project.id} project={project} index={idx} />
                  ))}
                </div>
                {projects?.filter(p => p.category.toLowerCase().includes(tab) || (tab === 'data' && p.category === 'Data')).length === 0 && (
                  <div className="text-center py-20 text-slate-500">
                    No projects found in this category yet.
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-12 text-center md:hidden">
            <Button variant="outline" className="w-full">View GitHub</Button>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="section-padding bg-white">
        <div className="container-width max-w-4xl">
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <div className="p-8 md:p-12 md:w-2/5 bg-slate-800 text-white flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-6">Let's Talk</h2>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  I'm currently open to full-time roles in Data Science, Analytics, and AI Engineering.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center shrink-0">
                      <Send className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Email Me</div>
                      <div className="text-slate-400 text-sm mt-1">contact@shahad.ai</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 md:mt-0 pt-8 border-t border-slate-700">
                <p className="text-slate-400 text-sm">
                  Based in Riyadh, KSA<br/>
                  Open to Remote Work
                </p>
              </div>
            </div>
            
            <div className="p-8 md:p-12 md:w-3/5 bg-white">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} className="bg-slate-50 border-slate-200 focus:border-slate-400" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="name@company.com" {...field} className="bg-slate-50 border-slate-200 focus:border-slate-400" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell me about your project or role..." 
                            className="min-h-[120px] bg-slate-50 border-slate-200 focus:border-slate-400 resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12"
                    disabled={sendMessage.isPending}
                  >
                    {sendMessage.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
