
export const toHex = (d: Number): string => '0x' + Number(d).toString(16).padStart(2, '0');
