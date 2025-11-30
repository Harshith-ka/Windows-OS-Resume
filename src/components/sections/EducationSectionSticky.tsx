import { resumeData } from "@/lib/resumeData";
import { GraduationCap, Calendar } from "lucide-react";

const stickyColors = [
  "bg-[#FFF740] text-black",
  "bg-[#FF6B9D] text-white",
  "bg-[#C1E1C1] text-black",
  "bg-[#87CEEB] text-black",
];

export const EducationSectionSticky = () => {
  const { education } = resumeData;

  return (
    <div className="h-full p-8 bg-gradient-to-br from-muted/30 to-muted/10">
      <h1 className="text-3xl font-bold text-text-primary mb-8 flex items-center gap-3">
        <GraduationCap className="w-8 h-8 text-win-blue" />
        Education
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((edu, index) => (
          <div
            key={index}
            className={`${stickyColors[index % stickyColors.length]} p-6 rounded-lg shadow-lg rotate-[-2deg] hover:rotate-0 transition-transform cursor-pointer`}
            style={{
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Pin at top */}
            <div className="flex justify-center mb-4">
              <div className="w-6 h-6 rounded-full bg-black/20 shadow-inner" />
            </div>

            <div className="space-y-3 font-handwriting">
              <h2 className="text-xl font-bold">{edu.degree}</h2>
              <p className="text-lg font-semibold opacity-90">{edu.field}</p>
              <p className="text-base font-medium opacity-80">{edu.institution}</p>

              <div className="flex items-center gap-2 text-sm opacity-70 pt-2">
                <Calendar className="w-4 h-4" />
                <span>{edu.duration}</span>
              </div>

              {edu.gpa && (
                <div className="pt-2 border-t border-current/20">
                  <p className="text-sm font-medium">GPA: {edu.gpa}</p>
                </div>
              )}
            </div>

            {/* Paper lines effect */}
            <div className="mt-4 space-y-2 opacity-20">
              <div className="h-px bg-current" />
              <div className="h-px bg-current" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
