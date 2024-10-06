'use client';

import BackButton from '@/components/BackButton';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Definir esquema de validación con Zod
const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email({
      message: 'Please enter a valid email',
    }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
  confirmPassword: z.string().min(6, {
    message: 'Confirm Password is required',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

const RegisterForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para manejar el botón de registro

  // Configuración del formulario con React Hook Form y Zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Lógica para conectar a la API de registro
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true); // Deshabilitar botón durante la solicitud
    try {
      const response = await fetch('http://localhost:4001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.name,
          password: data.password,
          email: data.email,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const userId = responseData?.user?.id;
        if (userId) {
          localStorage.setItem('token', responseData.token); // Guardar token en el localStorage
          router.push(`/users/${userId}/characters`); // Redirigir a la lista de personajes
        } else {
          throw new Error('User ID not found in response');
        }
      } else {
        alert('Error during registration');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration.');
    } finally {
      setIsSubmitting(false); // Habilitar botón después de la solicitud
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Sign up by adding the info below</CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-6'
          >
            {/* Campo: Nombre */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible: ring-offset-0'
                      placeholder='Enter Name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo: Email */}
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible: ring-offset-0'
                      placeholder='Enter Email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo: Contraseña */}
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible: ring-offset-0'
                      placeholder='Enter Password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo: Confirmar contraseña */}
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      className='bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible: ring-offset-0'
                      placeholder='Enter Confirm Password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full' disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Sign Up'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
