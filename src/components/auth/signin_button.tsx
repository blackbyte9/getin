"use client";

import { useSession } from "@/lib/auth/client";
import { Button } from '../ui/button';
import { useRouter } from "next/navigation";

export const LoginButton = () => {
    const router = useRouter();

    const onClick = () => {
        router.push("/auth/login");
    };
    const onClickAuth = () => {
        router.push("/auth/profile");
    };

    const {
        data: session,
    } = useSession();
    if (session) {
        return (
            <span onClick={onClickAuth} className="cursor-pointer">
                <Button size="lg" variant="secondary">
                    {session.user?.name}
                </Button>
            </span>
        );
    } else {
        return (
            <span onClick={onClick} className="cursor-pointer">
                <Button size="lg" variant="secondary">
                    Sign in
                </Button>
            </span>
        );
    }
};
