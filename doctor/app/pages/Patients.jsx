import { Search, Filter, Users, AlertTriangle, Heart, Activity, ArrowLeft, ArrowRight, Shield, FileText } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export default function Patients() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Critical', 'In-Review', 'Stable'];
  
  const patients = [
    { name: 'Leo Harris', id: 'P-2024-201', age: 67, room: '402', status: 'Critical', spo2: 89, hr: 112, diagnosis: 'Cardiac Arrhythmia', lastUpdate: '5 min ago' },
    { name: 'Sarah Jenkins', id: 'P-2024-147', age: 34, room: '215', status: 'Stable', spo2: 98, hr: 72, diagnosis: 'Post-op Recovery', lastUpdate: '1 hr ago' },
    { name: 'Robert Chen', id: 'P-2024-189', age: 51, room: '310', status: 'In-Review', spo2: 94, hr: 88, diagnosis: 'Pulmonary Embolism', lastUpdate: '30 min ago' },
    { name: 'Emily Watson', id: 'P-2024-256', age: 28, room: '108', status: 'Stable', spo2: 99, hr: 68, diagnosis: 'Routine Monitoring', lastUpdate: '2 hr ago' },
    { name: 'Marcus Lee', id: 'P-2024-298', age: 73, room: '501', status: 'Critical', spo2: 91, hr: 104, diagnosis: 'Respiratory Distress', lastUpdate: '2 min ago' },
    { name: 'Alice Turner', id: 'P-2024-301', age: 45, room: '220', status: 'In-Review', spo2: 96, hr: 80, diagnosis: 'Lab Results Pending', lastUpdate: '45 min ago' },
  ];

  const filtered = activeTab === 'All' ? patients : patients.filter(p => p.status === activeTab);

  const statusColor = (s) => {
    if (s === 'Critical') return 'bg-red-100 text-red-700 border-red-200';
    if (s === 'In-Review') return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  };

  const spo2Color = (v) => v < 92 ? 'text-red-600' : v < 95 ? 'text-amber-600' : 'text-emerald-600';

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/doctor')} className="p-2 hover:bg-[#f1f5f9] rounded-xl transition-colors"><ArrowLeft className="size-5 text-[#64748b]" /></button>
          <div>
            <h1 className="text-2xl font-extrabold text-[#171c1f] tracking-tight">Patient Directory</h1>
            <p className="text-sm text-[#64748b]">{patients.length} patients under care</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/doctor/patients/file')} className="px-5 py-2.5 bg-white border border-[#e2e8f0] text-[#0369a1] rounded-xl font-semibold text-sm hover:bg-[#f0f9ff] hover:border-[#0ea5e9] transition-all flex items-center gap-2">
            <FileText className="size-4" /> Patient File
          </button>
          <button onClick={() => navigate('/doctor/patients/new')} className="px-5 py-2.5 bg-gradient-to-r from-[#006591] to-[#0ea5e9] text-white rounded-xl font-semibold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-xl transition-all">
            + Add Patient
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Panel: Quick Stats + Security */}
        <div className="space-y-6">
          {/* Totals */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h3 className="font-bold text-[#171c1f] text-sm mb-4 uppercase tracking-wider">Directory Totals</h3>
            <div className="space-y-3">
              {[
                { label: 'Total Patients', value: patients.length, color: 'text-[#0369a1]' },
                { label: 'Critical', value: patients.filter(p => p.status === 'Critical').length, color: 'text-red-600' },
                { label: 'In Review', value: patients.filter(p => p.status === 'In-Review').length, color: 'text-amber-600' },
                { label: 'Stable', value: patients.filter(p => p.status === 'Stable').length, color: 'text-emerald-600' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0 border-[#f1f5f9]">
                  <span className="text-sm text-[#64748b]">{item.label}</span>
                  <span className={`text-lg font-extrabold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Data Sharing Controls */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="size-4 text-[#0369a1]" />
              <h3 className="font-bold text-[#171c1f] text-sm">Security Controls</h3>
            </div>
            {['Lab Results', 'X-Ray Imaging', 'Prescriptions'].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b last:border-0 border-[#f1f5f9]">
                <span className="text-sm text-[#475569]">{item}</span>
                <div className="w-10 h-5 bg-[#0ea5e9] rounded-full relative cursor-pointer">
                  <div className="absolute right-0.5 top-0.5 size-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Patient List */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search + Tabs */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#94a3b8]" />
              <input type="text" placeholder="Search patients..." className="w-full bg-white border border-[#e2e8f0] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]" />
            </div>
            <div className="flex gap-1 bg-[#f1f5f9] p-1 rounded-xl">
              {tabs.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === tab ? 'bg-white shadow-sm text-[#0369a1]' : 'text-[#64748b] hover:text-[#171c1f]'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Patient Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#e2e8f0] p-5 hover:shadow-md transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-full bg-gradient-to-br from-[#006591] to-[#0ea5e9] flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {p.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-bold text-[#171c1f] group-hover:text-[#0369a1] transition-colors">{p.name}</p>
                      <p className="text-xs text-[#64748b]">{p.id} • Age {p.age}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${statusColor(p.status)}`}>{p.status}</span>
                </div>
                <p className="text-sm text-[#475569] mb-3">{p.diagnosis}</p>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1"><Activity className={`size-3 ${spo2Color(p.spo2)}`} /><span className="font-bold">SpO2: {p.spo2}%</span></span>
                  <span className="flex items-center gap-1"><Heart className="size-3 text-red-500" /><span className="font-bold">HR: {p.hr}</span></span>
                  <span className="flex items-center gap-1"><FileText className="size-3 text-[#64748b]" /><span>Room {p.room}</span></span>
                </div>
                <p className="text-[10px] text-[#94a3b8] mt-2">Updated {p.lastUpdate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
