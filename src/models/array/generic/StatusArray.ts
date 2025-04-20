import type { BAPMessage } from '@/models/generic/BAPMessage'
import { BAPArray } from '@/models/array/generic/BAPArray'

export class StatusArray extends BAPArray{

  totalElementsInList: number;

  constructor(asgId: number, transactionId: number, largeIndexes: boolean, arrayPositionTransmitted: boolean, arrayDirectionBackward: boolean, shiftArrayPosition: boolean, recordAddress: number, startIndex: number, elements: number, data: Array<number>, totalElementsInList: number) {
    super(asgId, transactionId, largeIndexes, arrayPositionTransmitted, arrayDirectionBackward, shiftArrayPosition, recordAddress, startIndex, elements, data);
    this.totalElementsInList = totalElementsInList;
  }

  static fromMessage(message: BAPMessage) {
    // ASG ID is the first 4 bits, Transaction ID is the next 4
    const asgId = message.data[0] >> 4;
    const taid = message.data[0] & 0x0F;

    // The next byte is the total number of elements in the array
    const totalNumListElements = message.data[1];

    // Array header mode (4 booleans / 4 bits)
    const indexSize16BitForStartElements = (message.data[2] & 0x80) === 0x80;
    const arrayPositionIsTransmitted = (message.data[2] & 0x40) === 0x40;
    const arrayDirectionIsBackward = (message.data[2] & 0x20) === 0x20;
    const shiftArrayPosition = (message.data[2] & 0x10) === 0x10;

    // Record address is the next 4 bits
    const recordAddress = message.data[2] & 0x0F;

    let startIndex = 0;
    let elements = 0;
    //const startIndex = indexSize16BitForStartElements ? (message.data[4] << 8) + message.data[3] : message.data[3];
    //const elements = indexSize16BitForStartElements ? (message.data[6] << 8) + message.data[5] : message.data[4];

    // Depending on if indexSize16BitForStartElements is set the startIndex and elements count is either 8 or 16 bits.
    if (indexSize16BitForStartElements) {
      // Index sizes is 16 bit
      startIndex = message.data[3] | message.data[4] << 8;
      elements = message.data[5] | message.data[6] << 8;
    } else {
      startIndex = message.data[3];
      elements = message.data[4];
    }

    // Calculate how many bytes we used
    const totalHeaderSize = indexSize16BitForStartElements ? 7 : 5;

    // The data is the rest of the message
    const data = message.data.slice(totalHeaderSize);

    return new StatusArray(asgId, taid, indexSize16BitForStartElements, arrayPositionIsTransmitted, arrayDirectionIsBackward, shiftArrayPosition, recordAddress, startIndex, elements, data, totalNumListElements);
  }
}
