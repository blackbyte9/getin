import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields, adminClient } from "better-auth/client/plugins";
import { auth } from "./index";
import { ac, roles } from "./permissions";

const authClient = createAuthClient({

    baseURL: process.env.NEXT_PUBLIC_API_URL,
    plugins: [
        inferAdditionalFields<typeof auth>(),
        adminClient({
            ac,
            roles,
        }),
    ],
});

export const {
    signUp,
    signOut,
    signIn,
    useSession
} = authClient;
