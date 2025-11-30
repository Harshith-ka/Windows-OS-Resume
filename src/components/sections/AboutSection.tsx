import { resumeData } from "@/lib/resumeData";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";

export const AboutSection = () => {
  const { personal } = resumeData;

  return (
    <div className="p-6 space-y-6">
      {/* Header with Avatar */}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <img
          src={personal.avatar}
          alt={personal.name}
          className="w-32 h-32 rounded-full border-4 border-win-blue shadow-lg"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold text-text-primary mb-2">{personal.name}</h1>
          <p className="text-xl text-win-blue font-medium mb-4">{personal.title}</p>
        </div>
      </div>

      {/* Bio */}
      <div className="glass-strong p-6 rounded-lg">
        <h2 className="text-lg font-semibold text-text-primary mb-3">About Me</h2>
        <p className="text-text-secondary leading-relaxed">{personal.bio}</p>
      </div>

      {/* Contact Info */}
      <div className="glass p-6 rounded-lg">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-win-blue/10">
              <Mail className="w-5 h-5 text-win-blue" />
            </div>
            <div>
              <p className="text-xs text-text-muted">Email</p>
              <a href={`mailto:${personal.email}`} className="text-sm text-win-blue hover:underline">
                {personal.email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-win-blue/10">
              <Phone className="w-5 h-5 text-win-blue" />
            </div>
            <div>
              <p className="text-xs text-text-muted">Phone</p>
              <a href={`tel:${personal.phone}`} className="text-sm text-win-blue hover:underline">
                {personal.phone}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-win-blue/10">
              <MapPin className="w-5 h-5 text-win-blue" />
            </div>
            <div>
              <p className="text-xs text-text-muted">Location</p>
              <p className="text-sm text-text-primary">{personal.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-win-blue/10">
              <Linkedin className="w-5 h-5 text-win-blue" />
            </div>
            <div>
              <p className="text-xs text-text-muted">LinkedIn</p>
              <a
                href={`https://${personal.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-win-blue hover:underline"
              >
                Profile
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-win-blue/10">
              <Github className="w-5 h-5 text-win-blue" />
            </div>
            <div>
              <p className="text-xs text-text-muted">GitHub</p>
              <a
                href={`https://${personal.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-win-blue hover:underline"
              >
                @{personal.github.split('/').pop()}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
