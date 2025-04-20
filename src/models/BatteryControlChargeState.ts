import type { BAPMessage } from '@/models/generic/BAPMessage'

export enum ChargeMode {
  Off = 0x0,
  AC,
  DC,
  Conditioning,
  ACAndConditioning,
  DCAndConditioning,
  Init = 0xf
}

export enum ChargeState {
  Init = 0x0,
  Idle,
  Running,
  ConservationCharging,
  AbortedTemperatureTooLow,
  AbortedGeneralDeviceError,
  AbortedPowerSupplyNotAvailable,
  AbortedNotInParkPosition,
  Completed,
  NoError
}

export enum ChargeStartReason {
  Init = 0x0,
  Timer1,
  Timer2,
  Timer3,
  Immediately,
  PushButton
}

export enum TargetSOC {
  MinSOC = 0x0,
  MaxSOC,
  Init = 0xf
}

export class BatteryControlChargeState {
  chargeMode: ChargeMode
  chargeState: ChargeState
  currentChargeLevel: number
  remainingChargeTime: number
  currentChargeRange: number
  unitRange: number
  current: number
  startReason: ChargeStartReason
  batteryClimateState: number
  targetSOC: TargetSOC

  constructor(
    chargeMode: ChargeMode,
    chargeState: ChargeState,
    currentChargeLevel: number,
    remainingChargeTime: number,
    currentChargeRange: number,
    unitRange: number,
    current: number,
    startReason: ChargeStartReason,
    batteryClimateState: number,
    targetSOC: TargetSOC
  ) {
    this.chargeMode = chargeMode
    this.chargeState = chargeState
    this.currentChargeLevel = currentChargeLevel
    this.remainingChargeTime = remainingChargeTime
    this.currentChargeRange = currentChargeRange
    this.unitRange = unitRange
    this.current = current
    this.startReason = startReason
    this.batteryClimateState = batteryClimateState
    this.targetSOC = targetSOC
  }

  static fromMessage(message: BAPMessage) {
    const chargeMode = (message.data[0] & 0xf0) >> 4
    const chargeState = message.data[0] & 0x0f

    const currentChargeLevel = message.data[1]

    const remainingChargeTime = message.data[2]
    const currentChargeRange = message.data[3]
    const unitRange = message.data[4]
    const current = message.data[5]
    const batteryClimateState = (message.data[6] & 0xf0) >> 4
    const startReason = (message.data[8] & 0xf0) >> 4
    const targetSOC = message.data[8] & 0x0f

    return new BatteryControlChargeState(
      chargeMode,
      chargeState,
      currentChargeLevel,
      remainingChargeTime,
      currentChargeRange,
      unitRange,
      current,
      startReason,
      batteryClimateState,
      targetSOC
    )
  }
}
