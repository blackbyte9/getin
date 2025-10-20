import { UserRole } from "@/generated/prisma";
import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statements = {
    ...defaultStatements,
    articles: ["create", "read", "update", "delete"],
} as const;

export const ac = createAccessControl(statements);

export const roles = {
    [UserRole.ADMIN]: ac.newRole({
        ...adminAc.statements,
        articles: ["create", "read", "update", "delete"],
    }),
    [UserRole.USER]: ac.newRole({
        articles: ["read"],
    }),
};
