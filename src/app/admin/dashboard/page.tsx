import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function AdminDashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        return (
            <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
                <div className="space-y-8">
                    <h1 className="text-4xl font-bold">You are not logged in</h1>
                </div>
            </div>
        );
    }

    if (session.user.role !== "ADMIN") {
        return (
            <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
                <div className="space-y-8">
                    <h1 className="text-4xl font-bold">Access Denied</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
            <div className="space-y-8">
                <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            </div>
        </div>
    );
}
