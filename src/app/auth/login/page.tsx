import LoginForm from "@/components/auth/login_form";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
            <div className="space-y-8">
                <h1 className="text-4xl font-bold">Login</h1>
            </div>
            <LoginForm />
            <p className="text-muted-foreground text-sm">
                Don&apos;t have an account? <Link href="/auth/register">Register</Link>
            </p>
        </div>
    );
}
