import { Calendar, Clock, ChevronLeft, ChevronRight, UserPlus, Video, MapPin, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export default function Appointments() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState('Wed');

  const weekDays = [
    { day: 'Mon', date: '12', count: 4 },
    { day: 'Tue', date: '13', count: 6 },
    { day: 'Wed', date: '14', count: 5 },
    { day: 'Thu', date: '15', count: 3 },
    { day: 'Fri', date: '16', count: 7 },
    { day: 'Sat', date: '17', count: 2 },
  ];

  const timeSlots = [
    { time: '08:00', patient: 'Sarah Jenkins', type: 'Ward Round', duration: '30 min', status: 'Confirmed', mode: 'In-Person' },
    { time: '09:00', patient: 'Robert Chen', type: 'OPD Follow-up', duration: '20 min', status: 'Confirmed', mode: 'Video' },
    { time: '10:00', patient: null, type: null, duration: null, status: 'Available', mode: null },
    { time: '11:00', patient: 'Emily Watson', type: 'Lab Review', duration: '45 min', status: 'Pending', mode: 'In-Person' },
    { time: '12:00', patient: null, type: 'Lunch Break', duration: '1 hr', status: 'Break', mode: null },
    { time: '14:00', patient: 'Marcus Lee', type: 'Post-op Checkup', duration: '30 min', status: 'Confirmed', mode: 'In-Person' },
    { time: '15:00', patient: 'Alice Turner', type: 'New Patient Intake', duration: '45 min', status: 'Pending', mode: 'In-Person' },
    { time: '16:00', patient: 'James Park', type: 'Prescription Review', duration: '15 min', status: 'Confirmed', mode: 'Video' },
  ];

  const dailyChecklist = [
    { task: 'Ward Rounds — Floor 3', done: true },
    { task: 'OPD Follow-ups (4)', done: true },
    { task: 'Lab Result Reviews', done: false },
    { task: 'Patient Discharge — Room 204', done: false },
    { task: 'Case Presentation Prep', done: false },
  ];

  const statusColor = (s) => {
    if (s === 'Confirmed') return 'bg-emerald-100 text-emerald-700';
    if (s === 'Pending') return 'bg-amber-100 text-amber-700';
    if (s === 'Available') return 'bg-[#e0f2fe] text-[#0369a1]';
    return 'bg-[#f1f5f9] text-[#64748b]';
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/doctor')} className="p-2 hover:bg-[#f1f5f9] rounded-xl transition-colors"><ArrowLeft className="size-5 text-[#64748b]" /></button>
          <div>
            <h1 className="text-2xl font-extrabold text-[#171c1f] tracking-tight">Appointments</h1>
            <p className="text-sm text-[#64748b]">Week of May 12 – 17, 2026</p>
          </div>
        </div>
        <button className="px-5 py-2.5 bg-gradient-to-r from-[#006591] to-[#0ea5e9] text-white rounded-xl font-semibold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-xl transition-all flex items-center gap-2">
          <UserPlus className="size-4" /> New Appointment
        </button>
      </div>

      {/* Week Selector */}
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-[#f1f5f9] rounded-lg"><ChevronLeft className="size-4 text-[#64748b]" /></button>
        <div className="flex gap-2 flex-1">
          {weekDays.map((d) => (
            <button key={d.day} onClick={() => setSelectedDay(d.day)}
              className={`flex-1 py-3 px-2 rounded-xl text-center transition-all ${selectedDay === d.day ? 'bg-gradient-to-br from-[#006591] to-[#0ea5e9] text-white shadow-lg' : 'bg-white border border-[#e2e8f0] hover:bg-[#f8fafc]'}`}>
              <p className={`text-xs font-semibold ${selectedDay === d.day ? 'text-white/70' : 'text-[#64748b]'}`}>{d.day}</p>
              <p className={`text-xl font-extrabold ${selectedDay === d.day ? 'text-white' : 'text-[#171c1f]'}`}>{d.date}</p>
              <p className={`text-[10px] font-bold ${selectedDay === d.day ? 'text-white/70' : 'text-[#64748b]'}`}>{d.count} appts</p>
            </button>
          ))}
        </div>
        <button className="p-2 hover:bg-[#f1f5f9] rounded-lg"><ChevronRight className="size-4 text-[#64748b]" /></button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule Timeline */}
        <div className="lg:col-span-2 space-y-3">
          {timeSlots.map((slot, i) => (
            <div key={i} className={`flex gap-4 p-4 rounded-2xl border transition-all hover:shadow-sm ${slot.status === 'Available' ? 'border-dashed border-[#0ea5e9]/30 bg-[#f0f9ff]' : slot.status === 'Break' ? 'border-[#e2e8f0] bg-[#f8fafc]' : 'border-[#e2e8f0] bg-white'}`}>
              <div className="w-16 shrink-0">
                <p className="text-sm font-bold text-[#171c1f]">{slot.time}</p>
                {slot.duration && <p className="text-[10px] text-[#94a3b8]">{slot.duration}</p>}
              </div>
              <div className="flex-1">
                {slot.patient ? (
                  <>
                    <p className="font-semibold text-[#171c1f]">{slot.patient}</p>
                    <p className="text-xs text-[#64748b]">{slot.type}</p>
                  </>
                ) : (
                  <p className="text-sm text-[#64748b] italic">{slot.type || 'Open Slot'}</p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {slot.mode && (
                  <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-[#f1f5f9] text-[#64748b] flex items-center gap-1">
                    {slot.mode === 'Video' ? <Video className="size-3" /> : <MapPin className="size-3" />}{slot.mode}
                  </span>
                )}
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${statusColor(slot.status)}`}>{slot.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 text-center">
              <p className="text-3xl font-extrabold text-[#171c1f]">12</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Total Today</p>
            </div>
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 text-center">
              <p className="text-3xl font-extrabold text-amber-500">04</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Pending</p>
            </div>
          </div>

          {/* Next Session */}
          <div className="bg-gradient-to-br from-[#006591] to-[#0ea5e9] rounded-2xl p-5 text-white">
            <p className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2">Next Session</p>
            <p className="font-bold text-lg">Sarah Jenkins</p>
            <p className="text-sm text-white/80">Post-op Checkup</p>
            <div className="flex items-center gap-2 mt-3">
              <Clock className="size-4 text-white/60" />
              <span className="text-sm font-semibold">09:00 AM — 30 min</span>
            </div>
          </div>

          {/* Daily Checklist */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h3 className="font-bold text-[#171c1f] mb-3">Daily Checklist</h3>
            <div className="space-y-2">
              {dailyChecklist.map((item, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`size-5 rounded-md border-2 flex items-center justify-center transition-all ${item.done ? 'bg-[#0ea5e9] border-[#0ea5e9]' : 'border-[#d1d5db] group-hover:border-[#0ea5e9]'}`}>
                    {item.done && <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <span className={`text-sm ${item.done ? 'text-[#94a3b8] line-through' : 'text-[#334155] font-medium'}`}>{item.task}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
