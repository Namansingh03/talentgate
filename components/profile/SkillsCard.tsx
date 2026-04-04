// "use client";

// export default function SkillsCard() {
//   const dummySkills = [
//     "React",
//     "Next.js",
//     "TypeScript",
//     "Tailwind CSS",
//     "Node.js",
//   ];

//   const [skills, setSkills] = useState<string[]>(dummySkills);

//   return (
//     <div className="bg-white border border-gray-100 rounded-2xl p-5">
//       <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">
//         Skills
//       </p>

//       <div className="flex flex-wrap gap-2 mb-3">
//         {skills.map((skill) => (
//           <span
//             key={skill}
//             className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 text-gray-600"
//           >
//             {skill}
//             {isOwner && (
//               <button
//                 onClick={() => handleRemove(skill)}
//                 disabled={isPending}
//                 className="text-gray-300 hover:text-gray-500 ml-0.5"
//               >
//                 ×
//               </button>
//             )}
//           </span>
//         ))}
//       </div>

//       <div className="flex gap-2">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder="Add a skill..."
//           className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none"
//         />
//         <button
//           onClick={handleAdd}
//           disabled={isPending || !input.trim()}
//           className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40"
//         >
//           Add
//         </button>
//       </div>

//       {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
//     </div>
//   );
// }

"use client";

export default function SkillsCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">
        Skills
      </p>

      {/* Skills List */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-xs px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 text-gray-600">
          React
        </span>
        <span className="text-xs px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 text-gray-600">
          Next.js
        </span>
        <span className="text-xs px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 text-gray-600">
          TypeScript
        </span>
        <span className="text-xs px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 text-gray-600">
          Tailwind CSS
        </span>
        <span className="text-xs px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 text-gray-600">
          Node.js
        </span>
      </div>

      {/* Static Input UI (for design only) */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add a skill..."
          className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none"
        />
        <button className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600">
          Add
        </button>
      </div>
    </div>
  );
}
