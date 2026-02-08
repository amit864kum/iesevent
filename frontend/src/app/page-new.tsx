'use client';

/**
 * Home Page - Landing Page
 * Enhanced design with better visual hierarchy and spacing
 * Hero, Services Preview, Gallery Preview, Testimonials, CTA
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Sparkles, Calendar, Users, Award, Zap, Heart, Eye, Gem } from 'lucide-react';
import { getGalleryImages, getTestimonials, GalleryImage, Testimonial } from '@/lib/api';

// Services data
const services = [
  {
    icon: Calendar,
    title: 'Wedding Planning',
    description: 'Craft your perfect day with attention to every detail.',
    color: 'from-pink-500/20 to-transparent',
  },
  {
    icon: Users,
    title: 'Corporate Events',
    description: 'Impress clients and elevate your brand presence.',
    color: 'from-blue-500/20 to-transparent',
  },
  {
    icon: Award,
    title: 'Private Celebrations',
    description: 'Celebrate milestones in unforgettable style.',
    color: 'from-purple-500/20 to-transparent',
  },
  {
    icon: Sparkles,
    title: 'Bespoke Experiences',
    description: 'Unique, tailor-made events designed for you.',
    color: 'from-gold/20 to-transparent',
  },
];

// Stats data
const stats = [
  { value: '500+', label: 'Events Created', icon: Sparkles },
  { value: '98%', label: 'Client Satisfaction', icon: Star },
  { value: '15+', label: 'Years Excellence', icon: Award },
  { value: '50+', label: 'Expert Team', icon: Users },
];

// Why choose us
const whyChooseUs = [
  {
    icon: Zap,
    title: 'Expert Planning',
    description: 'Experienced professionals who understand your vision.',
  },
  {
    icon: Heart,
    title: 'Passionate Service',
    description: 'We care deeply about making your event perfect.',
  },
  {
    icon: Eye,
    title: 'Attention to Detail',
    description: 'Every element is meticulously planned and executed.',
  },
  {
    icon: Gem,
    title: 'Luxury Excellence',
    description: 'Premium service and exclusive experiences guaranteed.',
  },
];

export default function HomePage() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    // Fetch gallery images
    getGalleryImages()
      .then((res) => setGalleryImages(res.data.slice(0, 6)))
      .catch(console.error);

    // Fetch testimonials
    getTestimonials(true, 3)
      .then((res) => setTestimonials(res.data))
      .catch(console.error);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <>
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary to-bg-secondary" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-10% left-5% w-72 h-72 bg-gold/10 rounded-full blur-3xl"
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10% right-5% w-96 h-96 bg-gold/5 rounded-full blur-3xl"
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl"
            animate={{ x: [0, 30, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </div>

        {/* Content */}
        <div className="container relative z-10 max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6 sm:mb-8"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-xs sm:text-sm text-gold font-medium uppercase tracking-wider">
                Luxury Event Management
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={itemVariants}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 sm:mb-8 leading-tight"
            >
              Craft Your{' '}
              <span className="gold-gradient inline-block">Perfect Moment</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-text-secondary max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed"
            >
              Transform your vision into an unforgettable experience. From intimate gatherings to grand celebrations, 
              we create moments that resonate for a lifetime.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
            >
              <Link
                href="/contact"
                className="group relative px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-bg-primary font-semibold uppercase text-sm tracking-wider overflow-hidden transition-all duration-300 hover:shadow-gold w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                href="/gallery"
                className="px-8 py-4 border-2 border-gold text-gold hover:bg-gold/10 font-semibold uppercase text-sm tracking-wider transition-all duration-300 w-full sm:w-auto"
              >
                View Our Portfolio
              </Link>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              variants={itemVariants}
              className="mt-12 sm:mt-16"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex justify-center"
              >
                <div className="w-8 h-12 border-2 border-gold/30 rounded-full flex justify-center p-2">
                  <motion.div className="w-1 h-2 bg-gold rounded-full" />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-r from-bg-secondary via-bg-primary to-bg-secondary border-t border-b border-gold/10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="flex justify-center mb-3 sm:mb-4">
                  <div className="p-3 bg-gold/10 rounded-lg group-hover:bg-gold/20 transition-colors">
                    <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-gold" />
                  </div>
                </div>
                <span className="block text-2xl sm:text-3xl md:text-4xl font-heading gold-gradient mb-2">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-text-secondary uppercase tracking-wider">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== SERVICES SECTION ==================== */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-6xl">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">
              Our Premium <span className="gold-gradient">Services</span>
            </h2>
            <p className="text-text-secondary text-sm sm:text-base md:text-lg">
              Comprehensive event solutions tailored to bring your unique vision to life
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="group relative"
              >
                <div className="relative p-6 sm:p-7 md:p-8 bg-bg-secondary border border-border rounded-lg hover:border-gold/50 transition-all duration-300 h-full overflow-hidden">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gold/10 rounded-xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:bg-gold/20 transition-colors">
                      <service.icon className="w-7 h-7 sm:w-8 sm:h-8 text-gold" />
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-lg sm:text-xl mb-3 sm:mb-4 group-hover:text-gold transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-text-secondary text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                      {service.description}
                    </p>

                    {/* Link */}
                    <div className="flex items-center text-gold text-sm font-semibold gap-2 group-hover:gap-3 transition-all">
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12 sm:mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border-2 border-gold text-gold hover:bg-gold/10 font-semibold uppercase text-xs sm:text-sm tracking-wider transition-all duration-300"
            >
              Explore All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE US SECTION ==================== */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-bg-secondary">
        <div className="container max-w-6xl">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">
              Why Choose <span className="gold-gradient">Luxe Events</span>
            </h2>
            <p className="text-text-secondary text-sm sm:text-base md:text-lg">
              Partner with award-winning event experts who prioritize your vision
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {whyChooseUs.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="flex gap-4 sm:gap-6 p-6 sm:p-7 bg-bg-primary rounded-lg border border-border hover:border-gold/30 transition-all"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-lg bg-gold/10">
                    <item.icon className="h-6 w-6 sm:h-7 sm:w-7 text-gold" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-lg sm:text-xl mb-2">{item.title}</h3>
                  <p className="text-text-secondary text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== GALLERY PREVIEW SECTION ==================== */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-6xl">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">
              Our Latest <span className="gold-gradient">Creations</span>
            </h2>
            <p className="text-text-secondary text-sm sm:text-base md:text-lg">
              Stunning events that showcase our excellence and creativity
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
            {galleryImages.length > 0 ? (
              galleryImages.map((image, index) => (
                <motion.div
                  key={image._id}
                  className="group relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Image
                    src={image.imageUrl}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-gold text-xs uppercase tracking-wider font-semibold mb-2">
                      {image.category}
                    </span>
                    <h4 className="text-white font-heading text-lg sm:text-xl">
                      {image.title}
                    </h4>
                  </div>

                  {/* Border */}
                  <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/50 transition-colors rounded-lg" />
                </motion.div>
              ))
            ) : (
              [...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="aspect-[4/3] bg-bg-tertiary animate-pulse rounded-lg"
                />
              ))
            )}
          </div>

          <motion.div
            className="text-center mt-12 sm:mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border-2 border-gold text-gold hover:bg-gold/10 font-semibold uppercase text-xs sm:text-sm tracking-wider transition-all duration-300"
            >
              View Full Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS SECTION ==================== */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-bg-secondary">
        <div className="container max-w-6xl">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">
              Client <span className="gold-gradient">Success Stories</span>
            </h2>
            <p className="text-text-secondary text-sm sm:text-base md:text-lg">
              Real feedback from our satisfied clients
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {testimonials.length > 0 ? (
              testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial._id}
                  variants={itemVariants}
                  className="group p-6 sm:p-7 md:p-8 bg-bg-primary border border-border rounded-lg hover:border-gold/50 transition-all"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${i < testimonial.rating
                          ? 'text-gold fill-gold'
                          : 'text-border'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <p className="text-text-secondary text-sm sm:text-base italic leading-relaxed mb-6 sm:mb-8 min-h-20">
                    &ldquo;{testimonial.message}&rdquo;
                  </p>

                  {/* Divider */}
                  <div className="border-t border-border pt-4 sm:pt-6">
                    <p className="font-heading text-base sm:text-lg mb-1">{testimonial.name}</p>
                    {testimonial.eventType && (
                      <p className="text-gold text-xs sm:text-sm font-medium uppercase tracking-wider">
                        {testimonial.eventType}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              [...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="h-72 bg-bg-tertiary animate-pulse rounded-lg"
                />
              ))
            )}
          </motion.div>

          <motion.div
            className="text-center mt-12 sm:mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border-2 border-gold text-gold hover:bg-gold/10 font-semibold uppercase text-xs sm:text-sm tracking-wider transition-all duration-300"
            >
              Read More Stories
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-secondary to-bg-primary" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 max-w-4xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">
              Ready to Create Your <span className="gold-gradient">Unforgettable Event</span>?
            </h2>
            <p className="text-text-secondary text-sm sm:text-base md:text-lg mb-8 sm:mb-10">
              Let our team of expert event planners bring your vision to life with elegance and precision.
            </p>
            
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-bg-primary font-semibold uppercase text-sm tracking-wider hover:shadow-gold transition-all duration-300"
            >
              Book Your Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
