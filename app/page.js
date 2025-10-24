"use client";
import MyNav from "@/components/MyNav";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-[#FAF8F5]">
      <MyNav />
      
      {/* Hero Section - Split Design Inspired by Reference */}
      <section className="relative min-h-[600px] md:min-h-[700px] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="temple-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <text x="50" y="50" fontSize="40" fill="#2D5F4C" textAnchor="middle" fontFamily="serif">ॐ</text>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#temple-pattern)" />
          </svg>
        </div>

        <div className="relative grid md:grid-cols-2 min-h-[600px] md:min-h-[700px]">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center px-6 md:px-12 lg:px-20 py-20 bg-white/80"
          >
            <div className="max-w-xl">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-spiritual-gold text-sm font-semibold tracking-wider uppercase mb-4 block"
              >
                Divine Abode of Prosperity
              </motion.span>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#5A3825] leading-tight">
                KuberJi<br />
                <span className="text-spiritual-gold">Mandir</span>
              </h1>
              
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                Experience the divine presence of Lord Kuber, the celestial treasurer. 
                This sacred temple in Pandukeshwar welcomes devotees seeking blessings 
                of wealth and spiritual prosperity.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/aarti-pooja">
                  <button className="bg-gradient-to-r from-[#C97A3C] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#C97A3C] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                    Book Aarti & Pooja
                  </button>
                </Link>
                <Link href="/howtoreachus">
                  <button className="border-2 border-[#C97A3C] text-[#C97A3C] hover:bg-[#C97A3C] hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300">
                    Plan Your Visit
                  </button>
                </Link>
                <Link href="/about">
                  <button className="border-2 border-spiritual-green text-spiritual-green hover:bg-spiritual-green hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative min-h-[400px] md:min-h-full"
          >
            <Image
              src="/images/kuberji/kuberji1.jpeg"
              alt="KuberJi Mandir"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/20" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section with Decorative Background */}
      <section className="py-16 bg-[#C97A3C] text-white relative overflow-hidden">
        {/* Decorative Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/kalas-high.jpg"
            alt="Pattern"
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "1000+", label: "Years of Heritage" },
              { number: "365", label: "Days of Prayer" },
              { number: "50+", label: "Annual Events" },
              { number: "∞", label: "Blessings" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm md:text-base opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Minimal */}
      <section className="py-20 px-4 max-w-6xl mx-auto bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="relative h-[400px] md:h-[500px] rounded overflow-hidden shadow-xl order-2 md:order-1">
            <Image
              src="/images/milkbath2.jpeg"
              alt="Temple Ceremony"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          <div className="order-1 md:order-2">
            <span className="text-[#C97A3C] text-sm font-semibold tracking-wider uppercase mb-3 block">
              Sacred Heritage
            </span>
            <h2 className="text-4xl font-bold text-[#5A3825] mb-6 leading-tight">
              The Divine Treasury of Lord Kuber
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Lord Shri Badrinath&apos;s treasurer, Shri Kuber Bhandari, the treasurer of the gods, 
              resides in this divine Kuber temple in Pandukeshwar during winters.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Located near Yog Badri, one of the Panch Badri, this sacred temple sits at 
              the base of the Balkunwar peak at an altitude of 4,600 meters.
            </p>
            <Link href="/about">
              <button className="bg-[#C97A3C] hover:bg-[#B5682B] text-white px-6 py-3 rounded font-semibold transition-all duration-300">
                Discover More
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-spiritual-green mb-4 font-quicksand">
              Temple Gallery
            </h2>
            <p className="text-gray-600 text-lg">
              Explore the divine beauty of KuberJi Mandir
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              "/images/temple/temple-top-2.jpeg",
              "/images/kuberji/kuber-chowk-3.jpeg",
              "/images/milkbath2.jpeg",
              "/images/carryin2.jpeg",
            ].map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative h-64 rounded-lg overflow-hidden group cursor-pointer"
              >
                <Image
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/media">
              <button className="border-2 border-spiritual-gold text-spiritual-gold hover:bg-spiritual-gold hover:text-white px-8 py-3 rounded font-semibold transition-all duration-300">
                View Full Gallery
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section - Full Width Images */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#C97A3C] text-sm font-semibold tracking-wider uppercase mb-3 block">
              What We Offer
            </span>
            <h2 className="text-4xl font-bold text-[#5A3825] mb-4">
              Temple Services
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Participate in sacred rituals and receive divine blessings
            </p>
          </motion.div>
        
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Daily Rituals",
                desc: "Morning and evening aarti with sacred chants",
                img: "/images/sitting.jpeg",
              },
              {
                title: "Abhishekam",
                desc: "Sacred bath ceremony for Lord Kuber",
                img: "/images/milkbath2.jpeg",
              },
              {
                title: "Prasad Seva",
                desc: "Distribution of blessed offerings",
                img: "/images/carryin2.jpeg",
              },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-spiritual-green mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Width Image Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src="/images/carrying.jpeg"
          alt="Temple Devotees"
          fill
          className="object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-white max-w-3xl"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join Our Sacred Community
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Experience divine blessings and spiritual growth
            </p>
          </motion.div>
        </div>
      </section>

      {/* Donation CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-[#C97A3C] text-sm font-semibold tracking-wider uppercase mb-3 block">
              Make a Difference
            </span>
            <h2 className="text-4xl font-bold mb-6 text-[#5A3825]">
              Support Our Temple
            </h2>
            <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Your generous donations help us maintain the temple, conduct sacred ceremonies, 
              and serve our devotees with love and devotion.
            </p>
            <button className="bg-[#C97A3C] hover:bg-[#B5682B] text-white px-10 py-4 rounded text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
              Make a Donation
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
