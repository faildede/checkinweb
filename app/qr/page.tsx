'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const QrPage = () => {
  const [qrCode, setQrCode] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const pairId = searchParams.get('pairId');

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await fetch(`http://localhost:4000/pairs/${pairId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQrCode(data.qrCode);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    if (pairId) {
      fetchQRCode();
    }
  }, [pairId]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {qrCode ? (
        <div className="text-center">
          <h1 className='text-xl '>QR Code для скнирования</h1>
          <img src={qrCode} alt="QR Code" />
        </div>
      ) : (
        <p>Loading QR Code...</p>
      )}
    </div>
  );
};

export default QrPage;