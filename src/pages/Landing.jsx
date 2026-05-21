import { useNavigate } from 'react-router';
import { useState } from 'react';
import { ArrowRight, Upload, Minus, Heart, ChevronDown } from 'lucide-react';

const specialties = ['Pulmonologie', 'Hämatologie', 'Nephrologie', 'Kardiologie', 'Neurologie'];
const experts = ['Dr. Miller', 'Dr. Jenkins', 'Dr. Chen', 'Dr. Watson'];

export default function Landing() {
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] = useState('Pulmonologie');
  const [selectedExpert, setSelectedExpert] = useState('Dr. Miller');
  const [selectedDate, setSelectedDate] = useState('2024-10-24');

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-hidden">
      {/* Hero Background Image (right side) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 top-0 w-[60%] h-full">
          <img src="/hero-bg.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        </div>
      </div>

      {/* Navigation */}
      <header className="relative z-10 flex items-center justify-between px-10 lg:px-16 py-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold text-[#1a1a2e] tracking-tight">Arcio</span>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {['Home', 'Services', 'About', 'Contact'].map((item) => (
            <a key={item} href="#" className="text-sm font-medium text-[#4a4a5a] hover:text-[#0891b2] transition-colors">
              {item}
            </a>
          ))}
        </nav>

        {/* Login Button */}
        <button
          onClick={() => navigate('/login/patient')}
          className="px-7 py-2.5 bg-[#0891b2] text-white rounded-full text-sm font-semibold hover:bg-[#0e7490] transition-all shadow-md shadow-[#0891b2]/20"
        >
          Login
        </button>
      </header>

      {/* Hero Content */}
      <main className="relative z-10 flex-1 flex items-center px-10 lg:px-16 pb-16">
        <div className="max-w-xl">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-8">
            <div className="size-2 rounded-full bg-[#0891b2]" />
            <span className="text-xs font-bold text-[#0891b2] uppercase tracking-[0.2em]">
              Trusted Pediatric Archive
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6">
            <span className="text-[#1a1a2e]">Your Health,</span>
            <br />
            <span className="text-[#0891b2]">Our Priority</span>
          </h1>

          {/* Description */}
          <p className="text-base text-[#6b7280] leading-relaxed mb-10 max-w-md">
            Compassionate care for your family. A secure, high-performance clinical archive for the next generation of pediatrics.
          </p>

          {/* Specialty Tags */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { icon: <Upload className="size-3.5" />, label: 'Pulmonologie' },
              { icon: <Minus className="size-3.5" />, label: 'Hämatologie' },
              { icon: <Heart className="size-3.5" />, label: 'Nephrologie' },
            ].map((tag) => (
              <button
                key={tag.label}
                className="flex items-center gap-2 px-4 py-2 border border-[#e5e7eb] rounded-full text-sm font-medium text-[#374151] bg-white hover:border-[#0891b2] hover:text-[#0891b2] transition-colors"
              >
                {tag.icon}
                {tag.label}
              </button>
            ))}
          </div>

          {/* Booking Form Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-[#f0f0f0] p-5 flex flex-wrap items-end gap-4 max-w-lg">
            {/* Specialty */}
            <div className="flex-1 min-w-[120px]">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] mb-1 block">Specialty</label>
              <div className="relative">
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full appearance-none bg-transparent text-sm font-semibold text-[#1a1a2e] pr-6 py-1 border-0 focus:outline-none cursor-pointer"
                >
                  {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 size-4 text-[#9ca3af] pointer-events-none" />
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-10 bg-[#e5e7eb] hidden sm:block" />

            {/* Expert */}
            <div className="flex-1 min-w-[120px]">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] mb-1 block">Expert</label>
              <div className="relative">
                <select
                  value={selectedExpert}
                  onChange={(e) => setSelectedExpert(e.target.value)}
                  className="w-full appearance-none bg-transparent text-sm font-semibold text-[#1a1a2e] pr-6 py-1 border-0 focus:outline-none cursor-pointer"
                >
                  {experts.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 size-4 text-[#9ca3af] pointer-events-none" />
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-10 bg-[#e5e7eb] hidden sm:block" />

            {/* Date */}
            <div className="flex-1 min-w-[120px]">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] mb-1 block">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-[#1a1a2e] py-1 border-0 focus:outline-none cursor-pointer"
              />
            </div>

            {/* Book Now Button */}
            <button
              onClick={() => navigate('/login/patient')}
              className="flex items-center gap-2 px-6 py-3 bg-[#0891b2] text-white rounded-full text-sm font-bold hover:bg-[#0e7490] transition-all shadow-lg shadow-[#0891b2]/25 shrink-0"
            >
              Book Now <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex items-center justify-between px-10 lg:px-16 py-6 border-t border-[#f3f4f6]">
        <span className="text-xs text-[#9ca3af]">© 2024 Arcio Clinical</span>
        <div className="flex items-center gap-6">
          {['Privacy', 'Standards', 'HIPAA Compliant'].map((item) => (
            <span key={item} className="text-xs font-semibold uppercase tracking-wider text-[#9ca3af]">
              {item}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
