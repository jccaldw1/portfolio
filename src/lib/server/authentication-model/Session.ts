export default class Session {
    public sessionCookie!: string;
    public sessionGrantTime!: Date;
    // The number of seconds the session is good for.
    public sessionGoodDuration!: number;

    public constructor(init?: Partial<Session>) {
        Object.assign(this, init);
    }
}