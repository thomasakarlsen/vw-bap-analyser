import type { BAPMessage } from '@/models/generic/BAPMessage'
import { BatteryControlProfile } from '@/models/BatteryControlProfile'
import { GetArray } from '@/models/array/generic/GetArray'

export class BatteryControlProfileGetArray extends GetArray{

  items: Array<BatteryControlProfile>;

  constructor(asgId: number, transactionId: number, largeIndexes: boolean, arrayPositionTransmitted: boolean, arrayDirectionBackward: boolean, shiftArrayPosition: boolean, recordAddress: number, startIndex: number, elements: number, data: Array<number>, items: Array<BatteryControlProfile>) {
    super(asgId, transactionId, largeIndexes, arrayPositionTransmitted, arrayDirectionBackward, shiftArrayPosition, recordAddress, startIndex, elements, data);
    this.items = items;
  }

  static fromMessage(message: BAPMessage) {
    const baseArray = super.fromMessage(message);

    let data: number[] = baseArray.data;
    const elements: BatteryControlProfile[] = [];

    while (data.length) {
        const [element, rest] = BatteryControlProfile.fromArray(baseArray, data);
        data = rest;
        elements.push(element);
    }

    return new BatteryControlProfileGetArray(baseArray.asgId, baseArray.transactionId, baseArray.largeIndexes, baseArray.arrayPositionTransmitted, baseArray.arrayDirectionBackward, baseArray.shiftArrayPosition, baseArray.recordAddress, baseArray.startIndex, baseArray.elements, baseArray.data, elements);
  }
}
