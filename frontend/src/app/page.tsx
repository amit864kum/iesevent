'use client';

/**
 * Home Page - Redesigned Landing Page
 * Modern, elegant design with enhanced UX and animations
 * Fully responsive across all devices
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Sparkles, Calendar, Users, Award, Zap, Heart, Eye, Gem, CheckCircle2, TrendingUp } from 'lucide-react';
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
        {/* Enhanced background with mesh gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary" />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(198, 164, 94, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(198, 164, 94, 0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
        
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-gold/10 rounded-full blur-[100px]"
            animate={{ 
              y: [0, 50, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-gold/8 rounded-full blur-[120px]"
            animate={{ 
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-gold/6 rounded-full blur-[80px]"
            animate={{ 
              x: [0, 50, 0],
              scale: [1, 1.15, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Floating particles - using fixed positions to avoid hydration mismatch */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { left: 10, top: 20, duration: 4, delay: 0 },
            { left: 25, top: 45, duration: 3.5, delay: 0.5 },
            { left: 40, top: 15, duration: 4.5, delay: 1 },
            { left: 55, top: 60, duration: 3.8, delay: 0.3 },
            { left: 70, top: 35, duration: 4.2, delay: 0.8 },
            { left: 85, top: 70, duration: 3.6, delay: 1.2 },
            { left: 15, top: 80, duration: 4.3, delay: 0.6 },
            { left: 30, top: 50, duration: 3.9, delay: 1.5 },
            { left: 50, top: 25, duration: 4.1, delay: 0.2 },
            { left: 65, top: 85, duration: 3.7, delay: 1.8 },
            { left: 80, top: 40, duration: 4.4, delay: 0.9 },
            { left: 20, top: 65, duration: 3.4, delay: 1.3 },
            { left: 45, top: 10, duration: 4.6, delay: 0.4 },
            { left: 60, top: 55, duration: 3.3, delay: 1.6 },
            { left: 75, top: 30, duration: 4.7, delay: 0.7 },
            { left: 90, top: 75, duration: 3.2, delay: 1.1 },
            { left: 35, top: 90, duration: 4.8, delay: 1.4 },
            { left: 5, top: 50, duration: 3.1, delay: 0.1 },
            { left: 95, top: 20, duration: 4.9, delay: 1.7 },
            { left: 50, top: 70, duration: 3.5, delay: 1.9 },
          ].map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gold/20 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>

        {/* Content - CONSISTENT CONTAINER */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Enhanced Badge with glow */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold/10 border border-gold/40 mb-6 sm:mb-8 backdrop-blur-sm shadow-[0_0_20px_rgba(198,164,94,0.15)]"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-gold" />
              </motion.div>
              <span className="text-xs sm:text-sm text-gold font-semibold uppercase tracking-[0.2em]">
                Luxury Event Management
              </span>
            </motion.div>

            {/* Enhanced Main heading with better typography */}
            <motion.h1
              variants={itemVariants}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 sm:mb-8 leading-[1.1] tracking-tight"
            >
              Craft Your{' '}
              <span className="relative inline-block">
                <span className="gold-gradient">Perfect Moment</span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>
            </motion.h1>

            {/* Enhanced Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-secondary max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-14 leading-relaxed font-light"
            >
              Transform your vision into an unforgettable experience. From intimate gatherings to grand celebrations, 
              we create moments that resonate for a lifetime.
            </motion.p>

            {/* Enhanced CTA Buttons with better hover effects */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16"
            >
              <Link
                href="/contact"
                className="group relative px-10 py-5 bg-gradient-to-r from-gold via-gold-light to-gold text-bg-primary font-bold uppercase text-sm tracking-[0.15em] overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(198,164,94,0.4)] w-full sm:w-auto bg-[length:200%_100%] hover:bg-right"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link
                href="/gallery"
                className="group relative px-10 py-5 border-2 border-gold text-gold hover:bg-gold hover:text-bg-primary font-bold uppercase text-sm tracking-[0.15em] transition-all duration-300 w-full sm:w-auto overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View Our Portfolio
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12 mb-12 sm:mb-16 text-text-secondary text-xs sm:text-sm"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <span>500+ Events</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <span>98% Satisfaction</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <span>15+ Years</span>
              </div>
            </motion.div>

            {/* Enhanced Scroll indicator */}
            <motion.div
              variants={itemVariants}
              className="mt-8 sm:mt-12"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-xs text-text-muted uppercase tracking-wider">Scroll to explore</span>
                <div className="w-6 h-10 border-2 border-gold/40 rounded-full flex justify-center p-1.5">
                  <motion.div 
                    className="w-1 h-2 bg-gold rounded-full"
                    animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <section className="relative py-20 bg-gradient-to-r from-bg-secondary via-bg-primary to-bg-secondary border-y border-gold/10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="relative text-center group"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gold/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                
                <div className="relative">
                  {/* Icon with enhanced styling */}
                  <div className="flex justify-center mb-4 sm:mb-5">
                    <motion.div 
                      className="relative p-4 bg-gradient-to-br from-gold/10 to-gold/5 rounded-2xl group-hover:from-gold/20 group-hover:to-gold/10 transition-all duration-300 shadow-lg"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <stat.icon className="w-7 h-7 sm:w-9 sm:h-9 text-gold" />
                      
                      {/* Decorative corner accents */}
                      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-gold/30 rounded-tl" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-gold/30 rounded-br" />
                    </motion.div>
                  </div>
                  
                  {/* Animated counter */}
                  <motion.span 
                    className="block text-3xl sm:text-4xl md:text-5xl font-heading gold-gradient mb-2 sm:mb-3"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
                  >
                    {stat.value}
                  </motion.span>
                  
                  <span className="text-xs sm:text-sm text-text-secondary uppercase tracking-[0.15em] font-semibold">
                    {stat.label}
                  </span>
                  
                  {/* Decorative line */}
                  <motion.div 
                    className="mx-auto mt-3 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"
                    initial={{ width: 0 }}
                    whileInView={{ width: "60%" }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== SERVICES SECTION ==================== */}
      <section className="relative py-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-gold text-sm font-semibold uppercase tracking-[0.2em]">What We Offer</span>
            </motion.div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl mb-5 sm:mb-6 leading-tight">
              Our Premium <span className="gold-gradient">Services</span>
            </h2>
            <p className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed">
              Comprehensive event solutions tailored to bring your unique vision to life with unmatched elegance
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
                whileHover={{ y: -12 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              >
                <Link href="/services" className="block h-full">
                  <div className="relative p-7 sm:p-8 bg-bg-secondary border border-border hover:border-gold/60 transition-all duration-500 h-full overflow-hidden rounded-xl">
                    {/* Animated gradient background */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      initial={false}
                    />
                    
                    {/* Shine effect on hover */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      initial={false}
                      style={{
                        background: 'linear-gradient(45deg, transparent 30%, rgba(198, 164, 94, 0.1) 50%, transparent 70%)',
                        backgroundSize: '200% 200%',
                      }}
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: 'reverse',
                      }}
                    />

                    <div className="relative z-10">
                      {/* Enhanced Icon */}
                      <motion.div 
                        className="relative w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br from-gold/15 to-gold/5 rounded-2xl flex items-center justify-center mb-6 group-hover:from-gold/25 group-hover:to-gold/10 transition-all duration-300 shadow-lg"
                        whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      >
                        <service.icon className="w-8 h-8 sm:w-9 sm:h-9 text-gold" />
                        
                        {/* Corner decorations */}
                        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-gold/40 rounded-tl-lg" />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-gold/40 rounded-br-lg" />
                      </motion.div>

                      {/* Title with better typography */}
                      <h3 className="font-heading text-xl sm:text-2xl mb-4 group-hover:text-gold transition-colors duration-300 leading-tight">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Enhanced Link */}
                      <div className="flex items-center text-gold text-sm font-bold gap-2 group-hover:gap-4 transition-all duration-300">
                        <span className="uppercase tracking-wider">Learn More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>

                    {/* Number indicator */}
                    <div className="absolute top-4 right-4 text-6xl font-heading text-gold/5 group-hover:text-gold/10 transition-colors duration-300">
                      {(index + 1).toString().padStart(2, '0')}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-16 sm:mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/services"
              className="group inline-flex items-center gap-3 px-10 py-5 border-2 border-gold text-gold hover:bg-gold hover:text-bg-primary font-bold uppercase text-sm tracking-[0.15em] transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">Explore All Services</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==================== WHY CHOOSE US SECTION ==================== */}
      <section className="relative py-20 bg-bg-secondary overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-gold text-sm font-semibold uppercase tracking-[0.2em]">Our Advantage</span>
            </motion.div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl mb-5 sm:mb-6 leading-tight">
              Why Choose <span className="gold-gradient">Luxe Events</span>
            </h2>
            <p className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed">
              Partner with award-winning event experts who prioritize your vision and deliver excellence
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8 md:gap-10 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="group relative"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative flex gap-5 sm:gap-6 p-7 sm:p-8 bg-bg-primary rounded-xl border border-border hover:border-gold/50 transition-all duration-500 h-full overflow-hidden">
                  {/* Background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div 
                      className="flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-xl bg-gradient-to-br from-gold/15 to-gold/5 group-hover:from-gold/25 group-hover:to-gold/10 transition-all duration-300 shadow-lg"
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className="h-7 w-7 sm:h-8 sm:w-8 text-gold" />
                    </motion.div>
                  </div>
                  
                  <div className="relative z-10 flex-1">
                    <h3 className="font-heading text-xl sm:text-2xl mb-3 group-hover:text-gold transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Number indicator */}
                  <div className="absolute bottom-4 right-4 text-5xl font-heading text-gold/5 group-hover:text-gold/10 transition-colors duration-300">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold/0 group-hover:border-gold/30 transition-all duration-500 rounded-tr-lg" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== GALLERY PREVIEW SECTION ==================== */}
      <section className="relative py-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary" />
        
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-gold text-sm font-semibold uppercase tracking-[0.2em]">Portfolio</span>
            </motion.div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl mb-5 sm:mb-6 leading-tight">
              Our Latest <span className="gold-gradient">Creations</span>
            </h2>
            <p className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed">
              Stunning events that showcase our excellence and creativity
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
            {galleryImages.length > 0 ? (
              galleryImages.map((image, index) => (
                <motion.div
                  key={image._id}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -12 }}
                >
                  <Link href="/gallery" className="block h-full">
                    <div className="relative h-full">
                      <Image
                        src={image.imageUrl}
                        alt={image.title}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      
                      {/* Enhanced Overlay with gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-100 transition-all duration-500" />
                      
                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-7 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <motion.span 
                          className="text-gold text-xs uppercase tracking-[0.2em] font-bold mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
                          initial={false}
                        >
                          {image.category}
                        </motion.span>
                        <h4 className="text-white font-heading text-xl sm:text-2xl mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                          {image.title}
                        </h4>
                        
                        {/* View button */}
                        <motion.div 
                          className="flex items-center gap-2 text-gold text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200"
                          initial={false}
                        >
                          <span className="uppercase tracking-wider">View Project</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>

                      {/* Animated Border */}
                      <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/60 transition-all duration-500 rounded-2xl" />
                      
                      {/* Corner accents */}
                      <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-gold/0 group-hover:border-gold/60 transition-all duration-500 rounded-tl-lg" />
                      <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-gold/0 group-hover:border-gold/60 transition-all duration-500 rounded-br-lg" />
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              [...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="aspect-[4/3] bg-bg-tertiary animate-pulse rounded-2xl"
                />
              ))
            )}
          </div>

          <motion.div
            className="text-center mt-16 sm:mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-3 px-10 py-5 border-2 border-gold text-gold hover:bg-gold hover:text-bg-primary font-bold uppercase text-sm tracking-[0.15em] transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">View Full Gallery</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS SECTION ==================== */}
      <section className="relative py-20 bg-bg-secondary overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-gold text-sm font-semibold uppercase tracking-[0.2em]">Testimonials</span>
            </motion.div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl mb-5 sm:mb-6 leading-tight">
              Client <span className="gold-gradient">Success Stories</span>
            </h2>
            <p className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed">
              Real feedback from our satisfied clients who trusted us with their special moments
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
                  className="group relative"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative p-7 sm:p-8 bg-bg-primary border border-border hover:border-gold/50 transition-all duration-500 h-full rounded-xl overflow-hidden">
                    {/* Background glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      {/* Quote icon */}
                      <div className="absolute -top-2 -left-2 text-6xl text-gold/10 font-heading leading-none">&ldquo;</div>
                      
                      {/* Stars with animation */}
                      <div className="flex gap-1 mb-5 relative">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + i * 0.05 }}
                          >
                            <Star
                              size={18}
                              className={`${i < testimonial.rating
                                ? 'text-gold fill-gold'
                                : 'text-border'
                              } transition-all duration-300`}
                            />
                          </motion.div>
                        ))}
                      </div>

                      {/* Testimonial text */}
                      <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 min-h-[80px] relative">
                        &ldquo;{testimonial.message}&rdquo;
                      </p>

                      {/* Divider with animation */}
                      <motion.div 
                        className="border-t border-gold/20 pt-5 sm:pt-6"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <div className="flex items-center gap-3">
                          {/* Avatar placeholder */}
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center flex-shrink-0">
                            <span className="text-gold font-heading text-lg">
                              {testimonial.name.charAt(0)}
                            </span>
                          </div>
                          
                          <div className="flex-1">
                            <p className="font-heading text-base sm:text-lg mb-1 text-text-primary">
                              {testimonial.name}
                            </p>
                            {testimonial.eventType && (
                              <p className="text-gold text-xs sm:text-sm font-semibold uppercase tracking-wider">
                                {testimonial.eventType}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Corner decorations */}
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold/0 group-hover:border-gold/30 transition-all duration-500 rounded-tr-lg" />
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gold/0 group-hover:border-gold/30 transition-all duration-500 rounded-bl-lg" />
                  </div>
                </motion.div>
              ))
            ) : (
              [...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="h-80 bg-bg-tertiary animate-pulse rounded-xl"
                />
              ))
            )}
          </motion.div>

          <motion.div
            className="text-center mt-16 sm:mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/testimonials"
              className="group inline-flex items-center gap-3 px-10 py-5 border-2 border-gold text-gold hover:bg-gold hover:text-bg-primary font-bold uppercase text-sm tracking-[0.15em] transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">Read More Stories</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="relative py-20 overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-0 left-0 w-[500px] h-[500px] bg-gold/15 rounded-full blur-[120px]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[140px]"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(198, 164, 94, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(198, 164, 94, 0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="relative max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative border */}
            <div className="absolute -inset-4 border border-gold/20 rounded-3xl" />
            <div className="absolute -inset-8 border border-gold/10 rounded-3xl hidden md:block" />
            
            <div className="relative bg-gradient-to-br from-bg-secondary/80 to-bg-primary/80 backdrop-blur-sm p-10 sm:p-12 md:p-16 rounded-2xl border border-gold/30 text-center">
              {/* Icon */}
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gold/10 rounded-2xl mb-6 sm:mb-8"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-gold" />
              </motion.div>

              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-5 sm:mb-6 leading-tight">
                Ready to Create Your <br className="hidden sm:block" />
                <span className="gold-gradient">Unforgettable Event</span>?
              </h2>
              
              <p className="text-text-secondary text-base sm:text-lg md:text-xl mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
                Let our team of expert event planners bring your vision to life with elegance and precision. 
                Your perfect moment awaits.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                <Link
                  href="/contact"
                  className="group relative px-10 py-5 bg-gradient-to-r from-gold via-gold-light to-gold text-bg-primary font-bold uppercase text-sm tracking-[0.15em] overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(198,164,94,0.5)] w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Book Your Consultation
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </Link>
                
                <Link
                  href="/gallery"
                  className="group px-10 py-5 border-2 border-gold/50 text-gold hover:border-gold hover:bg-gold/5 font-bold uppercase text-sm tracking-[0.15em] transition-all duration-300 w-full sm:w-auto"
                >
                  <span className="flex items-center justify-center gap-2">
                    View Our Work
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </Link>
              </div>

              {/* Trust badges */}
              <motion.div
                className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-gold/20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-2 text-text-secondary text-sm">
                  <TrendingUp className="w-4 h-4 text-gold" />
                  <span>Award Winning</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary text-sm">
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  <span>5-Star Rated</span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary text-sm">
                  <Users className="w-4 h-4 text-gold" />
                  <span>500+ Happy Clients</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
