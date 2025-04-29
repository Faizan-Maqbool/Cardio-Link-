import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Search, ChevronRight, UserPlus, Star, Heart, X, Moon, Sun, MessageCircle } from 'lucide-react';
import CardioLinkFeedback from './CardioLinkFeedback';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AppointmentSchedule from './AppointmentSchedule';  
import DoctorChat from './DoctorChat';

export default function DoctorAppointmentApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const userName = 'Faizan-Maqbool';

  // Update current date time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formatted = now.toISOString().replace('T', ' ').slice(0, 19);
      setCurrentDateTime(formatted);
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  // Carousel settings
  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: "linear",
    arrows: false,
  };

  
const carouselImages = [
  {
    url: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Modern Hospital Interior"
  },
  {
    url: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Doctor Consultation"
  },
  {
    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
    alt: "Modern Hospital Interio r"
  },
  {
    url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Healthcare Professional"
  },
  {
    url: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Healthcare Professional Working"
  },
  {
    url: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Nurse Taking Care of Patient"
  },
  {
  
      url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
      alt: "Doctor Consultation"
    
  },
  {
    url: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Medical Staff During Surgery"
  },
  {
    url: "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Healthcare Professional in Emergency Room"
  }
];
  
  
  // Sample data
  const topDoctors = [
    { id: 1, name: "Dr. Sarah Amjad", specialty: "Cardiologist", rating: 4.9, reviews: 128, available: "Today" },
    { id: 2, name: "Dr. Naz", specialty: "Dermatologist", rating: 4.8, reviews: 94, available: "Tomorrow" }
  ];
  
  const upcomingAppointments = [
    { 
      id: 1, 
      doctor: "Dr. Naz", 
      specialty: "Cardiologist",
      date: "Today, 2:30 PM", 
      location: "Medical Center"
    }
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar with Carousel */}
      <div className={`fixed left-0 top-0 h-screen w-64 flex flex-col ${
        darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
      } border-r`}>
        {/* Carousel Section */}
        <div className="w-full h-48 overflow-hidden">
          <Slider {...carouselSettings}>
            {carouselImages.map((image, index) => (
              <div key={index} className="h-48">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Current Date Time Display */}
        <div className={`px-4 py-2 text-xs font-mono ${
          darkMode ? 'text-gray-400 bg-gray-800' : 'text-gray-600 bg-gray-50'
        }`}>
          {currentDateTime} UTC
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col flex-1 pt-4">
          <button 
            className={`flex flex-col items-center w-full px-4 py-3 mb-2 transition-colors duration-200 ${
              activeTab === 'home' 
                ? (darkMode ? 'text-blue-400 bg-gray-800' : 'text-blue-600 bg-blue-50') 
                : (darkMode ? 'text-gray-500 hover:bg-gray-800' : 'text-gray-400 hover:bg-gray-50')
            }`}
            onClick={() => setActiveTab('home')}
          >
            <Calendar size={24} />
            <span className="text-xs mt-1">Home</span>
          </button>
          
          
          <button 
            className={`flex flex-col items-center w-full px-4 py-3 mb-2 transition-colors duration-200 ${
              activeTab === 'appointments' 
                ? (darkMode ? 'text-blue-400 bg-gray-800' : 'text-blue-600 bg-blue-50') 
                : (darkMode ? 'text-gray-500 hover:bg-gray-800' : 'text-gray-400 hover:bg-gray-50')
            }`}
            onClick={() => setActiveTab('appointments')}
          >
            <Clock size={24} />
            <span className="text-xs mt-1">Appointments</span>
          </button>
          
          <button 
            className={`flex flex-col items-center w-full px-4 py-3 mb-2 transition-colors duration-200 ${
              activeTab === 'chat' 
                ? (darkMode ? 'text-blue-400 bg-gray-800' : 'text-blue-600 bg-blue-50') 
                : (darkMode ? 'text-gray-500 hover:bg-gray-800' : 'text-gray-400 hover:bg-gray-50')
            }`}
            onClick={() => setActiveTab('chat')}
          >
            <Heart size={24} />
            <span className="text-xs mt-1">Chat</span>
          </button>
          
          <button 
            className={`flex flex-col items-center w-full px-4 py-3 mb-2 transition-colors duration-200 ${
              activeTab === 'feedback' 
                ? (darkMode ? 'text-blue-400 bg-gray-800' : 'text-blue-600 bg-blue-50') 
                : (darkMode ? 'text-gray-500 hover:bg-gray-800' : 'text-gray-400 hover:bg-gray-50')
            }`}
            onClick={() => setActiveTab('feedback')}
          >
            <MessageCircle size={24} />
            <span className="text-xs mt-1">Feedback</span>
          </button>

          {/* User Profile Section */}
          <div className="mt-auto border-t border-gray-200 dark:border-gray-700">
            <div className={`px-4 py-3 flex items-center space-x-3 ${
              darkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className={`h-10 w-10 rounded-full ${
                darkMode ? 'bg-gray-700' : 'bg-gray-200'
              } flex items-center justify-center`}>
                <span className={`text-sm font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {userName.split('-').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${
                  darkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  {userName}
                </p>
                <p className={`text-xs ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Online
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-64">
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} p-4`}>
          {/* Header */}
          <div className="flex justify-between items-center mb-6 pt-4">
            <div>
              <h1 className="text-2xl font-bold">Hello, {userName.split('-')[0]}</h1>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>How are you feeling today?</p>
            </div>
            <div className="flex items-center">
              <button 
                onClick={toggleDarkMode} 
                className={`mr-3 p-2 rounded-full ${
                  darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <div className={`h-12 w-12 ${
                darkMode ? 'bg-blue-900' : 'bg-blue-100'
              } rounded-full flex items-center justify-center cursor-pointer`}>
                <span className={`font-semibold ${
                  darkMode ? 'text-blue-300' : 'text-blue-600'
                }`}>
                  {userName.split('-').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <input 
              type="text" 
              placeholder="Search doctors, specialties..." 
              className={`w-full p-4 pl-12 rounded-xl ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
              } shadow-sm border`}
            />
            <Search className={`absolute left-4 top-4 ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`} size={20} />
          </div>

          {/* Content based on activeTab */}
          {activeTab === 'home' && (
            <>
              {/* Main Content - Bento Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Upcoming Appointment Card - Spans 2 columns */}
                <div className={`col-span-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-sm`}>
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="font-bold">Upcoming Appointment</h2>
                    <button className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} text-sm font-medium flex items-center`}>
                      View all <ChevronRight size={16} />
                    </button>
                  </div>
                  
                  {upcomingAppointments.length > 0 ? (
                    <div className={`${darkMode ? 'bg-blue-900' : 'bg-blue-50'} rounded-xl p-3`}>
                      <div className="flex justify-between mb-2">
                        <h3 className="font-bold">{upcomingAppointments[0].doctor}</h3>
                        <button className={`${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-full h-7 w-7 flex items-center justify-center shadow-sm`}>
                          <X size={14} />
                        </button>
                      </div>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mb-2`}>
                        {upcomingAppointments[0].specialty}
                      </p>
                      <div className={`flex items-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                        <Calendar size={14} className="mr-1" />
                        <span>{upcomingAppointments[0].date}</span>
                      </div>
                      <div className={`flex items-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <MapPin size={14} className="mr-1" />
                        <span>{upcomingAppointments[0].location}</span>
                      </div>
                    </div>
                  ) : (
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-4 flex items-center justify-center`}>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>No upcoming appointments</p>
                    </div>
                  )}
                </div>
                
                {/* Quick Actions */}
                <div className={`${darkMode ? 'bg-blue-800' : 'bg-blue-600'} text-white rounded-2xl p-4 flex flex-col justify-between`}>
                  <h3 className="font-bold mb-1">Book Appointment</h3>
                  <p className={`${darkMode ? 'text-blue-200' : 'text-blue-100'} text-sm mb-3`}>Find your doctor</p>
                  <div className={`${darkMode ? 'bg-blue-700' : 'bg-blue-500'} rounded-full h-10 w-10 flex items-center justify-center self-end`}>
                    <UserPlus size={20} />
                  </div>
                </div>
                
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 flex flex-col justify-between`}>
                  <h3 className="font-bold mb-1">Find Pharmacy</h3>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mb-3`}>Nearby locations</p>
                  <div className={`${darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-600'} rounded-full h-10 w-10 flex items-center justify-center self-end`}>
                    <MapPin size={20} />
                  </div>
                </div>
              </div>
              
              {/* Top Doctors Section */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-sm mb-6`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold">Top Doctors</h2>
                  <button className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} text-sm font-medium flex items-center`}>
                    See all <ChevronRight size={16} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {topDoctors.map(doctor => (
                    <div key={doctor.id} className="flex items-center">
                      <div className={`h-12 w-12 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'} rounded-full flex items-center justify-center mr-3`}>
                        <span className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                          {doctor.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold">{doctor.name}</h3>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{doctor.specialty}</p>
                        <div className="flex items-center text-sm">
                          <Star size={14} className="text-yellow-500 mr-1" fill="currentColor" />
                          <span className="mr-2">{doctor.rating}</span>
                          <span className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>({doctor.reviews} reviews)</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} text-sm font-medium`}>
                          {doctor.available}
                        </span>
                        <Heart size={16} className={`${darkMode ? 'text-gray-600' : 'text-gray-300'} mt-2`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Feedback Button */}
              <div className="mt-8 mb-6">
                <button
                  onClick={() => setActiveTab('feedback')}
                  className={`w-full p-4 rounded-xl 
                    bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600
                    text-white shadow-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2`}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">Share Your Feedback</span>
                </button>
              </div>
            </>
          )}
              
          {activeTab === 'appointments' && <AppointmentSchedule darkMode={darkMode} />}
          {activeTab === 'chat' && <DoctorChat darkMode={darkMode} />}
          {activeTab === 'feedback' && <CardioLinkFeedback darkMode={darkMode} />}
        </div>
      </div>
    </div>
  );
}