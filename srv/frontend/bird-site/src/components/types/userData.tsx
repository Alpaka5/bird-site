type userRoleType = {
    id: number;
    name: string;
}

export type userDetailsType = {
    username: string | null;
    email: string | null;
    user_roles: userRoleType[];
}