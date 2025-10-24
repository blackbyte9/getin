"use client";

import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import { signUpEmailAction } from '@/actions/auth/sign-up-user';

export default function RegisterForm() {
    const [isPending, setIsPending] = React.useState(false);

    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setIsPending(true);

        const formData = new FormData(event.target as HTMLFormElement);

        const { error } = await signUpEmailAction(formData);

        if (error) {
            toast.error(error);
            setIsPending(false);
        } else {
            toast.success("Registration complete. You're all set.");
            router.push("/");
        }

    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <Label htmlFor='name'>Name</Label>
                <Input
                    type="text"
                    id="name"
                    name="name"
                />
            </div>
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
            <Button type="submit" className='w-full' disabled={isPending}>Register</Button>
        </form>
    );
}
