import type { BAPMessage } from '@/models/generic/BAPMessage'
import { BAPArray } from '@/models/array/generic/BAPArray'

export class GetArray extends BAPArray {
  constructor(asgId: number, transactionId: number, largeIndexes: boolean, arrayPositionTransmitted: boolean, arrayDirectionBackward: boolean, shiftArrayPosition: boolean, recordAddress: number, startIndex: number, elements: number, data: Array<number>) {
    super(asgId, transactionId, largeIndexes, arrayPositionTransmitted, arrayDirectionBackward, shiftArrayPosition, recordAddress, startIndex, elements, data);
  }

  static fromMessage(message: BAPMessage) {
    // ASG ID is the first 4 bits, Transaction ID is the next 4
    const asgId = message.data[0] >> 4;
    const taid = message.data[0] & 0x0F;

    // Array header mode (4 booleans / 4 bits)
    const indexSize16BitForStartElements = (message.data[1] & 0x80) === 0x80;
    const arrayPositionIsTransmitted = (message.data[1] & 0x40) === 0x40;
    const arrayDirectionIsBackward = (message.data[1] & 0x20) === 0x20;
    const shiftArrayPosition = (message.data[1] & 0x10) === 0x10;

    // Record address is the next 4 bits
    const recordAddress = message.data[1] & 0x0F;

    let startIndex = 0;
    let elements = 0;

    // Depending on if indexSize16BitForStartElements is set the startIndex and elements count is either 8 or 16 bits.
    if (indexSize16BitForStartElements) {
      // Index sizes is 16 bit
      startIndex = message.data[2] | message.data[3] << 8;
      elements = message.data[4] | message.data[5] << 8;
    } else {
      startIndex = message.data[2];
      elements = message.data[3];
    }

    // Calculate how many bytes we used
    const totalHeaderSize = indexSize16BitForStartElements ? 6 : 4;

    // The data is the rest of the message
    const data = message.data.slice(totalHeaderSize);

    return new GetArray(asgId, taid, indexSize16BitForStartElements, arrayPositionIsTransmitted, arrayDirectionIsBackward, shiftArrayPosition, recordAddress, startIndex, elements, data);
  }
}
