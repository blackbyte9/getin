import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "./index";

const authClient = createAuthClient({

    baseURL: process.env.NEXT_PUBLIC_API_URL,
    plugins: [
        inferAdditionalFields<typeof auth>(),
    ],
});

export const {
    signUp,
    signOut,
    signIn,
    useSession
} = authClient;
