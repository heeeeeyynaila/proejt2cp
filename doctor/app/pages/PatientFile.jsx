import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, ArrowLeft, FileText, Syringe, Trash2, Eye, Pencil, X, ChevronRight } from 'lucide-react';

const allPatients = [
  { name: 'Leo Harris', id: 'P-2024-201', age: 67, blood: 'A+', diagnosis: 'Cardiac Arrhythmia', allergies: 'Penicillin', meds: 'Metoprolol 50mg', vaccinations: [{ name: 'COVID-19 (Pfizer)', date: '2024-03-15', status: 'Complete' }, { name: 'Influenza', date: '2024-10-01', status: 'Complete' }, { name: 'Hepatitis B', date: '2023-06-20', status: 'Dose 2/3' }] },
  { name: 'Sarah Jenkins', id: 'P-2024-147', age: 34, blood: 'O+', diagnosis: 'Post-op Recovery', allergies: 'None', meds: 'Ibuprofen 400mg', vaccinations: [{ name: 'COVID-19 (Moderna)', date: '2024-01-10', status: 'Complete' }, { name: 'Tetanus', date: '2023-11-05', status: 'Complete' }] },
  { name: 'Robert Chen', id: 'P-2024-189', age: 51, blood: 'B-', diagnosis: 'Pulmonary Embolism', allergies: 'Aspirin', meds: 'Warfarin 5mg', vaccinations: [{ name: 'COVID-19 (Pfizer)', date: '2024-02-20', status: 'Complete' }, { name: 'Pneumococcal', date: '2024-05-12', status: 'Complete' }] },
  { name: 'Emily Watson', id: 'P-2024-256', age: 28, blood: 'AB+', diagnosis: 'Routine Monitoring', allergies: 'Latex', meds: 'None', vaccinations: [{ name: 'COVID-19 (J&J)', date: '2024-04-08', status: 'Complete' }, { name: 'HPV', date: '2023-09-15', status: 'Dose 3/3' }] },
  { name: 'Marcus Lee', id: 'P-2024-298', age: 73, blood: 'O-', diagnosis: 'Respiratory Distress', allergies: 'Sulfa drugs', meds: 'Albuterol inhaler', vaccinations: [{ name: 'COVID-19 (Pfizer)', date: '2024-01-25', status: 'Complete' }, { name: 'Influenza', date: '2024-09-20', status: 'Complete' }, { name: 'Shingles', date: '2023-07-10', status: 'Complete' }] },
  { name: 'Alice Turner', id: 'P-2024-301', age: 45, blood: 'A-', diagnosis: 'Lab Results Pending', allergies: 'Codeine', meds: 'Lisinopril 10mg', vaccinations: [{ name: 'COVID-19 (Moderna)', date: '2024-03-01', status: 'Complete' }, { name: 'Tdap', date: '2024-02-14', status: 'Complete' }] },
];

