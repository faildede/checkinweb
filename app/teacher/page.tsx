'use client'
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { exit } from 'process';
import { useState, useEffect } from 'react';

const teacher = () => {
	const [person, setPerson] = useState(null);
	const router = useRouter();

	
	useEffect(() => {
	async function fetchData() {
		if(sessionStorage.getItem('role') !== 'teacher') { 
			router.push('/');
			return null;
		} else if (sessionStorage.getItem('token') === null) {
			router.push('/');
			return null;
		}

		
		try {
		  const response = await fetch('http://localhost:4000/auth/profile', {
			method: 'GET',
			headers: {
			  'Content-Type': 'application/json',
			  'accept': '*/*',
			  'Authorization': `Bearer ${sessionStorage.getItem('token')}`
			},
		  });
  
		  if (!response.ok) {
			throw new Error('Network response was not ok');
		  }
  
		  const data = await response.json();
		  setProfile(data);
		} catch (error) {
		  console.error('There was a problem with the fetch operation:', error);
		}
	  }
  
	  fetchData();
	}, [router]);

	console.log(person);

	const exit = () => {
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('role');
		router.push('/');
	};



    return (
        <>
            <h1>Здравствуйте,  </h1>

			<div className='flex text-2xl font-semibold'>
				<Button variant="outline" className='bg-blue text-white hover:text-blue hover:border-blue' >Создать пару</Button>
				<Button variant="outline" className='bg-red-700 text-white hover:border-red-700 hover:text-red-700' onClick={exit}>Выйти</Button>
			</div>
			
        </>
    )
}

export default teacher;
