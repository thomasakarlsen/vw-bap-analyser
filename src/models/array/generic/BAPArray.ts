import type { BAPMessage } from '@/models/generic/BAPMessage'

export class BAPArray {

  asgId: number
  transactionId: number
  largeIndexes: boolean
  arrayPositionTransmitted: boolean
  arrayDirectionBackward: boolean
  shiftArrayPosition: boolean
  recordAddress: number
  startIndex: number
  elements: number

  data: Array<number>;

  constructor(asgId: number, transactionId: number, largeIndexes: boolean, arrayPositionTransmitted: boolean, arrayDirectionBackward: boolean, shiftArrayPosition: boolean, recordAddress: number, startIndex: number, elements: number, data: Array<number>) {
    this.asgId = asgId
    this.transactionId = transactionId
    this.largeIndexes = largeIndexes
    this.arrayPositionTransmitted = arrayPositionTransmitted
    this.arrayDirectionBackward = arrayDirectionBackward
    this.shiftArrayPosition = shiftArrayPosition
    this.recordAddress = recordAddress
    this.startIndex = startIndex
    this.elements = elements
    this.data = data
  }

  static fromMessage(message: BAPMessage) {
    return new BAPArray(0, 0, false, false, false, false, 0, 0, 0, []);
  }
}
