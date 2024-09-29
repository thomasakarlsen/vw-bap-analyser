import type { BAPMessage } from '@/models/generic/BAPMessage'
import { BAPArray } from '@/models/array/generic/BAPArray'

export class StatusArray extends BAPArray{

  totalElementsInList: number;

  constructor(asgId: number, transactionId: number, largeIndexes: boolean, arrayPositionTransmitted: boolean, arrayDirectionBackward: boolean, shiftArrayPosition: boolean, recordAddress: number, startIndex: number, elements: number, data: Array<number>, totalElementsInList: number) {
    super(asgId, transactionId, largeIndexes, arrayPositionTransmitted, arrayDirectionBackward, shiftArrayPosition, recordAddress, startIndex, elements, data);
    this.totalElementsInList = totalElementsInList;
  }

  static fromMessage(message: BAPMessage) {
    const asgId = message.data[0] >> 4;
    const taid = message.data[0] & 0x0F;

    const totalNumListElements = message.data[1];

    const indexSize16BitForStartElements = (message.data[2] & 0x80) === 0x80;
    const arrayPositionIsTransmitted = (message.data[2] & 0x40) === 0x40;
    const arrayDirectionIsBackward = (message.data[2] & 0x20) === 0x20;
    const shiftArrayPosition = (message.data[2] & 0x10) === 0x10;

    const recordAddress = message.data[2] & 0x0F;
    const startIndex = indexSize16BitForStartElements ? (message.data[4] << 8) + message.data[3] : message.data[3];
    const elements = indexSize16BitForStartElements ? (message.data[6] << 8) + message.data[5] : message.data[4];

    const totalHeaderSize = indexSize16BitForStartElements ? 7 : 5;

    // The data is the rest of the message
    const data = message.data.slice(totalHeaderSize);

    return new StatusArray(asgId, taid, indexSize16BitForStartElements, arrayPositionIsTransmitted, arrayDirectionIsBackward, shiftArrayPosition, recordAddress, startIndex, elements, data, totalNumListElements);
  }
}
