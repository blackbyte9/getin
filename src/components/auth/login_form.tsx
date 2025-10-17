"use client";

import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { signIn } from '@/lib/auth/client';
import router from 'next/router';

export default function LoginForm() {
    const [isPending, setIsPending] = React.useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!email || !password) {
            return toast.error('Please fill in all fields');
        }

        await signIn.email({
            email,
            password,
        }, {
            onRequest: () => {
                setIsPending(true);
            },
            onResponse: () => {
                setIsPending(false);
            },
            onSuccess: () => {
                toast.success('You are logged in successfully!');
                router.push('/');
            },
            onError: (ctx) => {
                toast.error(`Error: ${ctx.error.message}`);
                setIsPending(false);
            },
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <Label htmlFor='email'>Email</Label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                />
            </div>
            <div>
                <Label htmlFor='password'>Password</Label>
                <Input
                    type="password"
                    id="password"
                    name="password"
                />
            </div>
            <Button type="submit" className='w-full' disabled={isPending}>Login</Button>
        </form>
    );
}
