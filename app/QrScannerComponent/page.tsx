'use client';
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useRouter } from 'next/navigation';

export const QrScannerComponent = () => {
  const [result, setResult] = useState('');
  const router = useRouter();

  const handleScan = (data: string | null) => {
    if (data) {
      setResult(data);
      router.push(`/pair/${data}`);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      <p>{result}</p>
    </div>
  );
};