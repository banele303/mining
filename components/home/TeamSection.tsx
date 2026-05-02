'use client';

import Link from 'next/link';
import { 
  ArrowRight, 
  Globe, 
  Mail 
} from 'lucide-react';

const teamMembers = [
  {
    name: 'Enricho',
    role: 'Managing Director',
    bio: 'Visionary leader with extensive experience in mining operations and strategic investments.',
  },
  {
    name: 'Norman',
    role: 'Operations Director',
    bio: 'Expert in large-scale mining logistics and operational efficiency across global markets.',
  },
  {
    name: 'Tebs',
    role: 'Technical Director',
    bio: 'Specialist in geological assessment and advanced mining technologies.',
  },
  {
    name: 'Gavin',
    role: 'Financial Director',
    bio: 'Seasoned financial strategist focusing on resource capital and asset management.',
  },
  {
    name: 'Mark',
    role: 'Strategic Relations',
    bio: 'Building bridge-to-market partnerships and global investor relations.',
  },
];

const TeamSection = () => {
  return (
    <section className="bg-white relative overflow-hidden" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="container px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500 mb-6">
              Our Leadership
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Meet the Minds Behind <br /> The Mining Exchange
            </h2>
          </div>
          <Link 
            href="/team" 
            className="group flex items-center gap-3 text-slate-900 font-bold text-lg hover:text-emerald-600 transition-colors"
          >
            View Full Team
            <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:text-white transition-all">
              <ArrowRight size={18} />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={member.name} 
              className="group animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-slate-900 mb-6 group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                {/* Black placeholder for image */}
                <div className="absolute inset-0 bg-black flex items-center justify-center">
                  <span className="text-white/20 font-black text-4xl uppercase tracking-tighter select-none">
                    Image Coming
                  </span>
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-emerald-500 transition-colors cursor-pointer">
                      <Globe size={18} />
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-emerald-500 transition-colors cursor-pointer">
                      <Mail size={18} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-4">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
