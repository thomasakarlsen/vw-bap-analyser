import type { BAPMessage } from '@/models/generic/BAPMessage'

export class HeartbeatConfig {

  timeBetween: number;

  constructor(timeBetween: number) {
    this.timeBetween = timeBetween;
  }

  static fromMessage(message: BAPMessage) {
    const timeBetween = message.data[0];

    return new HeartbeatConfig(timeBetween);
  }
}
