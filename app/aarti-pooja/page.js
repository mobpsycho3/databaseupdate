'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { isAuthenticated, getSession } from '@/lib/auth';
import { AARTI_SERVICES, CATEGORIES, savePurchase } from '@/lib/aarti-data';

export default function AartiPoojaPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All Services');
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/auth/login');
      return;
    }
    setUser(getSession());
  }, [router]);

  const filteredServices = selectedCategory === 'All Services'
    ? AARTI_SERVICES
    : AARTI_SERVICES.filter(service => service.category === selectedCategory);

  const handleBookNow = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleConfirmBooking = () => {
    if (user && selectedService) {
      savePurchase(user.id, selectedService);
      setShowModal(false);
      setShowConfirmation(true);
      
      // Hide confirmation after 3 seconds
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
    }
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
            <h1 className="text-5xl font-bold mb-4">Aarti & Pooja Services</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Book sacred rituals and ceremonies for divine blessings and spiritual prosperity
            </p>
          </div>
        </div>
      </div>

      {/* Success Confirmation */}
      {showConfirmation && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in">
          <div className="bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">Booking Confirmed!</p>
              <p className="text-sm">Check "My Aartis" to view</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[#C97A3C] to-[#D4AF37] text-white shadow-lg'
                    : 'bg-white text-[#5A3825] hover:bg-[#C97A3C]/10 border-2 border-[#C97A3C]/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#C97A3C]/10"
            >
              <div className="relative h-64">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.target.src = '/images/temple/default.jpg';
                  }}
                />
                <div className="absolute top-4 right-4 bg-[#C97A3C] text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  ₹{service.price}
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-[#5A3825]">
                  {service.category}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#3D2817] mb-2">
                  {service.title}
                </h3>
                <p className="text-[#5A3825] mb-4 line-clamp-2">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-[#5A3825] mb-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {service.duration}
                  </div>
                  <div className="text-[#C97A3C] font-semibold">
                    {service.timing}
                  </div>
                </div>

                <button
                  onClick={() => handleBookNow(service)}
                  className="w-full bg-gradient-to-r from-[#C97A3C] to-[#D4AF37] text-white py-3 rounded-xl font-semibold hover:from-[#D4AF37] hover:to-[#C97A3C] transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && selectedService && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="relative h-64">
              <Image
                src={selectedService.image}
                alt={selectedService.title}
                fill
                className="object-cover rounded-t-3xl"
                onError={(e) => {
                  e.target.src = '/images/temple/default.jpg';
                }}
              />
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-[#3D2817]">
                  {selectedService.title}
                </h2>
                <div className="text-3xl font-bold text-[#C97A3C]">
                  ₹{selectedService.price}
                </div>
              </div>

              <p className="text-[#5A3825] mb-6">
                {selectedService.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#F5F1EB] p-4 rounded-xl">
                  <div className="text-sm text-[#5A3825] mb-1">Duration</div>
                  <div className="font-semibold text-[#3D2817]">{selectedService.duration}</div>
                </div>
                <div className="bg-[#F5F1EB] p-4 rounded-xl">
                  <div className="text-sm text-[#5A3825] mb-1">Timing</div>
                  <div className="font-semibold text-[#3D2817]">{selectedService.timing}</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-[#3D2817] mb-3">Spiritual Benefits:</h3>
                <ul className="space-y-2">
                  {selectedService.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-[#C97A3C] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[#5A3825]">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-[#3D2817] py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="flex-1 bg-gradient-to-r from-[#C97A3C] to-[#D4AF37] text-white py-3 rounded-xl font-semibold hover:from-[#D4AF37] hover:to-[#C97A3C] transition-all duration-300 shadow-lg"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
