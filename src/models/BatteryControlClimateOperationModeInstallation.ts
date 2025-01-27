import type { BAPMessage } from '@/models/generic/BAPMessage'

export class BatteryControlClimateOperationModeInstallation {

  immediatly: boolean;
  timer1: boolean;
  timer2: boolean;
  timer3: boolean;
  timer4: boolean;

  constructor(immediatly: boolean, timer1: boolean, timer2: boolean, timer3: boolean, timer4: boolean) {
    this.immediatly = immediatly;
    this.timer1 = timer1;
    this.timer2 = timer2;
    this.timer3 = timer3;
    this.timer4 = timer4;
  }

  static fromMessage(message: BAPMessage) {

    // The message contains two bytes.
    // The first byte is always 0x00
    // The second byte contains the installation mode
    const immediatly = (message.data[1] & 0x01) !== 0;
    const timer1 = (message.data[1] & 0x02) !== 0;
    const timer2 = (message.data[1] & 0x04) !== 0;
    const timer3 = (message.data[1] & 0x08) !== 0;
    const timer4 = (message.data[1] & 0x10) !== 0;

    return new BatteryControlClimateOperationModeInstallation(immediatly, timer1, timer2, timer3, timer4);
  }
}
