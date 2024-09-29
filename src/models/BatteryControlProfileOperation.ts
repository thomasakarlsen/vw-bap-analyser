export class BatteryControlProfileOperation {

    charge: boolean;
    climate: boolean;
    climateWithoutExternalSupply: boolean;
    autoDefrost: boolean;
    seatHeaterFrontLeft: boolean;
    seatHeaterFrontRight: boolean;
    seatHeaterRearLeft: boolean;
    seatHeaterRearRight: boolean;

    constructor(charge: boolean, climate: boolean, climateWithoutExternalSupply: boolean, autoDefrost: boolean, seatHeaterFrontLeft: boolean, seatHeaterFrontRight: boolean, seatHeaterRearLeft: boolean, seatHeaterRearRight: boolean) {
        this.charge = charge;
        this.climate = climate;
        this.climateWithoutExternalSupply = climateWithoutExternalSupply;
        this.autoDefrost = autoDefrost;
        this.seatHeaterFrontLeft = seatHeaterFrontLeft;
        this.seatHeaterFrontRight = seatHeaterFrontRight;
        this.seatHeaterRearLeft = seatHeaterRearLeft;
        this.seatHeaterRearRight = seatHeaterRearRight;
    }

    static fromByte(byte: number) {
        // The byte is a bitmask, so we can use bitwise operations to extract the individual bits
        return new BatteryControlProfileOperation(
            (byte & 0x01) === 0x01,
            (byte & 0x02) === 0x02,
            (byte & 0x04) === 0x04,
            (byte & 0x08) === 0x08,
            (byte & 0x10) === 0x10,
            (byte & 0x20) === 0x20,
            (byte & 0x40) === 0x40,
            (byte & 0x80) === 0x80
        );
    }
}
