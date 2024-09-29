import type { BAPMessage } from '@/models/generic/BAPMessage'

export class BatteryControlWindowheaterActivity {

  front: boolean
  rear: boolean

constructor(front: boolean, rear: boolean) {
    this.front = front
    this.rear = rear
  }

  static fromByte(byte: number) {
    return new BatteryControlWindowheaterActivity((byte & 0x10) === 0x10, (byte & 0x20) === 0x20)
  }
}
