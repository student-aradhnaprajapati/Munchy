import React from "react";

function Providers() {
  const providers = ["Provider1", "Provider2"];
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-6">All Providers</h1>
      <ul className="space-y-2">
        {providers.map((provider, idx) => (
          <li key={idx} className="p-3 bg-white shadow rounded">{provider}</li>
        ))}
      </ul>
    </div>
  );
}

export default Providers;
