'use client';

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
import Cookies from 'js-cookie'; // Importar Cookies para manejar las cookies

// Definir el esquema de validación usando Zod
const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email({
      message: 'Please enter a valid email',
    }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
});

const LoginForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Para manejar el estado de envío

  // Configurar el formulario usando React Hook Form con Zod para la validación
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Lógica de autenticación conectada a la API
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true); // Deshabilitar el botón mientras se realiza la solicitud
    setErrorMessage(null); // Reiniciar el mensaje de error

    try {
      const response = await fetch('http://localhost:4001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.email, // Asumiendo que "email" actúa como el "username"
          password: data.password,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();

        // Guardar el token y el usuario en las cookies
        Cookies.set('token', responseData.token, { expires: 7 });
        Cookies.set('user', JSON.stringify(responseData.user), { expires: 7 });

        // Redirigir al usuario después del login exitoso
        router.push(`/characters`);
      } else {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred during login.');
    } finally {
      setIsSubmitting(false); // Habilitar el botón nuevamente
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Log into your account with your credentials</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Mensaje de error si ocurre algún problema durante el login */}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            {/* Campo: Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible: ring-offset-0"
                      placeholder="Enter Email"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible: ring-offset-0"
                      placeholder="Enter Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Botón de inicio de sesión */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
