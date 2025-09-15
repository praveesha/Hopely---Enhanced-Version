"use client";

import Navigation from "../../components/Navigation";

export default function ImpactStoresPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50">
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-[#143f3f] mb-8 text-center">Impact Stores</h1>
        <p className="text-lg text-gray-700 mb-12 text-center max-w-2xl mx-auto">
          Discover how Hopely is making a difference in communities through our partner stores and initiatives.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-amber-400">
            <h2 className="text-2xl font-semibold text-[#143f3f] mb-2">Colombo Medical Supplies</h2>
            <p className="text-gray-700 mb-4">Partnered with Hopely to deliver essential medicines to rural hospitals, impacting over 2,000 lives in 2025.</p>
            <div className="text-sm text-gray-500">Colombo, Sri Lanka</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-amber-400">
            <h2 className="text-2xl font-semibold text-[#143f3f] mb-2">Hope Pharmacy</h2>
            <p className="text-gray-700 mb-4">A key distribution partner ensuring timely delivery of critical medicines to shortage areas.</p>
            <div className="text-sm text-gray-500">Kandy, Sri Lanka</div>
          </div>
        </div>
      </main>
    </div>
  );
}
