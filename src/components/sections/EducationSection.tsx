import { resumeData } from "@/lib/resumeData";
import { GraduationCap, Calendar, Award } from "lucide-react";

export const EducationSection = () => {
  const { education } = resumeData;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-text-primary mb-6">Education</h1>

      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="glass p-6 rounded-lg">
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-win-blue/10 flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-win-blue" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-text-primary mb-1">{edu.degree}</h2>
                <p className="text-win-blue font-semibold mb-2">{edu.institution}</p>
                <p className="text-sm text-text-secondary">{edu.field}</p>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Calendar className="w-4 h-4" />
                <span>{edu.duration}</span>
              </div>
              {edu.gpa && (
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Award className="w-4 h-4" />
                  <span>GPA: {edu.gpa}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
