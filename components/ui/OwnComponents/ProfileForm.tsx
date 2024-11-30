'use client'


import { useRouter } from 'next/navigation';
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
import  Image  from 'next/image';
import su from '@/app/assets/su.png';

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
      const { token, roles } = await loginUser(data.username, data.password);
      console.log('Logged in with token:', token);

      if (roles.includes('admin')) {
        router.push('/admin');
      } else if (roles.includes('teacher')) {
        router.push('/teacher');
      } else if (roles.includes('student')) {
        router.push('/student');
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-96'>
				<div className='flex justify-center'>
					<Image src={su} alt='SU' width={350} height={350} />
					</div>
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
