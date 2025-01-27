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
  NoError,
}

export enum ChargeStartReason {
  Init = 0x0,
  Timer1,
  Timer2,
  Timer3,
  Immediately,
  PushButton,
}

export enum TargetSOC {
  MinSOC = 0x0,
  MaxSOC,
  Init = 0xf
}

export class BatteryControlChargeState {

  chargeMode: ChargeMode;
  chargeState: ChargeState;
  currentChargeLevel: number;
  remainingChargeTime: number;
  currentChargeRange: number;
  unitRange: number;
  current: number;
  startReason: ChargeStartReason;
  batteryClimateState: number;
  targetSOC: TargetSOC;

  constructor(chargeMode: ChargeMode, chargeState: ChargeState, currentChargeLevel: number, remainingChargeTime: number, currentChargeRange: number, unitRange: number, current: number, startReason: ChargeStartReason, batteryClimateState: number, targetSOC: TargetSOC) {
    this.chargeMode = chargeMode;
    this.chargeState = chargeState;
    this.currentChargeLevel = currentChargeLevel;
    this.remainingChargeTime = remainingChargeTime;
    this.currentChargeRange = currentChargeRange;
    this.unitRange = unitRange;
    this.current = current;
    this.startReason = startReason;
    this.batteryClimateState = batteryClimateState;
    this.targetSOC = targetSOC;
  }

  static fromMessage(message: BAPMessage) {

    const chargeMode = (message.data[0] & 0xf0) >> 4;
    const ChargeState = (message.data[0] & 0x0f);

    const currentChargeLevel = message.data[1];
  }
}
