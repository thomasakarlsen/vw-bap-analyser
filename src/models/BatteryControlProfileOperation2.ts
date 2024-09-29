export class BatteryControlProfileOperation2 {

    windowHeaterFront: boolean;
    windowHeaterRear: boolean;
    parkHeater: boolean;
    parkHeaterAutomatic: boolean;

    constructor(windowHeaterFront: boolean, windowHeaterRear: boolean, parkHeater: boolean, parkHeaterAutomatic: boolean) {
        this.windowHeaterFront = windowHeaterFront;
        this.windowHeaterRear = windowHeaterRear;
        this.parkHeater = parkHeater;
        this.parkHeaterAutomatic = parkHeaterAutomatic;
    }

    static fromByte(byte: number) {
        // The byte is a bitmask, so we can use bitwise operations to extract the individual bits
        return new BatteryControlProfileOperation2(
            (byte & 0x01) === 0x01,
            (byte & 0x02) === 0x02,
            (byte & 0x04) === 0x04,
            (byte & 0x08) === 0x08,
        );
    }
}
