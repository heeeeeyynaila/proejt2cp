import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle2 } from 'lucide-react';
import BookAppointmentImport from '../../imports/BookAppointment/BookAppointment';

export default function BookAppointment() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleNavClick = (e) => {
    const text = e.target.textContent?.trim().toLowerCase() || '';
    
    // Intercept "Confirm Booking"
    if (text.includes('confirm booking') || e.target.closest('[data-name*="Button"]')?.textContent?.toLowerCase().includes('confirm booking')) {
      e.preventDefault();
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/patient/appointments');
      }, 3000);
      return;
    }

    const link = e.target.closest('[data-name*="Link"]');
    if (!link) return;
    const linkText = link.textContent?.trim().toLowerCase();
    if (linkText?.includes('dashboard'))       { e.preventDefault(); navigate('/patient'); }
    else if (linkText?.includes('my profile')) { e.preventDefault(); navigate('/patient/profile'); }
    else if (linkText?.includes('document'))   { e.preventDefault(); navigate('/patient/documents'); }
    else if (linkText?.includes('vaccination')){ e.preventDefault(); navigate('/patient/vaccinations'); }
    else if (linkText?.includes('medical file')){ e.preventDefault(); navigate('/patient/medical-file'); }
    else if (linkText?.includes('announcement')){ e.preventDefault(); navigate('/patient/announcements'); }
    else if (linkText?.includes('setting'))    { e.preventDefault(); navigate('/patient/settings'); }
  };

  return (
    <div className="w-full min-h-screen relative" onClick={handleNavClick}>
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl border border-slate-100 animate-scale-in">
            <div className="size-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="size-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h3>
            <p className="text-slate-500 mb-8">Your appointment request has been successfully sent to the clinical network.</p>
            <button 
              onClick={() => navigate('/patient/appointments')}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#006591] to-[#0ea5e9] text-white rounded-xl font-bold hover:shadow-lg transition-all"
            >
              View My Appointments
            </button>
          </div>
        </div>
      )}
      <BookAppointmentImport />
    </div>
  );
}
