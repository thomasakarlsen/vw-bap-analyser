
export type SenderType = 'unknown' | 'asg' | 'fsg';

export type CanIdMap = {
    'channel': string,
    'type': SenderType
};

export type CanIdMapArray = {
    [key: number]: CanIdMap
};

export const CanIdMap: CanIdMapArray = {
    0x17332501: {
        'channel': 'BatteryControl',
        'type': 'asg'
    },
    0x17332510: {
        'channel': 'BatteryControl',
        'type': 'fsg'
    },
    0x17333700: {
        'channel': 'ENI',
        'type': 'asg'
    },
    0x17333710: {
        'channel': 'ENI',
        'type': 'fsg'
    },
    0x17333711: {
        'channel': 'ENI',
        'type': 'asg'
    },
    0x17330D00: {
        'channel': 'DoorLocking',
        'type': 'asg'
    },
    0x17330D01: {
        'channel': 'DoorLocking',
        'type': 'asg'
    },
    0x17330D02: {
        'channel': 'DoorLocking',
        'type': 'asg'
    },
    0x17330D10: {
        'channel': 'DoorLocking',
        'type': 'fsg'
    },
};
