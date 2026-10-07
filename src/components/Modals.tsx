import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Droplet,
  ShieldCheck,
  Search,
  Phone,
  User,
  AlertCircle,
  Users,
} from 'lucide-react';

/* ----------------------------------------------------
   1. DONATE NOW MODAL
----------------------------------------------------- */
interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBloodType?: string;
}

export const DonateModal: React.FC<DonateModalProps> = ({
  isOpen,
  onClose,
  initialBloodType = 'O+',
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [bloodType, setBloodType] = useState(initialBloodType);
  const [donationType, setDonationType] = useState('Whole Blood');
  const [city, setCity] = useState('Central Metro Blood Bank');
  const [date, setDate] = useState('Tomorrow, Oct 7, 2026');
  const [time, setTime] = useState('10:30 AM');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
              <Droplet className="w-4 h-4 fill-red-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Schedule Blood Donation</h2>
          </div>
          <button
            onClick={handleReset}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Appointment Confirmed!</h3>
              <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
                Thank you, <span className="font-semibold text-slate-800">{name || 'Hero'}</span>.
                Your donation slot for {donationType} ({bloodType}) is booked for {date} at {time}.
              </p>

              <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left text-xs text-slate-600 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Confirmation ID:</span>
                  <span className="font-mono font-bold text-slate-900">LF-2026-8842</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Center:</span>
                  <span className="font-semibold text-slate-900">{city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Preparation:</span>
                  <span className="text-slate-800">Drink 16oz of water & eat an iron-rich meal</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="mt-6 w-full py-3 rounded-full bg-red-600 text-white font-medium text-sm hover:bg-red-700 transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleBook} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  1. Donation Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Whole Blood', 'Power Red', 'Platelets', 'Plasma'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setDonationType(t)}
                      className={`py-2 px-3 text-xs font-medium rounded-xl border text-left transition-all ${
                        donationType === t
                          ? 'border-red-600 bg-red-50/50 text-red-700 font-semibold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  2. Blood Group
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setBloodType(type)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                        bloodType === type
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Date
                  </label>
                  <select
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full text-xs py-2 px-3 border border-slate-200 rounded-xl focus:outline-none focus:border-red-600 bg-white text-slate-900 placeholder:text-slate-400"
                  >
                    <option className="text-slate-900 bg-white">Tomorrow, Oct 7, 2026</option>
                    <option className="text-slate-900 bg-white">Thursday, Oct 8, 2026</option>
                    <option className="text-slate-900 bg-white">Friday, Oct 9, 2026</option>
                    <option className="text-slate-900 bg-white">Saturday, Oct 10, 2026</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Time Slot
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full text-xs py-2 px-3 border border-slate-200 rounded-xl focus:outline-none focus:border-red-600 bg-white text-slate-900 placeholder:text-slate-400"
                  >
                    <option className="text-slate-900 bg-white">09:00 AM</option>
                    <option className="text-slate-900 bg-white">10:30 AM</option>
                    <option className="text-slate-900 bg-white">01:00 PM</option>
                    <option className="text-slate-900 bg-white">03:30 PM</option>
                    <option className="text-slate-900 bg-white">05:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs py-2 px-3 border border-slate-200 rounded-xl focus:outline-none focus:border-red-600 text-slate-900 placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 019-2834"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs py-2 px-3 border border-slate-200 rounded-xl focus:outline-none focus:border-red-600 text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-medium text-sm hover:from-red-700 hover:to-rose-700 shadow-sm transition-all"
              >
                Confirm Appointment
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   2. BE A DONOR MODAL
----------------------------------------------------- */
interface BeDonorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BeDonorModal: React.FC<BeDonorModalProps> = ({ isOpen, onClose }) => {
  const [registered, setRegistered] = useState(false);
  const [bloodType, setBloodType] = useState('O+');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [canNotify, setCanNotify] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Register as a Donor</h2>
              <p className="text-xs text-slate-500">Join 12,000+ verified life savers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {registered ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Welcome to LifeFlow, {name}!</h3>
              <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
                You are registered as a verified <span className="font-bold text-red-600">{bloodType}</span> donor.
                When patients in your city need your blood group, we will notify you safely.
              </p>
              <div className="mt-5 p-4 rounded-2xl bg-red-50/50 border border-red-100 text-xs text-red-800 text-left">
                <span className="font-bold">Life-Saver Tip:</span> A single donation can save up to three lives. Stay well hydrated!
              </div>
              <button
                onClick={() => {
                  setRegistered(false);
                  onClose();
                }}
                className="mt-6 w-full py-3 rounded-full bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-slate-800">Quick Eligibility Criteria:</p>
                <p>• Age 18–65 years & Weight $\ge$ 50 kg (110 lbs)</p>
                <p>• Feeling healthy and strong today</p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Blood Group
                </label>
                <div className="flex flex-wrap gap-2">
                  {['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setBloodType(type)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                        bloodType === type
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs py-2 px-3 border border-slate-200 rounded-xl focus:outline-none focus:border-red-600 text-slate-900 placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    City / Neighborhood
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Seattle, Downtown"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs py-2 px-3 border border-slate-200 rounded-xl focus:outline-none focus:border-red-600 text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 234-5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs py-2 px-3 border border-slate-200 rounded-xl focus:outline-none focus:border-red-600 text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="notify"
                  checked={canNotify}
                  onChange={(e) => setCanNotify(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <label htmlFor="notify" className="text-xs text-slate-600">
                  Notify me when emergency blood requests match my type nearby
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-medium text-sm hover:from-red-700 hover:to-rose-700 shadow-sm transition-all"
              >
                Complete Donor Registration
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   3. FIND A DONOR MODAL
----------------------------------------------------- */
interface FindDonorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOCK_DONORS = [
  { id: '1', name: 'Dr. Sarah Mitchell', blood: 'O-', city: 'Downtown Medical District', distance: '1.2 miles', status: 'Available Now', phone: '+1 (555) 432-1920' },
  { id: '2', name: 'James Wilson', blood: 'O+', city: 'West End Community', distance: '2.5 miles', status: 'Available Today', phone: '+1 (555) 982-3312' },
  { id: '3', name: 'Elena Rostova', blood: 'A+', city: 'North Hills', distance: '3.1 miles', status: 'Available Now', phone: '+1 (555) 773-1029' },
  { id: '4', name: 'Marcus Chen', blood: 'B+', city: 'Riverfront Center', distance: '4.0 miles', status: 'Available Tomorrow', phone: '+1 (555) 220-4911' },
  { id: '5', name: 'Priya Sharma', blood: 'AB+', city: 'Central Park South', distance: '4.8 miles', status: 'Available Now', phone: '+1 (555) 661-8201' },
  { id: '6', name: 'David Kim', blood: 'A-', city: 'Eastside Health Hub', distance: '5.2 miles', status: 'Available Today', phone: '+1 (555) 304-9122' },
];

export const FindDonorModal: React.FC<FindDonorModalProps> = ({ isOpen, onClose }) => {
  const [filterBlood, setFilterBlood] = useState('All');
  const [requestedId, setRequestedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = filterBlood === 'All'
    ? MOCK_DONORS
    : MOCK_DONORS.filter((d) => d.blood === filterBlood);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Find Verified Donors</h2>
              <p className="text-xs text-slate-500">Directly contact verified volunteers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-semibold text-slate-500 shrink-0">Blood Group:</span>
          {['All', 'O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB+', 'AB-'].map((bg) => (
            <button
              key={bg}
              onClick={() => setFilterBlood(bg)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 ${
                filterBlood === bg
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {bg}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {filtered.map((donor) => {
            const isRequested = requestedId === donor.id;
            return (
              <div
                key={donor.id}
                className="p-4 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm transition-all flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 font-extrabold text-sm">
                    {donor.blood}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm text-slate-900">{donor.name}</h4>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {donor.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {donor.city}
                      </span>
                      <span>·</span>
                      <span>{donor.distance}</span>
                    </div>
                  </div>
                </div>

                <div>
                  {isRequested ? (
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Request Sent
                    </span>
                  ) : (
                    <button
                      onClick={() => setRequestedId(donor.id)}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-2xs"
                    >
                      Request Blood
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   4. BLOOD DONATION CAMPS MODAL
----------------------------------------------------- */
interface CampsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UPCOMING_CAMPS = [
  {
    id: 'c1',
    title: 'Metro Central Community Blood Drive',
    organizer: 'Red Cross & LifeFlow Initiative',
    date: 'Wednesday, Oct 7, 2026',
    time: '09:00 AM – 04:00 PM',
    location: 'Metropolitan Community Center, Hall A',
    slots: '24 slots remaining',
  },
  {
    id: 'c2',
    title: 'University Campus Life Saving Marathon',
    organizer: 'State Medical University',
    date: 'Friday, Oct 9, 2026',
    time: '10:00 AM – 05:30 PM',
    location: 'Student Union Pavilion, 2nd Floor',
    slots: '42 slots remaining',
  },
  {
    id: 'c3',
    title: 'Corporate Park Blood Donation Hub',
    organizer: 'TechPark Wellness Committee',
    date: 'Monday, Oct 12, 2026',
    time: '11:00 AM – 04:00 PM',
    location: 'Tower 4 Auditorium, Bay Area',
    slots: '18 slots remaining',
  },
];

export const CampsModal: React.FC<CampsModalProps> = ({ isOpen, onClose }) => {
  const [reservedCamp, setReservedCamp] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Blood Donation Camps</h2>
              <p className="text-xs text-slate-500">Upcoming community donation drives</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          {UPCOMING_CAMPS.map((camp) => {
            const isReserved = reservedCamp === camp.id;
            return (
              <div
                key={camp.id}
                className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-[15px] text-slate-900">{camp.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{camp.organizer}</p>
                  </div>
                  <span className="text-[11px] font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-full whitespace-nowrap">
                    {camp.slots}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{camp.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{camp.time}</span>
                  </div>
                  <div className="sm:col-span-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{camp.location}</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  {isReserved ? (
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Slot Reserved
                    </span>
                  ) : (
                    <button
                      onClick={() => setReservedCamp(camp.id)}
                      className="px-4 py-1.5 rounded-full text-xs font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors"
                    >
                      Reserve Free Slot
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   5. SAVE LIVES MODAL
----------------------------------------------------- */
interface SaveLivesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDonate: () => void;
}

export const SaveLivesModal: React.FC<SaveLivesModalProps> = ({ isOpen, onClose, onOpenDonate }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Your Impact: Save Lives</h2>
              <p className="text-xs text-slate-500">Every donation writes a second story</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3.5 rounded-2xl bg-red-50/60 border border-red-100">
              <div className="text-xl font-extrabold text-red-600">3</div>
              <div className="text-xs font-medium text-slate-600 mt-1">Lives Saved per Pint</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-xl font-extrabold text-slate-900">10m</div>
              <div className="text-xs font-medium text-slate-600 mt-1">Donation Process</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-xl font-extrabold text-slate-900">56d</div>
              <div className="text-xs font-medium text-slate-600 mt-1">Recovery Interval</div>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-slate-600">
            <div className="p-3 rounded-xl bg-slate-50 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-900">Red Blood Cells:</strong> Used for surgical patients, trauma victims, and severe anemia treatments.
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-900">Platelets:</strong> Vital for leukemia, chemotherapy patients, and organ transplant recovery.
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-900">Plasma:</strong> Essential for burn survivors, clotting disorders, and immune globulin therapies.
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenDonate();
            }}
            className="w-full mt-2 py-3 rounded-full bg-red-600 text-white font-medium text-sm hover:bg-red-700 shadow-sm transition-all"
          >
            Schedule Your Donation Today
          </button>
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   6. GLOBAL SEARCH MODAL
----------------------------------------------------- */
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (type: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectAction }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const quickItems = [
    { label: 'Find O- Donors in my city', type: 'find-donor' },
    { label: 'Schedule Whole Blood appointment', type: 'donate' },
    { label: 'Upcoming community donation camps', type: 'camps' },
    { label: 'Check blood group compatibility', type: 'save-lives' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search donors, blood camps, blood types (e.g. O-, A+)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm bg-transparent border-none focus:outline-none text-slate-900 placeholder:text-slate-400 font-medium"
          />
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-1">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">
            Suggested Quick Actions
          </p>
          {quickItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                onClose();
                onSelectAction(item.type);
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium text-slate-700 hover:bg-red-50 hover:text-red-700 transition-colors flex items-center justify-between"
            >
              <span>{item.label}</span>
              <span className="text-slate-400 text-[11px]">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   7. ABOUT MODAL
----------------------------------------------------- */
interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">About LifeFlow</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            <strong className="text-slate-900">LifeFlow</strong> is a non-profit donor network dedicated to eliminating emergency blood shortages.
            By connecting verified volunteer donors directly with local medical centers and patients, we reduce emergency response delays from hours to minutes.
          </p>
          <div className="grid grid-cols-2 gap-3 pt-2 text-center">
            <div className="p-3 bg-slate-50 rounded-xl">
              <div className="text-xl font-bold text-red-600">48,000+</div>
              <div className="text-xs text-slate-500">Verified Donors</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <div className="text-xl font-bold text-slate-900">120+</div>
              <div className="text-xs text-slate-500">Partner Hospitals</div>
            </div>
          </div>
          <p className="text-xs text-slate-500 pt-2">
            Safety First: Every donor undergoes screening in compliance with national health authority guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   8. CONTACT MODAL
----------------------------------------------------- */
interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Emergency & Contact</h2>
            <p className="text-xs text-slate-500">24/7 Rapid Donor Dispatch Support</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="p-4 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-red-900">24/7 Emergency Blood Hotline</p>
                <p className="text-base font-bold text-red-700">1-800-LIFEFLOW (543-3356)</p>
              </div>
            </div>
          </div>

          {submitted ? (
            <div className="text-center py-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-900">Emergency Request Received</p>
              <p className="text-xs text-slate-500 mt-1">Our coordinator will contact your hospital within 5 minutes.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Hospital / Patient Name</label>
                <input
                  type="text"
                  required
                  placeholder="St. Jude Memorial Hospital - ICU Bed 4"
                  className="w-full text-xs py-2 px-3 border border-slate-200 rounded-xl focus:outline-none focus:border-red-600 text-slate-900 placeholder:text-slate-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Required Blood Group</label>
                  <select className="w-full text-xs py-2 px-3 border border-slate-200 rounded-xl focus:outline-none focus:border-red-600 bg-white text-slate-900 placeholder:text-slate-400">
                    <option className="text-slate-900 bg-white">O- Negative (Urgent)</option>
                    <option className="text-slate-900 bg-white">O+ Positive</option>
                    <option className="text-slate-900 bg-white">A- Negative</option>
                    <option className="text-slate-900 bg-white">A+ Positive</option>
                    <option className="text-slate-900 bg-white">B- Negative</option>
                    <option className="text-slate-900 bg-white">B+ Positive</option>
                    <option className="text-slate-900 bg-white">AB- Negative</option>
                    <option className="text-slate-900 bg-white">AB+ Positive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Units Needed</label>
                  <input
                    type="number"
                    min="1"
                    defaultValue="2"
                    className="w-full text-xs py-2 px-3 border border-slate-200 rounded-xl focus:outline-none focus:border-red-600 text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-red-600 text-white font-medium text-xs hover:bg-red-700 transition-colors"
              >
                Dispatch Emergency Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
