"use client";

import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth/client';
import { toast } from 'sonner';
import React from 'react';

export default function SignOutButton() {
    const [isPending, setIsPending] = React.useState(false);
    const router = useRouter();
    async function handleSignOut() {
        await signOut({}, {
            onRequest: () => {
                setIsPending(true);
            },
            onResponse: () => {
                setIsPending(false);
            },
            onSuccess: () => {
                router.push('/');
            },
            onError: (ctx) => {
                toast.error(`Error: ${ctx.error.message}`);
                setIsPending(false);
            },
        });
        router.refresh();
    }

    return (
        <Button variant="destructive" onClick={handleSignOut} disabled={isPending}>
            Sign Out
        </Button>
    );
}
