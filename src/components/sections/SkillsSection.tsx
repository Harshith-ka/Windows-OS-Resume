import { resumeData } from "@/lib/resumeData";

export const SkillsSection = () => {
  const { skills } = resumeData;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-text-primary mb-6">Technical Skills</h1>

      {skills.map((category) => (
        <div key={category.category} className="glass p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-text-primary mb-4">{category.category}</h2>
          <div className="space-y-4">
            {category.items.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text-primary">{skill.name}</span>
                  <span className="text-sm text-win-blue font-semibold">{skill.level}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-win-blue to-win-blue-light transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Additional Skills as Tags */}
      <div className="glass p-6 rounded-lg">
        <h2 className="text-lg font-semibold text-text-primary mb-4">All Technologies</h2>
        <div className="flex flex-wrap gap-2">
          {skills.flatMap((category) =>
            category.items.map((skill) => (
              <span
                key={skill.name}
                className="px-3 py-1.5 bg-win-blue/10 text-win-blue text-sm font-medium rounded-full border border-win-blue/20 hover:bg-win-blue/20 transition-colors"
              >
                {skill.name}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
