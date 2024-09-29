import {CanFrame} from "@/models/generic/CanFrame";
import type { GVRETLine } from '@/utils/gvret'
import { toHex } from '@/utils/toHex'

export type BAPFrameType = 'Short' | 'LongStart' | 'LongContinuation';

export class BAPFrame extends CanFrame {

    type: BAPFrameType;

    constructor(timestamp: number, id: number, type: BAPFrameType, data: Array<number>) {
        super(timestamp, id, data);
        this.type = type;
    }

    static fromCanFrame(canFrame: CanFrame) {

        const firstByte = canFrame.data[0];

        const isLongFrame = firstByte & 0x80;
        const isContinuation = firstByte & 0x40;

        const type: BAPFrameType = (isLongFrame) ? (isContinuation) ? 'LongContinuation' : 'LongStart' : 'Short';

        return new BAPFrame(canFrame.timestamp, canFrame.id, type, canFrame.data);
    }

    static fromGVRET(line: GVRETLine) {
        return BAPFrame.fromCanFrame(CanFrame.fromGVRET(line));
    }

    get idHex() {
        return toHex(this.id);
    }
}
