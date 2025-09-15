import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCoachingProgram } from '../api/coachingProgramApi';

const ProgramDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchProgram();
    checkAuthentication();
  }, [id]);

  const fetchProgram = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getCoachingProgram(id);
      setProgram(response.data);
    } catch (err) {
      setError('Failed to fetch program details. Please try again.');
      console.error('Error fetching program:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkAuthentication = () => {
    try {
      const user = JSON.parse(localStorage.getItem('cx_current_user') || 'null');
      setIsAuthenticated(!!(user && user.id));
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleEnroll = () => {
    if (!isAuthenticated) {
      // Redirect to login or show login modal
      alert('Please log in to enroll in this program.');
      return;
    }
    // TODO: Implement enrollment logic
    alert('Enrollment feature coming soon!');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR'
    }).format(price);
  };

  const formatDuration = (duration) => {
    if (!duration) return 'N/A';
    return `${duration.weeks} week${duration.weeks > 1 ? 's' : ''} (${duration.sessionsPerWeek} session${duration.sessionsPerWeek > 1 ? 's' : ''}/week)`;
  };

  const getCoachName = (coach) => {
    if (!coach || !coach.userId) return 'Unknown Coach';
    return `${coach.userId.firstName || ''} ${coach.userId.lastName || ''}`.trim() || 'Unknown Coach';
  };

  const getCoachEmail = (coach) => {
    if (!coach || !coach.userId) return '';
    return coach.userId.email || '';
  };

  const getSpecializationBadgeColor = (specialization) => {
    const colors = {
      'batting': 'bg-green-100 text-green-800',
      'bowling': 'bg-blue-100 text-blue-800',
      'fielding': 'bg-yellow-100 text-yellow-800',
      'wicket-keeping': 'bg-purple-100 text-purple-800',
      'all-rounder': 'bg-indigo-100 text-indigo-800',
      'fitness': 'bg-red-100 text-red-800',
      'mental-coaching': 'bg-pink-100 text-pink-800'
    };
    return colors[specialization] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryBadgeColor = (category) => {
    const colors = {
      'beginner': 'bg-green-100 text-green-800',
      'intermediate': 'bg-yellow-100 text-yellow-800',
      'advanced': 'bg-orange-100 text-orange-800',
      'professional': 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyBadgeColor = (difficulty) => {
    const colors = {
      'easy': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'hard': 'bg-red-100 text-red-800'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !program) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-red-800 mb-2">Program Not Found</h3>
              <p className="text-red-600 mb-4">{error || 'The program you are looking for does not exist.'}</p>
              <button
                onClick={() => navigate('/programs')}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Back to Programs
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/programs')}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Programs
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              {/* Program Header */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{program.title}</h1>
                
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryBadgeColor(program.category)}`}>
                    {program.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSpecializationBadgeColor(program.specialization)}`}>
                    {program.specialization.replace('-', ' ')}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyBadgeColor(program.difficulty)}`}>
                    {program.difficulty}
                  </span>
                </div>

                {/* Program Image Placeholder */}
                <div className="w-full h-64 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-white text-2xl font-semibold">Cricket Coaching Program</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Program Description</h2>
                <p className="text-gray-700 leading-relaxed">{program.description}</p>
              </div>

              {/* Benefits */}
              {program.benefits && program.benefits.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">What You'll Learn</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {program.benefits.map((benefit, index) => (
                      <li key={index} className="text-gray-700">{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              {program.requirements && program.requirements.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Requirements</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {program.requirements.map((requirement, index) => (
                      <li key={index} className="text-gray-700">{requirement}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Materials */}
              {program.materials && program.materials.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Program Materials</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {program.materials.map((material, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <span className="text-sm font-medium text-gray-900">{material.title}</span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                            material.type === 'video' ? 'bg-red-100 text-red-800' :
                            material.type === 'document' ? 'bg-blue-100 text-blue-800' :
                            material.type === 'image' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {material.type}
                          </span>
                        </div>
                        {material.description && (
                          <p className="text-sm text-gray-600 mb-2">{material.description}</p>
                        )}
                        {material.url && (
                          <a
                            href={material.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View Material →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Program Info Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Program Details</h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">Duration</span>
                  <p className="text-gray-900">{formatDuration(program.duration)}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-600">Total Sessions</span>
                  <p className="text-gray-900">{program.totalSessions} sessions</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-600">Max Participants</span>
                  <p className="text-gray-900">{program.maxParticipants} students</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-600">Available Spots</span>
                  <p className="text-gray-900">
                    {program.maxParticipants - program.currentEnrollments} / {program.maxParticipants}
                  </p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-600">Start Date</span>
                  <p className="text-gray-900">
                    {new Date(program.startDate).toLocaleDateString()}
                  </p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-600">End Date</span>
                  <p className="text-gray-900">
                    {new Date(program.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Coach Info Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Coach Information</h3>
              
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">
                    {getCoachName(program.coach).split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900">{getCoachName(program.coach)}</h4>
                {getCoachEmail(program.coach) && (
                  <p className="text-sm text-gray-600">{getCoachEmail(program.coach)}</p>
                )}
              </div>
              
              {program.coach && program.coach.specializations && (
                <div>
                  <span className="text-sm font-medium text-gray-600">Specializations</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {program.coach.specializations.map((spec, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Price and Enroll Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-green-600">{formatPrice(program.price)}</span>
                <p className="text-sm text-gray-600">One-time payment</p>
              </div>
              
              {isAuthenticated ? (
                <button
                  onClick={handleEnroll}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Enroll Now
                </button>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-3">Please log in to enroll</p>
                  <button
                    onClick={() => navigate('/repair')}
                    className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                  >
                    Log In
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetailsPage;
