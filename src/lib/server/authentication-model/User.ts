export default class User {
    public username!: string;
    public hashedpassword!: string;

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}