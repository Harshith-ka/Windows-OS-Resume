import { resumeData } from "@/lib/resumeData";
import { ExternalLink, Github, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const ProjectsSectionGallery = () => {
  const { projects } = resumeData;

  // Generate placeholder images for projects
  const getProjectImage = (index: number) => {
    const colors = ["4F46E5", "7C3AED", "DB2777", "DC2626", "EA580C"];
    return `https://placehold.co/800x600/${colors[index % colors.length]}/FFFFFF/png?text=${encodeURIComponent(projects[index].name)}`;
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Gallery Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-window-title">
        <div className="flex items-center gap-3">
          <Code2 className="w-5 h-5 text-win-blue" />
          <h1 className="text-lg font-semibold text-text-primary">Projects Gallery</h1>
        </div>
        <div className="text-sm text-text-secondary">{projects.length} projects</div>
      </div>

      {/* Gallery Grid */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative glass rounded-xl overflow-hidden hover:ring-2 hover:ring-win-blue transition-all cursor-pointer"
            >
              {/* Project Image */}
              <div className="aspect-video bg-gradient-to-br from-win-blue/20 to-win-blue-light/20 relative overflow-hidden">
                <img
                  src={getProjectImage(index)}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Project Info */}
              <div className="p-4 space-y-3">
                <h3 className="text-lg font-bold text-text-primary group-hover:text-win-blue transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-text-secondary line-clamp-2">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-2 pt-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 bg-win-blue text-white rounded-lg hover:bg-win-blue-dark transition-colors text-xs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-3 h-3" />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-lg hover:bg-muted/50 transition-colors text-xs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-3 h-3" />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
