import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCoachingPrograms } from '../api/coachingProgramApi';

const ProgramsPage = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    specialization: '',
    difficulty: ''
  });

  useEffect(() => {
    fetchPrograms();
  }, [filters]);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getCoachingPrograms(filters);
      setPrograms(response.data.docs || []);
    } catch (err) {
      setError('Failed to fetch programs. Please try again.');
      console.error('Error fetching programs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Programs</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchPrograms}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
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
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Coaching Programs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover professional cricket coaching programs designed to enhance your skills and take your game to the next level.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Categories</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="professional">Professional</option>
              </select>
            </div>
            <div>
              <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-2">
                Specialization
              </label>
              <select
                id="specialization"
                name="specialization"
                value={filters.specialization}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Specializations</option>
                <option value="batting">Batting</option>
                <option value="bowling">Bowling</option>
                <option value="fielding">Fielding</option>
                <option value="wicket-keeping">Wicket Keeping</option>
                <option value="all-rounder">All Rounder</option>
                <option value="fitness">Fitness</option>
                <option value="mental-coaching">Mental Coaching</option>
              </select>
            </div>
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={filters.difficulty}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Programs Grid */}
        {programs.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Programs Found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more programs.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <div key={program._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  {/* Program Image Placeholder */}
                  <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">Cricket Coaching</span>
                  </div>

                  {/* Program Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {program.title}
                  </h3>

                  {/* Coach Name */}
                  <p className="text-sm text-gray-600 mb-3">
                    Coach: <span className="font-medium">{getCoachName(program.coach)}</span>
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryBadgeColor(program.category)}`}>
                      {program.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSpecializationBadgeColor(program.specialization)}`}>
                      {program.specialization.replace('-', ' ')}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {program.description}
                  </p>

                  {/* Duration and Price */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{formatDuration(program.duration)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-bold text-green-600">{formatPrice(program.price)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Available Spots:</span>
                      <span className="font-medium">
                        {program.maxParticipants - program.currentEnrollments} / {program.maxParticipants}
                      </span>
                    </div>
                  </div>

                  {/* See More Button */}
                  <Link
                    to={`/programs/${program._id}`}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center block font-medium"
                  >
                    See More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramsPage;