export default function PatientFile() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState(null); // 'medical', 'vaccinations'
  const [editing, setEditing] = useState(false);
  const [patients, setPatients] = useState(allPatients);
  const [showDelete, setShowDelete] = useState(false);
  const [editData, setEditData] = useState({});

  const results = search.length > 0 ? patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase())) : [];

  const handleSelect = (p) => { setSelected(p); setSearch(''); setView(null); setEditing(false); };

  const handleDelete = () => {
    setPatients(prev => prev.filter(p => p.id !== selected.id));
    setSelected(null); setShowDelete(false); setView(null);
  };

  const startEdit = () => {
    setEditData({ diagnosis: selected.diagnosis, allergies: selected.allergies, meds: selected.meds, blood: selected.blood });
    setEditing(true);
  };

  const saveEdit = () => {
    setPatients(prev => prev.map(p => p.id === selected.id ? { ...p, ...editData } : p));
    setSelected({ ...selected, ...editData });
    setEditing(false);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => view ? (setView(null), setEditing(false)) : selected ? setSelected(null) : navigate('/doctor/patients')} className="p-2 hover:bg-[#f1f5f9] rounded-xl transition-colors">
          <ArrowLeft className="size-5 text-[#64748b]" />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-[#171c1f] tracking-tight">
            {view === 'medical' ? 'Medical File' : view === 'vaccinations' ? 'Vaccination History' : selected ? 'Patient Options' : 'Patient File Lookup'}
          </h1>
          <p className="text-sm text-[#64748b]">{selected ? selected.name + ' — ' + selected.id : 'Search for a patient by name'}</p>
        </div>
      </div>

      {/* Search (when no patient selected) */}
      {!selected && (
        <div className="max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#94a3b8]" />
            <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Type patient name to search..." className="w-full bg-white border-2 border-[#e2e8f0] rounded-2xl pl-12 pr-4 py-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#0ea5e9]/10 focus:border-[#0ea5e9] transition-all" autoFocus />
          </div>
          {results.length > 0 && (
            <div className="mt-3 bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden shadow-lg">
              {results.map(p => (
                <button key={p.id} onClick={() => handleSelect(p)} className="w-full flex items-center gap-4 px-5 py-4 hover:bg-[#f0f9ff] transition-colors border-b last:border-0 border-[#f1f5f9] text-left">
                  <div className="size-10 rounded-full bg-gradient-to-br from-[#006591] to-[#0ea5e9] flex items-center justify-center text-white text-sm font-bold shrink-0">{p.name.split(' ').map(n => n[0]).join('')}</div>
                  <div>
                    <p className="font-bold text-[#171c1f]">{p.name}</p>
                    <p className="text-xs text-[#64748b]">{p.id} • Age {p.age}</p>
                  </div>
                  <ChevronRight className="size-4 text-[#94a3b8] ml-auto" />
                </button>
              ))}
            </div>
          )}
          {search.length > 0 && results.length === 0 && (
            <p className="mt-4 text-sm text-[#94a3b8] text-center">No patients found matching "{search}"</p>
          )}
        </div>
      )}

      {/* Patient Options (when selected, no view) */}
      {selected && !view && (
        <div className="max-w-xl space-y-3">
          <button onClick={() => setView('medical')} className="w-full flex items-center gap-4 bg-white border border-[#e2e8f0] rounded-2xl p-5 hover:shadow-md hover:border-[#0ea5e9]/40 transition-all group text-left">
            <div className="size-12 rounded-xl bg-[#e0f2fe] flex items-center justify-center shrink-0"><FileText className="size-6 text-[#0369a1]" /></div>
            <div className="flex-1"><p className="font-bold text-[#171c1f] group-hover:text-[#0369a1] transition-colors">Medical File</p><p className="text-xs text-[#64748b]">View or modify the patient's medical record</p></div>
            <ChevronRight className="size-5 text-[#94a3b8] group-hover:text-[#0369a1] transition-colors" />
          </button>
          <button onClick={() => setView('vaccinations')} className="w-full flex items-center gap-4 bg-white border border-[#e2e8f0] rounded-2xl p-5 hover:shadow-md hover:border-[#0ea5e9]/40 transition-all group text-left">
            <div className="size-12 rounded-xl bg-[#ecfdf5] flex items-center justify-center shrink-0"><Syringe className="size-6 text-[#059669]" /></div>
            <div className="flex-1"><p className="font-bold text-[#171c1f] group-hover:text-[#059669] transition-colors">Vaccination History</p><p className="text-xs text-[#64748b]">View the patient's vaccination records</p></div>
            <ChevronRight className="size-5 text-[#94a3b8] group-hover:text-[#059669] transition-colors" />
          </button>
          <button onClick={() => setShowDelete(true)} className="w-full flex items-center gap-4 bg-white border border-red-200 rounded-2xl p-5 hover:shadow-md hover:bg-red-50 transition-all group text-left">
            <div className="size-12 rounded-xl bg-red-100 flex items-center justify-center shrink-0"><Trash2 className="size-6 text-red-600" /></div>
            <div className="flex-1"><p className="font-bold text-red-700">Delete Patient</p><p className="text-xs text-red-400">Permanently remove this patient from the directory</p></div>
          </button>
        </div>
      )}

      {/* Medical File View */}
      {selected && view === 'medical' && (
        <div className="max-w-2xl space-y-4">
          <div className="flex gap-3">
            {!editing ? (
              <>
                <button onClick={startEdit} className="flex items-center gap-2 px-5 py-2.5 bg-amber-100 text-amber-700 rounded-xl font-semibold text-sm hover:bg-amber-200 transition-colors"><Pencil className="size-4" /> Modify</button>
                <button onClick={() => setEditing(false)} className="flex items-center gap-2 px-5 py-2.5 bg-[#e0f2fe] text-[#0369a1] rounded-xl font-semibold text-sm"><Eye className="size-4" /> Viewing</button>
              </>
            ) : (
              <>
                <button onClick={saveEdit} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-100 text-emerald-700 rounded-xl font-semibold text-sm hover:bg-emerald-200 transition-colors">Save Changes</button>
                <button onClick={() => setEditing(false)} className="flex items-center gap-2 px-5 py-2.5 bg-[#f1f5f9] text-[#64748b] rounded-xl font-semibold text-sm hover:bg-[#e2e8f0] transition-colors">Cancel</button>
              </>
            )}
          </div>
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 space-y-5">
            <div className="flex items-center gap-4 pb-4 border-b border-[#f1f5f9]">
              <div className="size-14 rounded-full bg-gradient-to-br from-[#006591] to-[#0ea5e9] flex items-center justify-center text-white text-lg font-bold">{selected.name.split(' ').map(n => n[0]).join('')}</div>
              <div><p className="font-bold text-lg text-[#171c1f]">{selected.name}</p><p className="text-sm text-[#64748b]">{selected.id} • Age {selected.age}</p></div>
            </div>
            {[
              { label: 'Blood Type', key: 'blood' },
              { label: 'Primary Diagnosis', key: 'diagnosis' },
              { label: 'Known Allergies', key: 'allergies' },
              { label: 'Current Medications', key: 'meds' },
            ].map(field => (
              <div key={field.key}>
                <label className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider">{field.label}</label>
                {editing ? (
                  <input value={editData[field.key]} onChange={e => setEditData({ ...editData, [field.key]: e.target.value })} className="mt-1 w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]" />
                ) : (
                  <p className="mt-1 text-sm font-semibold text-[#171c1f]">{selected[field.key]}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vaccination History View */}
      {selected && view === 'vaccinations' && (
        <div className="max-w-2xl">
          <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#f1f5f9] bg-[#f8fafc]">
              <div className="grid grid-cols-3 text-xs font-bold text-[#94a3b8] uppercase tracking-wider">
                <span>Vaccine</span><span>Date</span><span>Status</span>
              </div>
            </div>
            {selected.vaccinations.map((v, i) => (
              <div key={i} className="px-6 py-4 border-b last:border-0 border-[#f1f5f9] grid grid-cols-3 items-center">
                <span className="text-sm font-semibold text-[#171c1f]">{v.name}</span>
                <span className="text-sm text-[#64748b]">{v.date}</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full w-fit ${v.status === 'Complete' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{v.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-slate-200">
            <div className="size-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="size-8 text-red-600" /></div>
            <h3 className="text-xl font-bold text-slate-900 text-center mb-2">Delete Patient?</h3>
            <p className="text-slate-500 text-center text-sm mb-6">This will permanently remove <strong>{selected.name}</strong> from the directory.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDelete(false)} className="flex-1 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
