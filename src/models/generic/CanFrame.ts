import type { GVRETLine } from '@/utils/gvret'

export class CanFrame {

    timestamp: number;
    id: number;
    data: Array<number>;

    constructor(timestamp: number, id: number, data: Array<number>) {
        this.timestamp = timestamp;
        this.id = id;
        this.data = data;
    }

    static fromGVRET(line: GVRETLine) {
        let data: Array<number> = [];

        if (line.length === 1) {
            data = [line.byte1];
        } else if (line.length === 2) {
            data = [line.byte1, line.byte2];
        } else if (line.length === 3) {
            data = [line.byte1, line.byte2, line.byte3];
        } else if (line.length === 4) {
            data = [line.byte1, line.byte2, line.byte3, line.byte4];
        } else if (line.length === 5) {
            data = [line.byte1, line.byte2, line.byte3, line.byte4, line.byte5];
        } else if (line.length === 6) {
            data = [line.byte1, line.byte2, line.byte3, line.byte4, line.byte5, line.byte6];
        } else if (line.length === 7) {
            data = [line.byte1, line.byte2, line.byte3, line.byte4, line.byte5, line.byte6, line.byte7];
        } else if (line.length === 8) {
            data = [line.byte1, line.byte2, line.byte3, line.byte4, line.byte5, line.byte6, line.byte7, line.byte8];
        }

        return new CanFrame(line.timestamp, line.id, data);
    }
}
