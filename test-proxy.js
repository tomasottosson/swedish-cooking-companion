// Simple test script to verify proxy server is working

async function testProxy() {
  console.log('Testing proxy server...\n');

  try {
    // Test 1: Health check
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch('http://localhost:3001/health');
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);

    // Test 2: Fetch recipe
    console.log('\n2. Testing fetch-recipe endpoint...');
    const recipeResponse = await fetch('http://localhost:3001/api/fetch-recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: 'https://example.com'
      })
    });

    if (!recipeResponse.ok) {
      const error = await recipeResponse.json();
      console.log('❌ Fetch recipe error:', error);
    } else {
      const data = await recipeResponse.json();
      console.log('✅ Fetch recipe success! HTML length:', data.html?.length || 0);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n⚠️  Make sure the proxy server is running: npm run server');
  }
}

testProxy();
