import { BatteryControlProfileOperation } from '@/models/BatteryControlProfileOperation'
import { BatteryControlProfileOperation2 } from '@/models/BatteryControlProfileOperation2'
import type { GetArray } from '@/models/array/generic/GetArray'
import type { StatusArray } from '@/models/array/generic/StatusArray'

export class BatteryControlProfile {

    pos: number | null;
    operation: BatteryControlProfileOperation;
    operation2: BatteryControlProfileOperation2;
    maxCurrent: number;
    minChargeLevel: number;
    minRange: number;
    targetChargeLevel: number;
    targetChargeDuration: number;
    targetChargeRange: number;
    unitRange: number;
    rangeCalculationSetup: boolean;
    temperature: number;
    temperatureUnit: number;
    leadTime: number;
    holdingTimePlug: number;
    holdingTimeBattery: number;
    providerDataId: number;
    name: string;

    constructor(pos: number | null, operation: BatteryControlProfileOperation, operation2: BatteryControlProfileOperation2, maxCurrent: number, minChargeLevel: number, minRange: number, targetChargeLevel: number, targetChargeDuration: number, targetChargeRange: number, unitRange: number, rangeCalculationSetup: boolean, temperature: number, temperatureUnit: number, leadTime: number, holdingTimePlug: number, holdingTimeBattery: number, providerDataId: number, name: string) {
        this.pos = pos;
        this.operation = operation;
        this.operation2 = operation2;
        this.maxCurrent = maxCurrent;
        this.minChargeLevel = minChargeLevel;
        this.minRange = minRange;
        this.targetChargeLevel = targetChargeLevel;
        this.targetChargeDuration = targetChargeDuration;
        this.targetChargeRange = targetChargeRange;
        this.unitRange = unitRange;
        this.rangeCalculationSetup = rangeCalculationSetup;
        this.temperature = temperature;
        this.temperatureUnit = temperatureUnit;
        this.leadTime = leadTime;
        this.holdingTimePlug = holdingTimePlug;
        this.holdingTimeBattery = holdingTimeBattery;
        this.providerDataId = providerDataId;
        this.name = name;
    }

    static fromArray(array: GetArray | StatusArray, data: number[]): [BatteryControlProfile, Array<number>] {

        let pos = null

        // If the element position is transmitted, the first 8 bits contains the position
        // If the array is using large indexes, the position is 16 bits
        if (array.arrayPositionTransmitted) {
          if(array.largeIndexes) {
            pos = data[0] | data[1] << 8;
            data = data.slice(2);
          } else {
            pos = data[0];
            data = data.slice(1);
          }
        }

        let profile: BatteryControlProfile | null = null;

        // Depending on the record address, the data is parsed differently
        if (array.recordAddress === 6) {
            profile = BatteryControlProfile.takeFromDataR6(data);
            data = data.slice(4);
        } else {
            profile = BatteryControlProfile.takeFromDataR0(data);
            data = data.slice(20 + profile.name.length);
        }

        profile.pos = pos;

        return [profile, data];
    }

    private static takeFromDataR0(data: Array<number>) {

        const operation = BatteryControlProfileOperation.fromByte(data[0]);
        const operation2 = BatteryControlProfileOperation2.fromByte(data[1]);

        const maxCurrent = data[2];
        const minChargeLevel = data[3];

        // Min range is a 16 bit value, so we need to combine the two bytes
        const minRange = (data[5] << 8) + data[4];

        const targetChargeLevel = data[6];
        const targetChargeDuration = data[7];

        // Target charge range is a 16 bit value, so we need to combine the two bytes
        const targetChargeRange = (data[9] << 8) + data[8];

        const unitRange = data[10];

        // The range calculation setup is a bitmask, so we can use bitwise operations to extract the individual bits
        const rangeCalculationSetup = (data[11] & 0x01) === 0x01;

        // The temperature uses the formula (value - 100) / 10
        const temperature = (data[12] + 100) / 10;
        const temperatureUnit = data[13];

        const leadTime = data[14];
        const holdingTimePlug = data[15];
        const holdingTimeBattery = data[16];

        // The provider data ID is a 16 bit value, so we need to combine the two bytes
        const providerDataId = (data[18] << 8) + data[17];


        // Remove the first 19 bytes of the data array
        data = data.slice(19);

        // The first byte now contains the string length of the profile name
        const profileNameLength = data[0];

        // Read the profile name from the data array, it is ascii encoded with each character taking up 1 byte
        const profileName = data.slice(1, profileNameLength + 1).map(byte => String.fromCharCode(byte)).join('');


        return new BatteryControlProfile(null, operation, operation2, maxCurrent, minChargeLevel, minRange, targetChargeLevel, targetChargeDuration, targetChargeRange, unitRange, rangeCalculationSetup, temperature, temperatureUnit, leadTime, holdingTimePlug, holdingTimeBattery, providerDataId, profileName);
    }

    private static takeFromDataR6(data: Array<number>){
        const operation = BatteryControlProfileOperation.fromByte(data[0]);
        const operation2 = BatteryControlProfileOperation2.fromByte(data[1]);

        const maxCurrent = data[2];
        const targetChargeLevel = data[3];

        return new BatteryControlProfile(null, operation, operation2, maxCurrent, 0, 0, targetChargeLevel, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, '');
    }
}
