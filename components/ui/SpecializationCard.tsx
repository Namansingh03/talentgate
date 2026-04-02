import { SPECIALIZATIONS } from "@/utils/values";
import { cn } from "@/lib/utils";

export const SpecializationCard = ({
  selected,
  setSelected,
}: {
  selected: string | null;
  setSelected: (val: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div>
        <h2 className="text-lg font-serif font-medium tracking-tight">
          What defines you best
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Pick the role that fits you most
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {SPECIALIZATIONS.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setSelected(name)}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-sm border transition-colors",
              selected === name
                ? "bg-foreground text-background border-foreground"
                : "bg-white border-stone-200 text-muted-foreground hover:border-stone-400 hover:text-foreground",
            )}
          >
            {name}
          </button>
        ))}
      </div>

      {selected && (
        <p className="text-xs text-muted-foreground">
          Selected:{" "}
          <span className="text-foreground font-medium">{selected}</span>
        </p>
      )}
    </div>
  );
};
