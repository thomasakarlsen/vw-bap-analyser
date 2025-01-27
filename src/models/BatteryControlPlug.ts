import type { BAPMessage } from '@/models/generic/BAPMessage'

export enum LockSetup {
  Unlock = 0x0,
  Lock = 0x1,
  Init = 0xf
}

export enum LockState {
  AutoLockError = 0x0,
  UnlockError = 0x1,
  Init = 0xf
}

export enum SupplyState {
  Inactive = 0x0,
  Active = 0x1,
  ChargeStationConnected = 0x2,
  Init = 0xf
}

export enum PlugState {
  Unplugged = 0x0,
  Plugged = 0x1,
  Init = 0xf
}

export class BatteryControlPlug {

  lockSetup: LockSetup;
  lockState: LockState;
  supplyState: SupplyState;
  plugState: PlugState;

  constructor(lockSetup: LockSetup, lockState: LockState, supplyState: SupplyState, plugState: PlugState) {
    this.lockSetup = lockSetup;
    this.lockState = lockState;
    this.supplyState = supplyState;
    this.plugState = plugState;
  }

  static fromMessage(message: BAPMessage) {

    const lockSetup = (message.data[0] & 0xf0) >> 4;
    const lockState = (message.data[0] & 0x0f);
    const supplyState = (message.data[1] & 0xf0) >> 4;
    const plugState = (message.data[1] & 0x0f);

    return new BatteryControlPlug(lockSetup, lockState, supplyState, plugState);
  }
}
