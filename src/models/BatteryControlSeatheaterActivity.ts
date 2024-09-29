import type { BAPMessage } from '@/models/generic/BAPMessage'

export class BatteryControlSeatheaterActivity {

  frontLeft: boolean
  frontRight: boolean
  rearLeft: boolean
  rearRight: boolean

  constructor(frontLeft: boolean, frontRight: boolean, rearLeft: boolean, rearRight: boolean) {
    this.frontLeft = frontLeft
    this.frontRight = frontRight
    this.rearLeft = rearLeft
    this.rearRight = rearRight
  }

  static fromByte(byte: number) {
    return new BatteryControlSeatheaterActivity((byte & 0x01) === 0x01, (byte & 0x02) === 0x02, (byte & 0x04) === 0x04, (byte & 0x08) === 0x08)
  }
}
