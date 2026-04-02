const features = [
  {
    title: "Candidate profiles",
    description:
      "Showcase your skills, experience, resume, and portfolio in a clean public profile employers can browse.",
    color: "bg-blue-50 dark:bg-blue-900/30",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect
          x="2"
          y="5"
          width="14"
          height="10"
          rx="2"
          stroke="#378ADD"
          strokeWidth="1.2"
        />
        <path d="M6 5V4a3 3 0 016 0v1" stroke="#378ADD" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    title: "Smart job filters",
    description:
      "Filter by role, location, salary, remote, experience level, and tech stack to find exactly the right fit.",
    color: "bg-green-50 dark:bg-green-900/30",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="6.5" stroke="#1D9E75" strokeWidth="1.2" />
        <path
          d="M6 9l2.5 2.5L12 6"
          stroke="#1D9E75"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Application tracking",
    description:
      "Candidates track every application. Employers manage applicants and update statuses with internal notes.",
    color: "bg-pink-50 dark:bg-pink-900/30",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M9 2.5l1.8 3.6 4 .6-2.9 2.8.7 4L9 11.5l-3.6 1.9.7-4L3.2 6.7l4-.6z"
          stroke="#993556"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Company pages",
    description:
      "Employers get a verified company page showing their open roles, team size, industry, and description.",
    color: "bg-amber-50 dark:bg-amber-900/30",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect
          x="2"
          y="2"
          width="6"
          height="6"
          rx="1.5"
          stroke="#BA7517"
          strokeWidth="1.2"
        />
        <rect
          x="10"
          y="2"
          width="6"
          height="6"
          rx="1.5"
          stroke="#BA7517"
          strokeWidth="1.2"
        />
        <rect
          x="2"
          y="10"
          width="6"
          height="6"
          rx="1.5"
          stroke="#BA7517"
          strokeWidth="1.2"
        />
        <rect
          x="10"
          y="10"
          width="6"
          height="6"
          rx="1.5"
          stroke="#BA7517"
          strokeWidth="1.2"
        />
      </svg>
    ),
  },
  {
    title: "OAuth login",
    description:
      "Sign up with Google or GitHub in seconds. No forms, no friction — just start applying or posting.",
    color: "bg-purple-50 dark:bg-purple-900/30",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="6.5" stroke="#534AB7" strokeWidth="1.2" />
        <path
          d="M9 6v3l2 2"
          stroke="#534AB7"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Role-based access",
    description:
      "Three roles — Candidate, Employer, Admin — each with their own dashboard and permissions.",
    color: "bg-gray-100 dark:bg-gray-800",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M3 5h12M3 9h8M3 13h5"
          stroke="#5F5E5A"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
            Features
          </p>
          <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
            Everything you need to hire or get hired
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md">
            Built for developers and the companies that want to hire them.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 transition-colors"
            >
              <div
                className={`w-9 h-9 rounded-xl ${f.color} flex items-center justify-center mb-3`}
              >
                {f.icon}
              </div>

              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1.5">
                {f.title}
              </h3>

              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
