"use client";

import Navigation from "../../components/Navigation";
import Link from "next/link";

export default function ImpactStoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50">
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-[#143f3f] mb-8 text-center">Impact Stories</h1>
        <p className="text-lg text-gray-700 mb-12 text-center max-w-2xl mx-auto">
          Real stories from hospitals and donors whose lives have been changed through Hopely. Every donation creates a ripple of hope and healing across Sri Lanka.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Example stories - replace with dynamic content as needed */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-amber-400">
            <h2 className="text-2xl font-semibold text-[#143f3f] mb-2">A New Lease on Life</h2>
            <p className="text-gray-700 mb-4">"Thanks to the generosity of Hopely donors, our hospital was able to purchase life-saving medicine for children in critical need. We are forever grateful."</p>
            <div className="text-sm text-gray-500">- Dr. Perera, Colombo General Hospital</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-amber-400">
            <h2 className="text-2xl font-semibold text-[#143f3f] mb-2">Donor's Joy</h2>
            <p className="text-gray-700 mb-4">"Giving through Hopely was simple and transparent. Knowing my donation directly helped a hospital in need made it truly meaningful."</p>
            <div className="text-sm text-gray-500">- Anjali, Donor</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-amber-400">
            <h2 className="text-2xl font-semibold text-[#143f3f] mb-2">Rapid Response</h2>
            <p className="text-gray-700 mb-4">"When a medicine shortage hit, Hopely's platform connected us with donors in hours. The support was immediate and impactful."</p>
            <div className="text-sm text-gray-500">- Dr. Silva, Kandy Hospital</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-amber-400">
            <h2 className="text-2xl font-semibold text-[#143f3f] mb-2">Hope Restored</h2>
            <p className="text-gray-700 mb-4">"We thought we had no options left. Hopely brought hope and help when we needed it most."</p>
            <div className="text-sm text-gray-500">- Saman, Patient Family</div>
          </div>
        </div>
        <div className="text-center mt-12">
          <Link href="/donation" className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-[#143f3f] rounded-full font-bold shadow-lg hover:scale-105 transition-transform">Donate Now</Link>
        </div>
      </main>
    </div>
  );
}
