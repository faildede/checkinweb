'use client'
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  NameofPair: z.string().min(2, {
    message: 'Поле должно быть заполнено',
  }),
});

const Teacher = () => {
  const [profile, setProfile] = useState(null);
  const [pairId, setPairId] = useState('');
  const router = useRouter();

  const exit = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    router.push('/');
  };

  useEffect(() => {
    const checkSession =async () => {
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

  const createPair = async () => {
    try {
      const response = await fetch('http://localhost:4000/pairs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*',
        },
        body: JSON.stringify({ name: form.getValues().NameofPair, time: new Date().toISOString() }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPairId(data._id);
      router.push(`/qr?pairId=${data._id}`);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      NameofPair: '',
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      {profile ? (
        <div className="text-center">
          <h1>Здравствуйте, {profile.username}</h1>
          <div className="flex justify-center space-x-4 mt-4">
            <Dialog>
              <DialogTrigger className="bg-blue border-2 rounded-md p-2 text-white hover:text-blue hover:bg-white hover:border-blue">Создать пару</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Вы уверены что хотите создать пару ?</DialogTitle>
                </DialogHeader>
                <div>
                  <div className=''>
                    <Form {...form}>
                      <FormField
                        control={form.control}
                        name="NameofPair"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='text-xl font-medium'>Название пары</FormLabel>
                            <FormControl>
                              <Input placeholder="Алгоритмы и структуры данных" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className='w-full justify-between py-4'>
                        <Button variant="outline" className="bg-blue text-white hover:border-blue hover:text-blue" onClick={createPair}>
                          создать
                        </Button>
                        <Button variant="outline" className="bg-red-700 text-white hover:border-red-700 hover:text-red-700">
                          Отмена
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
                <DialogDescription>
                  После этого действия вы не сможете его отменить, создаться Qr-код который смогут отсканировать студенты и отметиться.
                </DialogDescription>
              </DialogContent>
            </Dialog>
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