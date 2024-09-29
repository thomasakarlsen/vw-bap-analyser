import type { BAPMessage } from '@/models/generic/BAPMessage'
import { BAPArray } from '@/models/array/generic/BAPArray'

export class GetArray extends BAPArray {
  constructor(asgId: number, transactionId: number, largeIndexes: boolean, arrayPositionTransmitted: boolean, arrayDirectionBackward: boolean, shiftArrayPosition: boolean, recordAddress: number, startIndex: number, elements: number, data: Array<number>) {
    super(asgId, transactionId, largeIndexes, arrayPositionTransmitted, arrayDirectionBackward, shiftArrayPosition, recordAddress, startIndex, elements, data);
  }

  static fromMessage(message: BAPMessage) {
    const asgId = message.data[0] >> 4;
    const taid = message.data[0] & 0x0F;
    const indexSize16BitForStartElements = (message.data[1] & 0x80) === 0x80;
    const arrayPositionIsTransmitted = (message.data[1] & 0x40) === 0x40;
    const arrayDirectionIsBackward = (message.data[1] & 0x20) === 0x20;
    const shiftArrayPosition = (message.data[1] & 0x10) === 0x10;

    const recordAddress = message.data[1] & 0x0F;
    const startIndex = indexSize16BitForStartElements ? (message.data[3] << 8) + message.data[2] : message.data[2];
    const elements = indexSize16BitForStartElements ? (message.data[5] << 8) + message.data[4] : message.data[3];

    const totalHeaderSize = indexSize16BitForStartElements ? 6 : 4;

    // The data is the rest of the message
    const data = message.data.slice(totalHeaderSize);

    return new GetArray(asgId, taid, indexSize16BitForStartElements, arrayPositionIsTransmitted, arrayDirectionIsBackward, shiftArrayPosition, recordAddress, startIndex, elements, data);
  }
}
