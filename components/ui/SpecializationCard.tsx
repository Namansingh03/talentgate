import { SPECIALIZATIONS } from "@/schemas/values";
import { Button } from "./button";

export const SpecializationCard = ({
  selected,
  setSelected,
}: {
  selected: string | null;
  setSelected: (val: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-4 w-full ">
      <h2 className="text-lg font-semibold">What defines you best</h2>

      <div className="flex flex-wrap gap-2">
        {SPECIALIZATIONS.map((name) => (
          <Button
            key={name}
            variant={selected === name ? "default" : "outline"}
            onClick={() => setSelected(name)}
          >
            {name}
          </Button>
        ))}
      </div>

      <p>{selected ?? "None selected"}</p>
    </div>
  );
};
