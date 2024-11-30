'use client'
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton"

const Teacher = () => {
    const [profile, setProfile] = useState(null);
    const router = useRouter();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = sessionStorage.getItem('token');
          if (!token) {
            throw new Error('No token found');
          }
  
          const response = await fetch('http://localhost:4000/auth/profile', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'accept': '*/*',
              'Authorization': `Bearer ${token}`,
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
      };
  
      fetchData();
    }, [router]);
  
    const exit = () => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('role');
      router.push('/');
    };
  
    return (
		<div className="flex items-center justify-center min-h-screen">
		{profile ? (
		  <div className="text-center">
			<h1>Здравствуйте, {profile.username}</h1>
			<div className="flex justify-center space-x-4 mt-4">
			  <Button variant="outline" className="bg-blue text-white hover:text-blue hover:border-blue">
				Создать пару
			  </Button>
			  <Button variant="outline" className="bg-red-700 text-white hover:border-red-700 hover:text-red-700" onClick={exit}>
				Выйти
			  </Button>
			</div>
		  </div>
		) : (
			<div className="text-center">
			<Skeleton className="w-[200px] h-[30px] mb-4" />
			<div className="flex justify-center space-x-4 mt-4">
			  <Skeleton className="w-[120px] h-[40px]" />
			  <Skeleton className="w-[120px] h-[40px]" />
			</div>
		  </div>
		)}
	  </div>
    )
}
export default Teacher;
