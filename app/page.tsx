import React from 'react';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="max-w-3xl w-full bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-4">
          TypeScript Learning Notes
        </h1>
        <p className="text-gray-300 text-lg mb-6">
          Next.js app setup based on the rocksprot-reh folder structure is ready.
        </p>
        
        <div className="p-4 bg-gray-900 rounded-lg border border-gray-700 font-mono text-sm text-green-400">
          &gt; TypeScript + Tailwind v4 in Next.js is working perfectly! 🚀
        </div>
      </div>
    </div>
  );
}
