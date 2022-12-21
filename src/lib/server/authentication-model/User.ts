export class User {
    public username!: string;
    public hashedpassword!: string;
    public sessionCookie: string | undefined;
    public sessionCookieGrantTime: string | undefined;

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}