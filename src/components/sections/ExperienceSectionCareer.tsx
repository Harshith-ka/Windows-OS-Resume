import { resumeData } from "@/lib/resumeData";
import { Building2, MapPin, Calendar, Award, TrendingUp, Users, Target } from "lucide-react";
import { motion } from "framer-motion";

export const ExperienceSectionCareer = () => {
  const { experience } = resumeData;

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-win-blue/10 rounded-lg">
          <TrendingUp className="w-6 h-6 text-win-blue" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Career Journey</h1>
          <p className="text-sm text-text-secondary">Professional experience & achievements</p>
        </div>
      </div>

      <div className="grid gap-6">
        {experience.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative glass-strong rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-border/50"
          >
            {/* Timeline Badge */}
            <div className="absolute -left-3 top-8 w-6 h-6 bg-win-blue rounded-full border-4 border-background shadow-lg" />
            
            {/* Company Header Card */}
            <div className="glass rounded-lg p-4 mb-4 bg-gradient-to-r from-win-blue/5 to-win-blue-light/5 border border-win-blue/20">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-win-blue/10 rounded-lg">
                    <Building2 className="w-6 h-6 text-win-blue" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-text-primary mb-1">{exp.position}</h2>
                    <div className="flex items-center gap-2 text-win-blue font-semibold">
                      <span>{exp.company}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 lg:items-end">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">{exp.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <MapPin className="w-4 h-4" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-amber-500" />
                <h3 className="font-semibold text-text-primary">Key Achievements</h3>
              </div>
              
              <div className="grid gap-3">
                {exp.achievements.map((achievement, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + idx * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors group"
                  >
                    <div className="p-1.5 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-md mt-0.5 group-hover:scale-110 transition-transform">
                      <Target className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed flex-1">
                      {achievement}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats Footer */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <Users className="w-4 h-4 text-win-blue" />
                <span>Team Collaboration</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <Award className="w-4 h-4 text-amber-500" />
                <span>{exp.achievements.length} Achievements</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Career Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: experience.length * 0.1 }}
        className="glass rounded-xl p-6 border border-win-blue/30 bg-gradient-to-br from-win-blue/5 to-transparent"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-win-blue/10 rounded-lg">
            <TrendingUp className="w-5 h-5 text-win-blue" />
          </div>
          <h3 className="font-bold text-text-primary">Career Snapshot</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <div className="text-2xl font-bold text-win-blue">{experience.length}</div>
            <div className="text-xs text-text-secondary mt-1">Companies</div>
          </div>
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <div className="text-2xl font-bold text-green-500">
              {experience.reduce((acc, exp) => acc + exp.achievements.length, 0)}
            </div>
            <div className="text-xs text-text-secondary mt-1">Achievements</div>
          </div>
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <div className="text-2xl font-bold text-amber-500">5+</div>
            <div className="text-xs text-text-secondary mt-1">Years</div>
          </div>
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <div className="text-2xl font-bold text-purple-500">10+</div>
            <div className="text-xs text-text-secondary mt-1">Projects</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};