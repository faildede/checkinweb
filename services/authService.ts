import { NextRouter } from 'next/router'

export const loginUser = async (username: string, password: string, router: NextRouter) => {
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
      sessionStorage.setItem('token', result.access_token);

      if (result.roles.includes('admin')) {
        router.push('/admin');
      } else if (result.roles.includes('teacher')) {
        router.push('/teacher');
      } else if (result.roles.includes('student')) {
        router.push('/student');
      } else {
        router.push('/');
      }

      return result.access_token;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
};