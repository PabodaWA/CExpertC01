const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/programs';

async function testCoachingAPI() {
  console.log('🧪 Testing Coaching Programs API...\n');

  try {
    // Test 1: Get all programs
    console.log('1. Testing GET /api/programs');
    const response = await axios.get(BASE_URL);
    console.log('✅ Success:', response.data.success);
    console.log('📊 Programs found:', response.data.data.docs.length);
    console.log('📄 Total pages:', response.data.data.totalPages);
    console.log('');

    // Test 2: Get programs with filters
    console.log('2. Testing GET /api/programs with filters');
    const filteredResponse = await axios.get(BASE_URL, {
      params: {
        category: 'beginner',
        limit: 5
      }
    });
    console.log('✅ Success:', filteredResponse.data.success);
    console.log('📊 Filtered programs:', filteredResponse.data.data.docs.length);
    console.log('');

    // Test 3: Test with invalid ID (should return 404)
    console.log('3. Testing GET /api/programs/invalid-id');
    try {
      await axios.get(`${BASE_URL}/invalid-id`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('✅ Correctly returned 404 for invalid ID');
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    }
    console.log('');

    console.log('🎉 All API tests completed!');
    console.log('\n📝 Next steps:');
    console.log('1. Visit http://localhost:5173/programs to see the programs page');
    console.log('2. Click on "See More" to view program details');
    console.log('3. Test the authentication flow for the Enroll button');

  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

// Run the test
testCoachingAPI();
