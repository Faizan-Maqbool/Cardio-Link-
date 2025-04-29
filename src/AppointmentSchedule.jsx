import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight, Filter, CheckCircle, X } from 'lucide-react';

export default function AppointmentSchedule({ darkMode = false, goBack }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentType, setAppointmentType] = useState("consultation");
  const [bookingStep, setBookingStep] = useState(1);
  
  // Sample doctors data
  const doctors = [
    { 
      id: 1, 
      name: "Dr. Sarah Amjad", 
      specialty: "Cardiologist", 
      rating: 4.9, 
      reviews: 128, 
      image: null,
      available: true 
    },
    { 
      id: 2, 
      name: "Dr. Ahmed ", 
      specialty: "Cardiologist", 
      rating: 4.8, 
      reviews: 94, 
      image: null,
      available: true
    },
    { 
      id: 3, 
      name: "Dr. Naz ", 
      specialty: "Cardiologist", 
      rating: 4.7, 
      reviews: 76, 
      image: null,
      available: false
    }
  ];
  
  // Available time slots
  const morningSlots = ["09:00", "10:00", "11:00"];
  const afternoonSlots = ["13:00", "14:00", "15:00", "16:00"];
  const eveningSlots = ["17:00", "18:00", "19:00"];
  
  // Generate dates for the next 7 days
  const next7Days = Array(7).fill().map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
  };
  
  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };
  
  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };
  
  const handleDoctorSelection = (doctor) => {
    setSelectedDoctor(doctor);
  };
  
  const nextStep = () => {
    setBookingStep(bookingStep + 1);
  };
  
  const prevStep = () => {
    setBookingStep(bookingStep - 1);
  };
  
  const completeBooking = () => {
    // Handle booking completion logic
    alert(`Appointment booked with ${selectedDoctor.name} on ${formatDate(selectedDate)} at ${selectedTime}`);
    goBack && goBack();
  };
  
  return (
    <div className={`flex flex-col w-full min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} px-2 sm:px-4`}>
      <div className="w-full max-w-xl mx-auto pb-20">
        {/* Header */}
        <div className="flex items-center justify-between py-6 border-b border-opacity-20 mb-4 border-gray-300">
          <div className="flex items-center">
            <button 
              onClick={goBack}
              className={`mr-2 p-2 rounded-full ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
            >
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-xl font-bold">{bookingStep === 1 ? "Schedule Appointment" : bookingStep === 2 ? "Select Doctor" : "Appointment Details"}</h1>
          </div>
          
          {bookingStep === 1 && (
            <button className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
              <Filter size={20} />
            </button>
          )}
        </div>
        
        {/* Step 1: Date and Time Selection */}
        {bookingStep === 1 && (
          <>
            {/* Date Selection */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Select Date</h2>
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {next7Days.map((date, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateSelection(date)}
                    className={`flex flex-col items-center min-w-20 py-3 px-4 rounded-xl ${
                      selectedDate && selectedDate.toDateString() === date.toDateString()
                        ? darkMode
                          ? 'bg-blue-700 text-white'
                          : 'bg-blue-600 text-white'
                        : darkMode
                        ? 'bg-gray-800 text-gray-300'
                        : 'bg-white text-gray-800'
                    }`}
                  >
                    <span className="text-sm font-medium">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                    <span className="text-xl font-bold mt-1">{date.getDate()}</span>
                    <span className="text-xs mt-1">{date.toLocaleDateString('en-US', { month: 'short' })}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Time Selection */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Select Time</h2>
              
              {/* Morning */}
              <div className="mb-4">
                <h3 className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Morning</h3>
                <div className="grid grid-cols-3 gap-2">
                  {morningSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelection(time)}
                      className={`py-3 rounded-lg text-center ${
                        selectedTime === time
                          ? darkMode
                            ? 'bg-blue-700 text-white'
                            : 'bg-blue-600 text-white'
                          : darkMode
                          ? 'bg-gray-800 text-gray-300'
                          : 'bg-white text-gray-800'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Afternoon */}
              <div className="mb-4">
                <h3 className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Afternoon</h3>
                <div className="grid grid-cols-3 gap-2">
                  {afternoonSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelection(time)}
                      className={`py-3 rounded-lg text-center ${
                        selectedTime === time
                          ? darkMode
                            ? 'bg-blue-700 text-white'
                            : 'bg-blue-600 text-white'
                          : darkMode
                          ? 'bg-gray-800 text-gray-300'
                          : 'bg-white text-gray-800'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Evening */}
              <div className="mb-6">
                <h3 className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Evening</h3>
                <div className="grid grid-cols-3 gap-2">
                  {eveningSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelection(time)}
                      className={`py-3 rounded-lg text-center ${
                        selectedTime === time
                          ? darkMode
                            ? 'bg-blue-700 text-white'
                            : 'bg-blue-600 text-white'
                          : darkMode
                          ? 'bg-gray-800 text-gray-300'
                          : 'bg-white text-gray-800'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Next Button */}
              <button
                onClick={nextStep}
                disabled={!selectedDate || !selectedTime}
                className={`w-full py-4 rounded-xl font-medium ${
                  selectedDate && selectedTime
                    ? darkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-600 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Next: Select Doctor
              </button>
            </div>
          </>
        )}
        
        {/* Step 2: Doctor Selection */}
        {bookingStep === 2 && (
          <>
            <div className="mb-4">
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} mb-4`}>
                <div className="flex items-center text-sm">
                  <Calendar size={16} className="mr-2" />
                  <span>Appointment on {formatDate(selectedDate)} at {selectedTime}</span>
                </div>
              </div>
              
              <h2 className="text-lg font-semibold mb-4">Select Doctor</h2>
              
              {/* Appointment Type Selection */}
              <div className="flex items-center space-x-3 mb-6 overflow-x-auto">
                <button
                  onClick={() => setAppointmentType("consultation")}
                  className={`py-2 px-4 rounded-lg text-center whitespace-nowrap ${
                    appointmentType === "consultation"
                      ? darkMode
                        ? 'bg-blue-700 text-white'
                        : 'bg-blue-600 text-white'
                      : darkMode
                      ? 'bg-gray-800 text-gray-300'
                      : 'bg-white text-gray-800'
                  }`}
                >
                  Consultation
                </button>
                <button
                  onClick={() => setAppointmentType("examination")}
                  className={`py-2 px-4 rounded-lg text-center whitespace-nowrap ${
                    appointmentType === "examination"
                      ? darkMode
                        ? 'bg-blue-700 text-white'
                        : 'bg-blue-600 text-white'
                      : darkMode
                      ? 'bg-gray-800 text-gray-300'
                      : 'bg-white text-gray-800'
                  }`}
                >
                  Examination
                </button>
                <button
                  onClick={() => setAppointmentType("follow-up")}
                  className={`py-2 px-4 rounded-lg text-center whitespace-nowrap ${
                    appointmentType === "follow-up"
                      ? darkMode
                        ? 'bg-blue-700 text-white'
                        : 'bg-blue-600 text-white'
                      : darkMode
                      ? 'bg-gray-800 text-gray-300'
                      : 'bg-white text-gray-800'
                  }`}
                >
                  Follow Up
                </button>
              </div>
              
              {/* Doctors List */}
              <div className="space-y-3 mb-6">
                {doctors.map((doctor) => (
                  <button
                    key={doctor.id}
                    onClick={() => doctor.available && handleDoctorSelection(doctor)}
                    className={`w-full flex items-center p-4 rounded-xl ${
                      !doctor.available
                        ? darkMode
                          ? 'bg-gray-800 opacity-50'
                          : 'bg-white opacity-50'
                        : selectedDoctor && selectedDoctor.id === doctor.id
                        ? darkMode
                          ? 'bg-gray-800 border-2 border-blue-600'
                          : 'bg-white border-2 border-blue-600'
                        : darkMode
                        ? 'bg-gray-800'
                        : 'bg-white'
                    }`}
                    disabled={!doctor.available}
                  >
                    <div className={`h-16 w-16 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mr-4 flex items-center justify-center`}>
                      <span className={`text-lg font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        {doctor.name.split(' ')[1][0] + doctor.name.split(' ')[0][0]}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{doctor.name}</h3>
                        {selectedDoctor && selectedDoctor.id === doctor.id && (
                          <CheckCircle size={20} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
                        )}
                      </div>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{doctor.specialty}</p>
                      <div className="flex items-center mt-1">
                        <div className={`text-sm ${darkMode ? 'text-yellow-300' : 'text-yellow-500'}`}>★ {doctor.rating}</div>
                        <span className={`mx-2 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{doctor.reviews} reviews</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={prevStep}
                  className={`flex-1 py-4 rounded-xl font-medium ${
                    darkMode
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!selectedDoctor}
                  className={`flex-1 py-4 rounded-xl font-medium ${
                    selectedDoctor
                      ? darkMode
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-600 text-white'
                      : darkMode
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        )}
        
        {/* Step 3: Appointment Details and Confirmation */}
        {bookingStep === 3 && selectedDoctor && (
          <>
            <div className="mb-6">
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} mb-6`}>
                <h2 className="text-xl font-bold mb-4">Appointment Summary</h2>
                
                {/* Doctor Info */}
                <div className="flex items-center mb-6">
                  <div className={`h-16 w-16 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mr-4 flex items-center justify-center`}>
                    <span className={`text-lg font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {selectedDoctor.name.split(' ')[1][0] + selectedDoctor.name.split(' ')[0][0]}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedDoctor.name}</h3>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{selectedDoctor.specialty}</p>
                  </div>
                </div>
                
                {/* Appointment Details */}
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-4`}>
                  <div className="flex items-center mb-3">
                    <Calendar size={18} className="mr-3" />
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Date</p>
                      <p className="font-medium">{formatDate(selectedDate)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <Clock size={18} className="mr-3" />
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Time</p>
                      <p className="font-medium">{selectedTime}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin size={18} className="mr-3" />
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Location</p>
                      <p className="font-medium">Medical Center, Floor 3</p>
                    </div>
                  </div>
                </div>
                
                {/* Appointment Type */}
                <div className="mb-4">
                  <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Appointment Type</p>
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <p className="font-medium capitalize">{appointmentType}</p>
                  </div>
                </div>
                
                {/* Notes Field */}
                <div>
                  <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Notes for Doctor (Optional)</p>
                  <textarea 
                    className={`w-full p-3 rounded-lg ${
                      darkMode 
                        ? 'bg-gray-700 text-white border-gray-600' 
                        : 'bg-gray-100 text-gray-800 border-gray-200'
                    } border`}
                    placeholder="Add any symptoms or concerns you'd like to discuss..."
                    rows={3}
                  />
                </div>
              </div>
              
              {/* Payment Summary */}
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} mb-6`}>
                <h2 className="text-lg font-bold mb-4">Payment Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Consultation Fee</span>
                    <span className="font-medium">Rs 1200.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Booking Fee</span>
                    <span className="font-medium">Rs 500.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Tax</span>
                    <span className="font-medium">Rs 100.00</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-300 border-opacity-20 pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">Rs 1800.00</span>
                  </div>
                </div>
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={prevStep}
                  className={`flex-1 py-4 rounded-xl font-medium ${
                    darkMode
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Back
                </button>
                <button
                  onClick={completeBooking}
                  className={`flex-1 py-4 rounded-xl font-medium ${
                    darkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}