'use client';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { UserProfile } from '../../utils/interfaces';
import { QrScannerComponent } from '../QrScannerComponent/page';

const Student = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const router = useRouter();

  const exit = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    router.push('/');
  };

  useEffect(() => {
    const checkSession = () => {
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

  const GoToPair = () => {
    setShowScanner(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {showScanner ? (
        <QrScannerComponent />
      ) : (
        profile ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">Привет, {profile.username}</h1>
            <Button onClick={GoToPair} className="bg-blue border-2 rounded-md p-2 text-white hover:text-blue hover:bg-white hover:border-blue">Войти на пару</Button>
            <Button onClick={exit} variant="outline" className="bg-red-700 text-white hover:border-red-700 hover:text-red-700">Выйти</Button>
          </div>
        ) : (
          <div className="text-center">
            <Skeleton className="w-[200px] h-[30px] mb-4" />
            <div className="flex justify-center space-x-4 mt-4">
              <Skeleton className="w-[120px] h-[40px]" />
              <Skeleton className="w-[120px] h-[40px]" />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Student;


