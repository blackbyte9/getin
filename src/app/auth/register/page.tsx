import RegisterForm from "@/components/auth/register";

export default function RegisterPage() {
    return (
        <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
            <div className="space-y-8">
                <h1 className="text-4xl font-bold">Create an account</h1>
            </div>
            <RegisterForm />
        </div>
    );
}
