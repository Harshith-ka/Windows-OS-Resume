import { resumeData } from "@/lib/resumeData";
import { Building2, MapPin, Calendar, CheckCircle2 } from "lucide-react";

export const ExperienceSection = () => {
  const { experience } = resumeData;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-text-primary mb-6">Work Experience</h1>

      <div className="relative space-y-6">
        {/* Timeline Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-win-blue to-win-blue-light hidden md:block" />

        {experience.map((exp, index) => (
          <div key={index} className="glass p-6 rounded-lg relative md:ml-12">
            {/* Timeline Dot */}
            <div className="absolute left-[-2.5rem] top-6 w-5 h-5 bg-win-blue rounded-full border-4 border-window hidden md:block" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div>
                <h2 className="text-xl font-bold text-text-primary mb-1">{exp.position}</h2>
                <div className="flex items-center gap-2 text-win-blue font-semibold mb-2">
                  <Building2 className="w-4 h-4" />
                  <span>{exp.company}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{exp.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{exp.location}</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="space-y-2">
              {exp.achievements.map((achievement, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-text-secondary leading-relaxed">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
