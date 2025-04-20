import { CanIdMap, type SenderType } from '@/data/CanIdMap'
import { BAPChannels, BAPOpCodes } from '@/data/BAPChannels'
import {BAPFrame} from "@/models/generic/BAPFrame";
import {CanFrame} from "@/models/generic/CanFrame";
import { toHex } from '@/utils/toHex'
import type { GVRETLine } from '@/utils/gvret'

export class BAPMessage {

    frame: BAPFrame;
    frameParts: Array<BAPFrame>;
    messageIndex: number;
    operationId: number | null;
    deviceId: number | null;
    functionId: number | null;
    data: Array<number>;
    totalDataLength: number | null;

    constructor(frame: BAPFrame, messageIndex: number, operationId: number | null, deviceId: number | null, functionId: number | null, data: Array<number>, totalDataLength: number | null) {
        this.frame = frame;
        this.messageIndex = messageIndex;
        this.operationId = operationId;
        this.deviceId = deviceId;
        this.functionId = functionId;
        this.data = data;
        this.totalDataLength = totalDataLength;

        this.frameParts = [];
        this.frameParts.push(frame);
    }

    static fromBAPFrame(bapFrame: BAPFrame) {
        if(bapFrame.type === 'Short') {
            const operationId = (bapFrame.data[0] & 0x70) >> 4;
            const deviceId = (bapFrame.data[0] & 0x0F) << 2 | (bapFrame.data[1] & 0xC0) >> 6;
            const functionId = bapFrame.data[1] & 0x3F;
            const data = bapFrame.data.slice(2);

            return new BAPMessage(bapFrame, 0, operationId, deviceId, functionId, data, data.length);
        } else if (bapFrame.type === "LongStart") {
            const messageIndex = bapFrame.data[0] & 0x30;
            const totalDataLength = bapFrame.data[1];

            const operationId = (bapFrame.data[2] & 0x70) >> 4;
            const deviceId = (bapFrame.data[2] & 0x0F) << 2 | (bapFrame.data[3] & 0xC0) >> 6;
            const functionId = bapFrame.data[3] & 0x3F;
            const data = bapFrame.data.slice(4);

            return new BAPMessage(bapFrame, messageIndex, operationId, deviceId, functionId, data, totalDataLength);
        } else if (bapFrame.type === "LongContinuation") {
            const messageIndex = bapFrame.data[0] & 0x30;
            const data = bapFrame.data.slice(1);

            return new BAPMessage(bapFrame, messageIndex, null, null, null, data, null);
        }
    }

    static fromCanFrame(canFrame: CanFrame) {
        return BAPMessage.fromBAPFrame(BAPFrame.fromCanFrame(canFrame));
    }

    static fromGVRET(line: GVRETLine) {
        return BAPMessage.fromCanFrame(CanFrame.fromGVRET(line));
    }

    addData(data: Array<number>) {
        this.data = this.data.concat(data);
    }

    addFrame(frame: BAPFrame) {
        this.frameParts.push(frame);

        if (frame.type === 'LongContinuation') {
            this.addData(frame.data.slice(1));
        } else {
            this.addData(frame.data);
        }
    }

    get deviceIdHex() {
        if (this.deviceId === null) {
            return '';
        }

        return toHex(this.deviceId);
    }

    get functionIdHex() {
        if (this.functionId === null) {
            return '';
        }

        return toHex(this.functionId);
    }

    get operationIdHex() {
        if (this.operationId === null) {
            return '';
        }

        return toHex(this.operationId);
    }

    get channelMapping() {
        if(! CanIdMap[this.frame.id]) {
            return null;
        }

        return CanIdMap[this.frame.id];
    }

    get channel() {
        if (! this.channelMapping) {
            return null;
        }

        return BAPChannels[this.channelMapping.channel];
    }

    get device() {
        if (! (this.channel && this.deviceId)) {
            return null;
        }

        return this.channel.devices[this.deviceId];
    }

    get sender(): SenderType {
        if(! this.channelMapping) {
            return 'unknown';
        }

        return this.channelMapping.type;
    }

    get operationName() {
        if (this.operationId === null || (! BAPOpCodes[this.operationId])) {
            return 'Unknown';
        }

        return BAPOpCodes[this.operationId];
    }

    get functionName() {
        if (this.functionId === null || !(this.device && this.device.functions[this.functionId])) {
            return 'Unknown';
        }

        return this.device.functions[this.functionId].name;
    }

    get dataview() {
        if (this.functionId === null ||  !(this.device && this.device.functions[this.functionId])) {
            return 'Unknown';
        }

        return this.device.functions[this.functionId].view;
    }
}
