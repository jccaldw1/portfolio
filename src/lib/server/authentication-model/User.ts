import type Session from "./Session";

export default class User {
    public username!: string;
    public hashedpassword!: string;
    public session: Session | undefined;

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}