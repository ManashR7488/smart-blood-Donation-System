import { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaCalendar, FaTint, FaClipboardList, FaSearch, FaChevronLeft, FaChevronRight, FaHeartbeat, FaLock, FaCalendarCheck, FaVial, FaMicroscope, FaDna } from 'react-icons/fa';

const Scheduled = () => {
  // State for selected values
  const [selectedLocation, setSelectedLocation] = useState('City Blood Center');
  const [selectedDate, setSelectedDate] = useState('14');
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [selectedType, setSelectedType] = useState('Whole Blood');
  const [currentMonth, setCurrentMonth] = useState('August 2023');

  // Sample data
  const locations = [
    { name: 'City Blood Center', address: '123 Main St, Suite 100', distance: '0.5 miles away' },
    { name: 'Downtown Hospital', address: '456 Oak Ave', distance: '1.2 miles away' },
    { name: 'Westside Clinic', address: '789 Pine Rd', distance: '3.5 miles away' },
    { name: 'North Medical', address: '321 Elm Blvd', distance: '5.1 miles away' },
  ];

  const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

  const donationTypes = [
    { name: 'Whole Blood', icon: <FaTint />, duration: '(Most common)' },
    { name: 'Plasma', icon: <FaVial />, duration: '(90 min)' },
    { name: 'Platelets', icon: <FaMicroscope />, duration: '(2 hours)' },
    { name: 'Double Red', icon: <FaDna />, duration: '(30 min)' },
  ];

  // Calendar days - would be dynamic in a real app
  const calendarDays = [
    { day: '30', disabled: true },
    { day: '31', disabled: true },
    { day: '1', disabled: false },
    { day: '2', disabled: false },
    { day: '3', disabled: false },
    { day: '4', disabled: false },
    { day: '5', disabled: false },
    { day: '6', disabled: false },
    { day: '7', disabled: false },
    { day: '8', disabled: false },
    { day: '9', disabled: false },
    { day: '10', disabled: false },
    { day: '11', disabled: false },
    { day: '12', disabled: false },
    { day: '13', disabled: false },
    { day: '14', disabled: false },
    { day: '15', disabled: false },
    { day: '16', disabled: false },
    { day: '17', disabled: false },
    { day: '18', disabled: false },
    { day: '19', disabled: false },
    { day: '20', disabled: false },
    { day: '21', disabled: false },
    { day: '22', disabled: false },
    { day: '23', disabled: false },
    { day: '24', disabled: false },
    { day: '25', disabled: false },
    { day: '26', disabled: false },
    { day: '27', disabled: false },
    { day: '28', disabled: false },
    { day: '29', disabled: false },
    { day: '30', disabled: false },
    { day: '31', disabled: false },
    { day: '1', disabled: true },
    { day: '2', disabled: true },
  ];

  const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="min-h-screen bg-rose-50 text-rose-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 flex justify-center items-center gap-2">
            <FaCalendarAlt className="text-rose-700" /> Schedule Your Donation
          </h1>
          <p className="text-gray-600 text-lg">
            Book an appointment that fits your schedule and helps save lives
          </p>
        </header>

        {/* Eligibility Alert */}
        <div className="bg-rose-50 border-l-4 border-rose-700 p-4 rounded-r-lg mb-8 flex items-center gap-4">
          <FaHeartbeat className="text-2xl text-rose-700" />
          <div>
            <p className="font-medium">
              <strong>Eligibility Check:</strong> Based on your last donation on June 15, you're eligible to donate again starting August 10.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* Main Scheduling Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            {/* Location Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-rose-700" /> Select Location
              </h2>
              <div className="relative mb-4">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-700" />
                <input
                  type="text"
                  placeholder="Search by location or postal code"
                  className="w-full pl-10 pr-4 py-3 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {locations.map((location) => (
                  <div
                    key={location.name}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedLocation === location.name
                        ? 'border-rose-700 bg-rose-50 shadow-[0_0_0_2px] shadow-rose-700'
                        : 'border-rose-300 hover:border-rose-700 hover:bg-rose-50'
                    }`}
                    onClick={() => setSelectedLocation(location.name)}
                  >
                    <div className="font-semibold">{location.name}</div>
                    <div className="text-sm text-gray-600">{location.address}</div>
                    <div className="text-sm text-gray-600">{location.distance}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Date/Time Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaCalendar className="text-rose-700" /> Select Date & Time
              </h2>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <button className="text-rose-700 text-xl">
                    <FaChevronLeft />
                  </button>
                  <span className="font-semibold">{currentMonth}</span>
                  <button className="text-rose-700 text-xl">
                    <FaChevronRight />
                  </button>
                </div>
                <button className="text-sm px-3 py-1 bg-rose-100 text-rose-700 rounded-md">
                  Today
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-6">
                {dayHeaders.map((day) => (
                  <div key={day} className="text-center font-semibold text-sm text-rose-700 py-2">
                    {day}
                  </div>
                ))}
                {calendarDays.map((dayObj, index) => (
                  <div
                    key={index}
                    className={`aspect-square flex items-center justify-center rounded-lg cursor-pointer transition-all ${
                      dayObj.disabled
                        ? 'text-rose-300 cursor-not-allowed'
                        : dayObj.day === selectedDate
                        ? 'bg-rose-700 text-white'
                        : 'hover:bg-rose-50'
                    }`}
                    onClick={() => !dayObj.disabled && setSelectedDate(dayObj.day)}
                  >
                    {dayObj.day}
                  </div>
                ))}
              </div>

              <h3 className="font-semibold mt-6 mb-3">Available Time Slots</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {timeSlots.map((time) => (
                  <div
                    key={time}
                    className={`py-2 text-center border rounded-lg cursor-pointer transition-all ${
                      selectedTime === time
                        ? 'bg-rose-700 text-white border-rose-700'
                        : 'border-rose-300 hover:border-rose-700'
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>

            {/* Donation Type */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaTint className="text-rose-700" /> Donation Type
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {donationTypes.map((type) => (
                  <div
                    key={type.name}
                    className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${
                      selectedType === type.name
                        ? 'bg-rose-50 border-rose-700 shadow-[0_0_0_2px] shadow-rose-700'
                        : 'border-rose-300 hover:border-rose-700'
                    }`}
                    onClick={() => setSelectedType(type.name)}
                  >
                    <div className="text-2xl text-rose-700 mb-2 flex justify-center">{type.icon}</div>
                    <div>{type.name}</div>
                    <div className="text-sm text-gray-600">{type.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="bg-white rounded-xl p-6 shadow-sm h-fit sticky top-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaClipboardList className="text-rose-700" /> Appointment Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{selectedLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">August {selectedDate}, 2023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium">{selectedType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">
                  {selectedType === 'Whole Blood' ? '45 minutes' : 
                   selectedType === 'Plasma' ? '90 minutes' :
                   selectedType === 'Platelets' ? '2 hours' : '30 minutes'}
                </span>
              </div>
            </div>

            <div className="border-b border-rose-300 my-6"></div>

            <div className="flex justify-between">
              <span className="text-gray-600">Next Eligible:</span>
              <span className="font-medium">October 9, 2023</span>
            </div>

            <div className="border-b border-rose-300 my-6"></div>

            <button className="w-full bg-rose-700 hover:bg-rose-800 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
              <FaCalendarCheck /> Confirm Appointment
            </button>

            <div className="text-center mt-4 text-sm text-gray-600 flex items-center justify-center gap-1">
              <FaLock /> Your information is secure
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduled;