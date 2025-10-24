"use client";

import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import { signInEmailAction } from '@/actions/auth/sign-in-user';

export default function LoginForm() {
    const [isPending, setIsPending] = React.useState(false);

    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setIsPending(true);

        const formData = new FormData(event.target as HTMLFormElement);

        const { error } = await signInEmailAction(formData);

        if (error) {
            toast.error(error);
            setIsPending(false);
        } else {
            toast.success("Login successful. Good to have you back.");
            router.push("/");
        }
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
