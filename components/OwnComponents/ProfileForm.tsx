'use client';
import { useRouter } from 'next/router';
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
import { Button } from '@/components/ui/button';
import { loginUser } from '@/services/authService';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Поле должно быть заполнено',
  }),
  password: z.string().min(2, {
    message: 'Это поле должно быть заполнено',
  }),
});


const AuthProfile = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const token = await loginUser(data.username, data.password, router);
      console.log('Logged in with token:', token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };



  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-96'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xl font-medium'>Имя</FormLabel>
                  <FormControl>
                    <Input placeholder="Семён" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xl font-medium'>Пароль</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='bg-blue w-full hover:bg-white hover:text-blue hover:border-2 hover:border-blue'>Войти</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AuthProfile;