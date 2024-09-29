import type { BAPMessage } from '@/models/generic/BAPMessage'
import { BatteryControlClimateMode } from '@/models/BatteryControlClimateMode'
import { BatteryControlSeatheaterActivity } from '@/models/BatteryControlSeatheaterActivity'
import { BatteryControlWindowheaterActivity } from '@/models/BatteryControlWindowheaterActivity'

export class BatteryControlClimateState {

  climateMode: BatteryControlClimateMode;
  currentTemperature: number;
  temperatureUnit: number;
  climatingTime: number;
  climateState: number;
  seatheaterWindowState: number;
  seatheaterMode:  BatteryControlSeatheaterActivity;
  windowheaterMode: BatteryControlWindowheaterActivity;

  constructor(climateMode: BatteryControlClimateMode, currentTemperature: number, temperatureUnit: number, climatingTime: number, climateState: number, seatheaterWindowState: number, seatheaterMode: BatteryControlSeatheaterActivity, windowheaterMode: BatteryControlWindowheaterActivity) {
    this.climateMode = climateMode;
    this.currentTemperature = currentTemperature;
    this.temperatureUnit = temperatureUnit;
    this.climatingTime = climatingTime;
    this.climateState = climateState;
    this.seatheaterWindowState = seatheaterWindowState;
    this.seatheaterMode = seatheaterMode;
    this.windowheaterMode = windowheaterMode;
  }

  static fromMessage(message: BAPMessage) {

    const climateMode = BatteryControlClimateMode.fromByte(message.data[0]);

    const currentTemperature = message.data[1];
    const temperatureUnit = message.data[2];

    // The climating time is a 16-bit value, with the least significant byte first

    const climatingTime = (message.data[4] << 8) | message.data[3];

    // The climate state is the leftmost 4 bits of the 5th byte
    const climateState = message.data[5] >> 4;

    const seatheaterWindowState = message.data[6];

    const seatheaterMode = BatteryControlSeatheaterActivity.fromByte(message.data[7]);
    const windowheaterMode = BatteryControlWindowheaterActivity.fromByte(message.data[7]);

    return new BatteryControlClimateState(climateMode, currentTemperature, temperatureUnit, climatingTime, climateState, seatheaterWindowState, seatheaterMode, windowheaterMode);
  }
}
