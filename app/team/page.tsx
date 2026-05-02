'use client';

import React from 'react';
import { Linkedin, Twitter, Mail, ChevronRight, Globe, Award, Shield, Users } from 'lucide-react';
import Link from 'next/link';

const teamMembers = [
  {
    name: 'Enricho',
    role: 'Managing Director',
    bio: 'Visionary leader with extensive experience in mining operations and strategic investments. Enricho has spearheaded numerous successful ventures across the African continent, focusing on sustainable resource development and technological integration in traditional mining sectors.',
    specialization: 'Strategic Leadership & Asset Acquisition',
    experience: '20+ Years',
  },
  {
    name: 'Norman',
    role: 'Operations Director',
    bio: 'Expert in large-scale mining logistics and operational efficiency across global markets. Norman specializes in streamlining supply chains and implementing rigorous safety and environmental standards that exceed international benchmarks.',
    specialization: 'Operational Excellence & Logistics',
    experience: '15+ Years',
  },
  {
    name: 'Tebs',
    role: 'Technical Director',
    bio: 'Specialist in geological assessment and advanced mining technologies. Tebs leads our technical evaluation team, ensuring that every asset listed on our platform meets the highest standards of geological integrity and production potential.',
    specialization: 'Geological Analysis & Tech Integration',
    experience: '12+ Years',
  },
  {
    name: 'Gavin',
    role: 'Financial Director',
    bio: 'Seasoned financial strategist focusing on resource capital and asset management. Gavin oversees all financial structuring and investment auditing, providing our partners with the fiscal clarity needed for high-stakes mining transactions.',
    specialization: 'Resource Finance & Risk Management',
    experience: '18+ Years',
  },
  {
    name: 'Mark',
    role: 'Strategic Relations',
    bio: 'Building bridge-to-market partnerships and global investor relations. Mark is responsible for expanding our global network of buyers and sellers, ensuring that The Mining Exchange remains the premier hub for mining asset transactions.',
    specialization: 'Partnership Development & Global Outreach',
    experience: '10+ Years',
  },
];

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-44 pb-20 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent)]" />
        <div className="container relative z-10 px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-slate-400 text-sm mb-8 font-medium">
            <Link href="/" className="hover:text-emerald-500 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-emerald-500">Our Team</span>
          </nav>
          
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight mb-8">
              The Experts Driving the <span className="text-emerald-500">Mining Revolution</span>
            </h1>
            <p className="text-slate-400 text-xl leading-relaxed">
              We combine decades of on-the-ground mining experience with cutting-edge digital innovation to transform how mining assets are traded globally.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 md:py-32">
        <div className="container px-6 lg:px-8">
          <div className="space-y-32">
            {teamMembers.map((member, index) => (
              <div 
                key={member.name}
                className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image Container */}
                <div className="w-full lg:w-5/12">
                  <div className="relative aspect-[4/5] rounded-[48px] overflow-hidden bg-slate-900 group shadow-2xl">
                    <div className="absolute inset-0 bg-black flex items-center justify-center">
                      <span className="text-white/10 font-black text-6xl uppercase tracking-tighter select-none rotate-12">
                        Portrait Coming
                      </span>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-8 right-8 flex flex-col gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                        <Linkedin size={20} />
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                        <Mail size={20} />
                      </div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-black to-transparent">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 rounded-full text-white text-sm font-bold uppercase tracking-wider">
                        <Award size={14} />
                        {member.experience} Experience
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Container */}
                <div className="w-full lg:w-7/12">
                  <p className="text-emerald-500 font-black uppercase tracking-[0.3em] text-sm mb-4">
                    {member.role}
                  </p>
                  <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-8">
                    {member.name}
                  </h2>
                  
                  <div className="bg-slate-50 rounded-[40px] p-8 md:p-12 border border-slate-100">
                    <p className="text-slate-600 text-lg leading-relaxed mb-10 italic">
                      "{member.bio}"
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-3">Core Specialization</h4>
                        <p className="text-slate-900 font-bold text-lg">{member.specialization}</p>
                      </div>
                      <div>
                        <h4 className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-3">Global Impact</h4>
                        <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                          <Globe className="text-emerald-500" size={18} />
                          International Markets
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values/Culture Section */}
      <section className="bg-slate-50 py-24 md:py-32 border-t border-slate-100">
        <div className="container px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
              Our Shared Commitment
            </h2>
            <p className="text-slate-500 text-lg">
              Beyond individual expertise, our team is united by a set of core values that define how we operate and the results we deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[40px] border border-slate-200 hover:border-emerald-500/30 transition-all group">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <Shield size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Integrity First</h3>
              <p className="text-slate-500 leading-relaxed">We maintain the highest standards of transparency and honesty in every transaction and partnership.</p>
            </div>
            <div className="bg-white p-10 rounded-[40px] border border-slate-200 hover:border-emerald-500/30 transition-all group">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <Users size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Client Centric</h3>
              <p className="text-slate-500 leading-relaxed">Our success is measured by the growth and prosperity of the buyers and sellers on our platform.</p>
            </div>
            <div className="bg-white p-10 rounded-[40px] border border-slate-200 hover:border-emerald-500/30 transition-all group">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <Globe size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Global Vision</h3>
              <p className="text-slate-500 leading-relaxed">We think beyond borders, connecting resources with opportunities on a truly global scale.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 py-20">
        <div className="container px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Want to work with us?
            </h2>
            <p className="text-emerald-100 text-lg">
              Our experts are ready to help you navigate the global mining market.
            </p>
          </div>
          <Link href="/contact" className="bg-white text-emerald-600 px-12 py-6 rounded-2xl font-black text-xl hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-emerald-900/20">
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
