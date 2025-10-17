"use client";

import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth/client';
import { toast } from 'sonner';

export default function SignOutButton() {
    const router = useRouter();
    async function handleSignOut() {
        await signOut({}, {
            onRequest: () => {},
            onSuccess: () => {
                router.push('/');
            },
            onError: (ctx) => {
                toast.error(`Error: ${ctx.error.message}`);
            },
        });
        router.refresh();
    }

    return (
        <Button variant="destructive" onClick={handleSignOut}>
            Sign Out
        </Button>
    );
}
