import ProfileHeader from "@/components/profile/ProfileHeader";
import ContactCard from "@/components/profile/ContactCard";
import AboutCard from "@/components/profile/AboutCard";
import SkillsCard from "@/components/profile/SkillsCard";
import ExperienceCard from "@/components/profile/ExperienceCard";
import EducationCard from "@/components/profile/EducationCard";

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
      <ProfileHeader />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ContactCard />

        <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-center text-sm text-gray-400">
          Profile completion
        </div>
      </div>

      <AboutCard />

      <SkillsCard />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ExperienceCard />
        <EducationCard />
      </div>
    </div>
  );
}
