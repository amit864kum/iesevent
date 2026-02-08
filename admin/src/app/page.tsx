'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Image,
  MessageSquare,
  Mail,
  ArrowRight,
  RefreshCcw,
  TrendingUp,
  BarChart3,
  Clock,
} from 'lucide-react';
import { getDashboardStats, DashboardStats } from '@/lib/api';
import StatsCard from '@/components/StatsCard';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    const data = await getDashboardStats();
    setStats(data);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="space-y-12 pb-8">

      {/* ===== DASHBOARD HEADER ===== */}
      <motion.section 
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 border-b border-border/30 pb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-text-secondary mt-2 flex items-center gap-2">
            <Clock size={16} className="text-gold" />
            Luxury event admin overview
          </p>
        </div>

        <button
          onClick={() => {
            setRefreshing(true);
            fetchStats();
          }}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gold/10 hover:bg-gold/20 text-gold border border-gold/30 rounded-lg transition-all duration-300 font-semibold sm:w-auto w-full"
        >
          <RefreshCcw size={18} className={refreshing ? 'animate-spin' : ''} />
          Refresh Stats
        </button>
      </motion.section>

      {/* ===== STATS CARDS ===== */}
      <motion.section 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <StatsCard
            title="Gallery Images"
            value={stats?.galleryCount || 0}
            icon={Image}
            description="Total uploaded"
            delay={0}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            title="Testimonials"
            value={stats?.testimonialsCount || 0}
            icon={MessageSquare}
            description="Client reviews"
            delay={0}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatsCard
            title="Unread Messages"
            value={stats?.unreadMessages || 0}
            icon={Mail}
            description="Pending replies"
            delay={0}
          />
        </motion.div>
      </motion.section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">

        {/* QUICK ACTIONS */}
        <motion.div 
          className="lg:col-span-2 space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gold/10 rounded-lg">
              <TrendingUp size={24} className="text-gold" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Quick Actions</h2>
          </div>

          <div className="space-y-4">
            <motion.div variants={itemVariants}>
              <ActionCard
                href="/gallery"
                icon={Image}
                title="Manage Gallery"
                desc="Upload, edit, and organize event photos"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ActionCard
                href="/testimonials"
                icon={MessageSquare}
                title="Testimonials"
                desc="Approve and manage client reviews"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ActionCard
                href="/messages"
                icon={Mail}
                title="Messages"
                desc="View and respond to client inquiries"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* SYSTEM STATUS */}
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="h-full p-8 rounded-xl bg-gradient-to-br from-bg-secondary/60 to-bg-secondary/30 border border-border/50 backdrop-blur-sm flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/30 rounded-full blur-lg animate-pulse" />
                <div className="relative w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold">System Status</h3>
            </div>

            <div className="space-y-6 flex-1">
              <Status label="Security Level" value="SECURE" variant="success" />
              <Status label="API Connection" value="ONLINE" variant="success" />
              <Status 
                label="Last Updated" 
                value={new Date().toLocaleDateString()} 
                variant="info"
              />
            </div>

            <div className="mt-auto pt-6 border-t border-border/30 flex items-center gap-2 text-sm text-text-secondary">
              <RefreshCcw size={14} className="text-gold animate-spin" />
              <span>Auto-sync enabled</span>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

/* ---------- UI HELPERS (SAFE) ---------- */

function ActionCard({
  href,
  icon: Icon,
  title,
  desc,
}: any) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between p-6 sm:p-7 rounded-xl bg-gradient-to-r from-bg-secondary/40 to-bg-tertiary/20 border border-border/50 hover:border-gold/50 hover:bg-bg-secondary/80 transition-all duration-300"
    >
      <div className="flex items-center gap-5">
        <div className="p-4 bg-gold/10 rounded-lg text-gold group-hover:bg-gold/20 transition-colors flex-shrink-0">
          <Icon size={24} />
        </div>
        <div>
          <p className="font-semibold text-lg group-hover:text-gold transition-colors">{title}</p>
          <p className="text-sm text-text-secondary mt-1">{desc}</p>
        </div>
      </div>
      <ArrowRight size={20} className="text-text-muted group-hover:text-gold group-hover:translate-x-2 transition-all flex-shrink-0 ml-4" />
    </Link>
  );
}

function Status({ label, value, variant = 'default' }: any) {
  const variantClasses = {
    success: 'bg-green-500/10 text-green-400',
    info: 'bg-blue-500/10 text-blue-400',
    default: 'bg-gold/10 text-gold',
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-border/20 last:border-0">
      <span className="text-text-secondary text-sm font-medium">{label}</span>
      <span className={`text-sm font-mono px-3 py-1 rounded-lg ${variantClasses[variant] || variantClasses.default}`}>
        {value}
      </span>
    </div>
  );
}
