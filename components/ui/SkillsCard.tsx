import { SKILLS } from "@/schemas/values";
import { Button } from "./button";

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
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-lg font-semibold">Select your skills</h2>

      <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
        {SKILLS.map((skill) => (
          <Button
            key={skill}
            variant={selectedSkills.includes(skill) ? "default" : "outline"}
            onClick={() => toggleSkill(skill)}
          >
            {skill}
          </Button>
        ))}
      </div>
    </div>
  );
};
