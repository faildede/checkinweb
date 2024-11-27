export const loginUser = async (username: string, password: string) => {
	try {
	  const response = await fetch('http://localhost:4000/auth/login', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		  'accept': '*/*',
		},
		body: JSON.stringify({
		  email: username,
		  password: password,
		}),
	  });
  
	  if (!response.ok) {
		throw new Error('Network response was not ok');
	  }
  
	  const result = await response.json();
	  console.log('Access Token:', result.access_token);
	  return result.access_token;
	} catch (error) {
	  console.error('There was a problem with the fetch operation:', error);
	  throw error;
	}
  };
