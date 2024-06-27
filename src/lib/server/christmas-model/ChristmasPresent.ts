import type { ObjectId } from "mongodb";

export default class ChristmasPresent {
    public _id!: ObjectId;
    public name!: string;
    public gift!: string;
    public gotten!: boolean;

    public constructor(init?: Partial<ChristmasPresent>) {
        Object.assign(this, init);
    }
}