import type { ObjectId } from "mongodb";

export default class ChristmasPassword {
    public _id!: ObjectId;
    public name!: string;
    public password!: string | undefined;

    public constructor(init?: Partial<ChristmasPassword>) {
        Object.assign(this, init);
    }
}