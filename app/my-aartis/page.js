'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { isAuthenticated, getSession } from '@/lib/auth';
import { getUserPurchases } from '@/lib/aarti-data';

export default function MyAartisPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/auth/login');
      return;
    }

    const currentUser = getSession();
    setUser(currentUser);
    
    // Load user's purchases
    const userPurchases = getUserPurchases(currentUser.id);
    setPurchases(userPurchases);
  }, [router]);

  const handleWatchVideo = (service) => {
    setSelectedVideo(service);
    setShowVideoModal(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-[#5A3825]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1EB] via-[#FFF5E6] to-[#F5F1EB]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3D2817] to-[#5A3825] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#C97A3C] text-4xl mb-4">
              ॐ
            </div>
            <h1 className="text-5xl font-bold mb-4">My Aartis</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Welcome, {user.name}! Access your booked ceremonies and live streams
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {purchases.length === 0 ? (
          // Empty State
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white shadow-xl mb-6">
              <svg className="w-16 h-16 text-[#C97A3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-[#3D2817] mb-4">
              No Aartis Booked Yet
            </h2>
            <p className="text-[#5A3825] mb-8 max-w-md mx-auto">
              Start your spiritual journey by booking your first Aarti or Pooja ceremony
            </p>
            <Link
              href="/aarti-pooja"
              className="inline-block bg-gradient-to-r from-[#C97A3C] to-[#D4AF37] text-white px-8 py-4 rounded-xl font-semibold hover:from-[#D4AF37] hover:to-[#C97A3C] transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Browse Services
            </Link>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#C97A3C]/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#5A3825] text-sm mb-1">Total Bookings</p>
                    <p className="text-4xl font-bold text-[#3D2817]">{purchases.length}</p>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-[#C97A3C] to-[#D4AF37] rounded-full flex items-center justify-center text-white text-2xl">
                    ॐ
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#C97A3C]/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#5A3825] text-sm mb-1">Videos Available</p>
                    <p className="text-4xl font-bold text-[#3D2817]">{purchases.length}</p>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2D5F4C] to-[#3D7A62] rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#C97A3C]/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#5A3825] text-sm mb-1">Last Booking</p>
                    <p className="text-lg font-bold text-[#3D2817]">
                      {formatDate(purchases[purchases.length - 1].purchaseDate).split(' ').slice(0, 2).join(' ')}
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#C97A3C] rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Purchases Grid */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#3D2817] mb-6">Your Booked Ceremonies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {purchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#C97A3C]/10"
                  >
                    <div className="relative h-56">
                      <Image
                        src={purchase.service.image}
                        alt={purchase.service.title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.target.src = '/images/temple/default.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white text-xl font-bold mb-1">
                          {purchase.service.title}
                        </h3>
                        <p className="text-white/80 text-sm">
                          Booked on {formatDate(purchase.purchaseDate)}
                        </p>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold text-[#5A3825] bg-[#F5F1EB] px-3 py-1 rounded-full">
                          {purchase.service.category}
                        </span>
                        <span className="text-lg font-bold text-[#C97A3C]">
                          ₹{purchase.service.price}
                        </span>
                      </div>

                      <button
                        onClick={() => handleWatchVideo(purchase.service)}
                        className="w-full bg-gradient-to-r from-[#C97A3C] to-[#D4AF37] text-white py-3 rounded-xl font-semibold hover:from-[#D4AF37] hover:to-[#C97A3C] transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                        Watch Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA to browse more */}
            <div className="text-center bg-white rounded-3xl p-8 shadow-xl border border-[#C97A3C]/10">
              <h3 className="text-2xl font-bold text-[#3D2817] mb-4">
                Explore More Sacred Ceremonies
              </h3>
              <p className="text-[#5A3825] mb-6">
                Continue your spiritual journey with our diverse range of Aarti and Pooja services
              </p>
              <Link
                href="/aarti-pooja"
                className="inline-block bg-gradient-to-r from-[#C97A3C] to-[#D4AF37] text-white px-8 py-3 rounded-xl font-semibold hover:from-[#D4AF37] hover:to-[#C97A3C] transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Browse More Services
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Video Modal */}
      {showVideoModal && selectedVideo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black rounded-3xl max-w-5xl w-full shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#3D2817] to-[#5A3825] p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {selectedVideo.title}
                </h2>
                <p className="text-white/80 text-sm">{selectedVideo.category}</p>
              </div>
              <button
                onClick={() => {
                  setShowVideoModal(false);
                  setSelectedVideo(null);
                }}
                className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-colors text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="relative aspect-video bg-black">
              <video
                controls
                autoPlay
                className="w-full h-full"
                poster={selectedVideo.image}
              >
                <source src={selectedVideo.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="bg-gradient-to-r from-[#3D2817] to-[#5A3825] p-6">
              <p className="text-white/90 text-sm">
                {selectedVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
