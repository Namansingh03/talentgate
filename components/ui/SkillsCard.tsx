import { SKILLS } from "@/utils/values";
import { cn } from "@/lib/utils";

export const SkillsCard = ({
  selectedSkills,
  setSelectedSkills,
}: {
  selectedSkills: string[];
  setSelectedSkills: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div>
        <h2 className="text-lg font-serif font-medium tracking-tight">
          Select your skills
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Choose all that apply
        </p>
      </div>

      <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto pr-1">
        {SKILLS.map((skill) => (
          <button
            key={skill}
            type="button"
            onClick={() => toggleSkill(skill)}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-sm border transition-colors",
              selectedSkills.includes(skill)
                ? "bg-foreground text-background border-foreground"
                : "bg-white border-stone-200 text-muted-foreground hover:border-stone-400 hover:text-foreground",
            )}
          >
            {skill}
          </button>
        ))}
      </div>

      {selectedSkills.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {selectedSkills.length} skill{selectedSkills.length !== 1 ? "s" : ""}{" "}
          selected
        </p>
      )}
    </div>
  );
};
