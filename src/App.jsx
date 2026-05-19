import { createBrowserRouter, RouterProvider } from 'react-router';

// Auth & Landing pages
import { Landing, PatientLogin, DoctorLogin, AdminLogin } from './pages';

// Admin portal
import AdminLayout from '../admin/app/components/Layout';
import { 
  AdminDashboard, AdminDoctors, AdminPatients, AdminAppointments, 
  AdminAnnouncements, AdminSettings, AdminSchedule, AdminServices 
} from '../admin/imports';
import { 
  AddDepartment, AddDoctor, AddAnnouncement, AddService 
} from '../admin/app/pages';

// Doctor portal
import DoctorLayout from '../doctor/app/components/Layout';
import { 
  Dashboard as DoctorDashboard, Appointments as DoctorAppointments, 
  Patients as DoctorPatients, Analytics as DoctorAnalytics, 
  Settings as DoctorSettings, Notifications as DoctorNotifications, 
  Schedule as DoctorSchedule, NewAppointment as DoctorNewAppointment, 
  AddPatient as DoctorAddPatient 
} from '../doctor/app/pages';

// Patient portal
import PatientLayout from '../patient/app/components/Layout';
import { 
  Dashboard as PatientDashboard, Appointments as PatientAppointments, 
  Profile as PatientProfile, Documents as PatientDocuments, 
  Vaccinations as PatientVaccinations, MedicalFile as PatientMedicalFile, 
  Announcements as PatientAnnouncements, Settings as PatientSettings, 
  BookAppointment as PatientBookAppointment 
} from '../patient/app/pages';

// ── Admin wrapper helpers ──
const wrap = (Component) => () => (
  <div className="w-full min-h-screen">
    <div className="[&>div]:!pl-0">
      <Component />
    </div>
  </div>
);

const wrapPatient = (Component) => () => (
  <div className="w-full min-h-screen bg-[#f1f5f9] overflow-x-hidden">
    <div className="w-full h-full">
      <Component />
    </div>
  </div>
);

const router = createBrowserRouter([
  // ── Landing ──
  { path: '/', Component: Landing },

  // ── Login pages ──
  { path: '/login/patient', Component: PatientLogin },
  { path: '/login/doctor',  Component: DoctorLogin  },
  { path: '/login/admin',   Component: AdminLogin   },

  // ── Admin dashboard ──
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { index: true,              Component: wrap(AdminDashboard)     },
      { path: 'doctors',          Component: wrap(AdminDoctors)       },
      { path: 'patients',         Component: wrap(AdminPatients)      },
      { path: 'appointments',     Component: wrap(AdminAppointments)  },
      { path: 'schedule',         Component: wrap(AdminSchedule)      },
      { path: 'services',         Component: wrap(AdminServices)      },
      { path: 'announcements',    Component: wrap(AdminAnnouncements) },
      { path: 'settings',         Component: wrap(AdminSettings)      },
      { path: 'add-department',   Component: AddDepartment            },
      { path: 'add-doctor',       Component: AddDoctor                },
      { path: 'add-service',      Component: AddService               },
      { path: 'new-announcement', Component: AddAnnouncement          },
    ],
  },

  // ── Doctor dashboard ──
  {
    path: '/doctor',
    Component: DoctorLayout,
    children: [
      { index: true,              Component: DoctorDashboard       },
      { path: 'appointments',     Component: DoctorAppointments    },
      { path: 'patients',         Component: DoctorPatients        },
      { path: 'analytics',        Component: DoctorAnalytics       },
      { path: 'settings',         Component: DoctorSettings        },
      { path: 'notifications',    Component: DoctorNotifications   },
      { path: 'schedule',         Component: DoctorSchedule        },
      { path: 'new-appointment',  Component: DoctorNewAppointment  },
      { path: 'patients/new',     Component: DoctorAddPatient      },
    ],
  },

  // ── Patient dashboard ──
  {
    path: '/patient',
    Component: PatientLayout,
    children: [
      { index: true,              Component: wrapPatient(PatientDashboard)      },
      { path: 'appointments',     Component: wrapPatient(PatientAppointments)   },
      { path: 'profile',          Component: wrapPatient(PatientProfile)        },
      { path: 'documents',        Component: wrapPatient(PatientDocuments)      },
      { path: 'vaccinations',     Component: wrapPatient(PatientVaccinations)   },
      { path: 'medical-file',     Component: wrapPatient(PatientMedicalFile)    },
      { path: 'announcements',    Component: wrapPatient(PatientAnnouncements)  },
      { path: 'settings',         Component: wrapPatient(PatientSettings)       },
      { path: 'book-appointment', Component: wrapPatient(PatientBookAppointment) },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
