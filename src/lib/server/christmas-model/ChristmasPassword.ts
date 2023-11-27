export default class ChristmasPassword {
    public _id!: string;
    public name!: string;
    public password: string | undefined;

    public constructor(init?: Partial<ChristmasPassword>) {
        Object.assign(this, init);
    }
}