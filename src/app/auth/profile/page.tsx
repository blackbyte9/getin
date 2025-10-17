import SignOutButton from "@/components/auth/signout_button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function ProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if(!session) {
        return (
            <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
                <div className="space-y-8">
                    <h1 className="text-4xl font-bold">You are not logged in</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
            <div className="space-y-8">
                <h1 className="text-4xl font-bold">Profile</h1>

                <SignOutButton />

                <h2 className="text-2xl font-semibold">User Details</h2>

                <pre className="bg-gray-100 p-4 rounded">
                    {JSON.stringify(session.user, null, 2)}
                </pre>
            </div>
        </div>
    );
}
