'use client';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton"



const Student = () => {
    const [profile, setProfile] = useState(null);
    const router = useRouter();

    const exit = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
        router.push('/');
    };

    useEffect(() => {
        const checkSession = async () => {
            const token = sessionStorage.getItem('token');
            const role = sessionStorage.getItem('role');

            if (!token || !role) {
                router.push('/');
            }
        };
        checkSession();
    }, [router]);

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
    return (
        <>
             <h1>Привет, {profile.username}</h1>
        </>
    )
}

export default Student;