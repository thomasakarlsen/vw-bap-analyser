import type { BAPMessage } from '@/models/generic/BAPMessage'

export class BatteryControlClimateMode {

  climating: boolean
  autoDefrost: boolean
  heating: boolean
  cooling: boolean
  ventilation: boolean
  fuelBasedHeating: boolean

  constructor(climating: boolean, autoDefrost: boolean, heating: boolean, cooling: boolean, ventilation: boolean, fuelBasedHeating: boolean) {
    this.climating = climating
    this.autoDefrost = autoDefrost
    this.heating = heating
    this.cooling = cooling
    this.ventilation = ventilation
    this.fuelBasedHeating = fuelBasedHeating
  }

  static fromByte(byte: number) {
    return new BatteryControlClimateMode((byte & 0x01) === 0x01, (byte & 0x02) === 0x02, (byte & 0x04) === 0x04, (byte & 0x08) === 0x08, (byte & 0x10) === 0x10, (byte & 0x20) === 0x20)
  }
}
