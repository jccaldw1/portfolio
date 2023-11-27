export default class ChristmasPresent {
    public name!: string;
    public gift!: string;
    public gotten!: boolean;

    public constructor(init?: Partial<ChristmasPresent>) {
        Object.assign(this, init);
    }
}