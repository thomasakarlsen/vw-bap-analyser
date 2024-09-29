import type { BAPMessage } from '@/models/generic/BAPMessage'

export class BAPConfig {

  majorVersion: number;
  minorVersion: number;
  lsgClass: number;
  lsgSubClass: number;
  lsgMajorVersion: number;
  lsgMinorVersion: number;

  constructor(majorVersion: number, minorVersion: number, lsgClass: number, lsgSubClass: number, lsgMajorVersion: number, lsgMinorVersion: number) {
    this.majorVersion = majorVersion;
    this.minorVersion = minorVersion;
    this.lsgClass = lsgClass;
    this.lsgSubClass = lsgSubClass;
    this.lsgMajorVersion = lsgMajorVersion;
    this.lsgMinorVersion = lsgMinorVersion;
  }

  static fromMessage(message: BAPMessage) {
    return new BAPConfig(message.data[0], message.data[1], message.data[2], message.data[3], message.data[4], message.data[5]);
  }
}
