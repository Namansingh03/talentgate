"use client";

export default function ContactCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">
        Contact
      </p>

      {/* Email */}
      <div className="flex justify-between items-center py-2 border-b border-gray-50 text-sm">
        <span className="text-gray-400">Email</span>
        <a
          href="mailto:johndoe@example.com"
          className="text-blue-500 hover:text-blue-600 truncate max-w-45 text-right"
        >
          johndoe@example.com
        </a>
      </div>

      {/* Location */}
      <div className="flex justify-between items-center py-2 border-b border-gray-50 text-sm">
        <span className="text-gray-400">Location</span>
        <span className="text-gray-700 truncate max-w-45 text-right">
          New York, USA
        </span>
      </div>

      {/* Portfolio */}
      <div className="flex justify-between items-center py-2 border-b border-gray-50 text-sm">
        <span className="text-gray-400">Portfolio</span>
        <a
          href="https://johndoe.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 truncate max-w-45 text-right"
        >
          johndoe.dev
        </a>
      </div>

      {/* LinkedIn */}
      <div className="flex justify-between items-center py-2 border-b border-gray-50 text-sm">
        <span className="text-gray-400">LinkedIn</span>
        <a
          href="https://linkedin.com/in/johndoe"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 truncate max-w-45 text-right"
        >
          linkedin.com/in/johndoe
        </a>
      </div>

      {/* GitHub */}
      <div className="flex justify-between items-center py-2 border-b border-gray-50 text-sm">
        <span className="text-gray-400">GitHub</span>
        <a
          href="https://github.com/johndoe"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 truncate max-w-45 text-right"
        >
          github.com/johndoe
        </a>
      </div>

      {/* Resume */}
      <div className="flex justify-between items-center py-2 text-sm">
        <span className="text-gray-400">Resume</span>
        <a
          href="/resume.pdf"
          download
          className="text-blue-500 hover:text-blue-600 truncate max-w-45 text-right"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}
