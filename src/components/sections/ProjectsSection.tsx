import { resumeData } from "@/lib/resumeData";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

export const ProjectsSection = () => {
  const { projects } = resumeData;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-text-primary mb-6">Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="glass p-6 rounded-lg hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Project Header */}
            <div className="mb-4">
              <h2 className="text-lg font-bold text-text-primary mb-2">{project.name}</h2>
              <p className="text-sm text-text-secondary leading-relaxed">{project.description}</p>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-win-blue/10 text-win-blue text-xs font-medium rounded border border-win-blue/20"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-win-blue text-white text-sm font-medium rounded hover:bg-win-blue-dark transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-muted text-text-primary text-sm font-medium rounded hover:bg-muted/80 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Code
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
