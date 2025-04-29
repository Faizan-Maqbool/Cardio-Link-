import React, { useState } from 'react';
import { Star, Heart } from 'lucide-react';

const CardioLinkFeedback = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    feedback: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovered, setIsHovered] = useState(-1);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    if (!formData.feedback.trim()) {
      newErrors.feedback = 'Feedback is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
      setIsSubmitting(false);
      // Reset form
      setFormData({
        name: '',
        email: '',
        rating: 0,
        feedback: ''
      });
    } else {
      setErrors(newErrors);
    }
  };

  if (submitted) {
    return (
      <div className={`w-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-2xl shadow-xl p-8 max-w-md mx-auto text-center`}>
        <div className="mb-6">
          <Heart className="w-16 h-16 text-red-500 mx-auto animate-bounce" />
        </div>
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Thank You!</h2>
        <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Your feedback has been submitted successfully.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
        >
          Submit Another Response
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className={`rounded-2xl shadow-xl p-8 max-w-md mx-auto ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>CardioLink Feedback</h1>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
            Help us improve CardioLink - your trusted companion for cardiac health monitoring
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.name ? 'border-red-500' : darkMode ? 'border-gray-600' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-800 placeholder-gray-500'
              }`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.email ? 'border-red-500' : darkMode ? 'border-gray-600' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-800 placeholder-gray-500'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Star Rating */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Rating
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={24}
                  className={`cursor-pointer transition-colors ${
                    star <= (isHovered !== -1 ? isHovered : formData.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : darkMode ? 'text-gray-500' : 'text-gray-300'
                  }`}
                  onMouseEnter={() => setIsHovered(star)}
                  onMouseLeave={() => setIsHovered(-1)}
                  onClick={() => setFormData({ ...formData, rating: star })}
                />
              ))}
            </div>
            {errors.rating && (
              <p className="mt-1 text-sm text-red-500">{errors.rating}</p>
            )}
          </div>

          {/* Feedback Textarea */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Your Feedback
            </label>
            <textarea
              value={formData.feedback}
              onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.feedback ? 'border-red-500' : darkMode ? 'border-gray-600' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] ${
                darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-800 placeholder-gray-500'
              }`}
              placeholder="Share your thoughts about CardioLink..."
            />
            {errors.feedback && (
              <p className="mt-1 text-sm text-red-500">{errors.feedback}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg ${
              darkMode 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
            } text-white font-medium 
              ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''} 
              transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Submitting...
              </div>
            ) : (
              'Submit Feedback'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CardioLinkFeedback;