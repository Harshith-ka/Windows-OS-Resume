import { User, Briefcase, Code, GraduationCap, FolderOpen, Mail, FileText, Calculator, Palette, Activity, Terminal, Gamepad2, MessageSquare } from "lucide-react";

export interface ResumeData {
  personal: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    bio: string;
    avatar: string;
  };
  skills: {
    category: string;
    items: { name: string; level: number }[];
  }[];
  experience: {
    company: string;
    position: string;
    duration: string;
    location: string;
    achievements: string[];
  }[];
  projects: {
    name: string;
    description: string;
    tech: string[];
    liveUrl?: string;
    githubUrl?: string;
  }[];
  education: {
    institution: string;
    degree: string;
    field: string;
    duration: string;
    gpa?: string;
  }[];
}

export const resumeData: ResumeData = {
  personal: {
    name: "John Doe",
    title: "Full-Stack Developer",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    bio: "Passionate full-stack developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies. Love creating beautiful, performant user experiences.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  skills: [
    {
      category: "Frontend",
      items: [
        { name: "React", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Tailwind CSS", level: 85 },
        { name: "Next.js", level: 80 },
      ],
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", level: 90 },
        { name: "Python", level: 85 },
        { name: "PostgreSQL", level: 80 },
        { name: "MongoDB", level: 75 },
      ],
    },
    {
      category: "Tools & Others",
      items: [
        { name: "Git", level: 95 },
        { name: "Docker", level: 80 },
        { name: "AWS", level: 75 },
        { name: "CI/CD", level: 85 },
      ],
    },
  ],
  experience: [
    {
      company: "Tech Corp",
      position: "Senior Full-Stack Developer",
      duration: "2021 - Present",
      location: "San Francisco, CA",
      achievements: [
        "Led development of microservices architecture serving 1M+ users",
        "Reduced page load time by 40% through optimization",
        "Mentored team of 5 junior developers",
        "Implemented CI/CD pipeline reducing deployment time by 60%",
      ],
    },
    {
      company: "StartupXYZ",
      position: "Full-Stack Developer",
      duration: "2019 - 2021",
      location: "Remote",
      achievements: [
        "Built real-time collaboration features using WebSockets",
        "Developed RESTful APIs handling 10K+ requests/minute",
        "Integrated payment processing with Stripe",
        "Improved test coverage from 40% to 85%",
      ],
    },
    {
      company: "Digital Agency",
      position: "Frontend Developer",
      duration: "2018 - 2019",
      location: "New York, NY",
      achievements: [
        "Created responsive web applications for Fortune 500 clients",
        "Collaborated with design team on UI/UX improvements",
        "Implemented accessibility standards (WCAG 2.1)",
      ],
    },
  ],
  projects: [
    {
      name: "E-Commerce Platform",
      description: "Full-featured e-commerce platform with admin dashboard, payment processing, and inventory management.",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/johndoe/ecommerce",
    },
    {
      name: "Task Management App",
      description: "Real-time collaborative task management application with team features and analytics.",
      tech: ["Next.js", "TypeScript", "MongoDB", "Socket.io"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/johndoe/taskapp",
    },
    {
      name: "Weather Dashboard",
      description: "Beautiful weather dashboard with forecasts, maps, and historical data visualization.",
      tech: ["React", "Tailwind CSS", "OpenWeather API", "Charts.js"],
      githubUrl: "https://github.com/johndoe/weather",
    },
    {
      name: "Portfolio Website",
      description: "Personal portfolio showcasing projects and blog posts with CMS integration.",
      tech: ["Next.js", "MDX", "Tailwind CSS"],
      liveUrl: "https://example.com",
    },
  ],
  education: [
    {
      institution: "University of California",
      degree: "Bachelor of Science",
      field: "Computer Science",
      duration: "2014 - 2018",
      gpa: "3.8/4.0",
    },
    {
      institution: "Tech Bootcamp",
      degree: "Full-Stack Web Development Certificate",
      field: "Web Development",
      duration: "2017",
    },
  ],
};

export const desktopIcons = [
  { id: "about", label: "About Me", icon: User, section: "about", x: 16, y: 16 },
  { id: "skills", label: "Skills", icon: Code, section: "skills", x: 16, y: 120 },
  { id: "experience", label: "Experience", icon: Briefcase, section: "experience", x: 16, y: 224 },
  { id: "projects", label: "Projects", icon: FolderOpen, section: "projects", x: 16, y: 328 },
  { id: "education", label: "Education", icon: GraduationCap, section: "education", x: 16, y: 432 },
  { id: "contact", label: "Contact", icon: Mail, section: "contact", x: 16, y: 536 },
  { id: "notepad", label: "Notepad", icon: FileText, section: "notepad", x: 140, y: 16 },
  { id: "calculator", label: "Calculator", icon: Calculator, section: "calculator", x: 140, y: 120 },
  { id: "paint", label: "Paint", icon: Palette, section: "paint", x: 140, y: 224 },
  { id: "task-manager", label: "Task Manager", icon: Activity, section: "task-manager", x: 140, y: 328 },
  { id: "terminal", label: "PowerShell", icon: Terminal, section: "terminal", x: 140, y: 432 },
  { id: "secret-game", label: "Fun Games", icon: Gamepad2, section: "secret-game", x: 140, y: 536 },
  { id: "faq-assistant", label: "Ask Me", icon: MessageSquare, section: "faq-assistant", x: 264, y: 16 },
];
