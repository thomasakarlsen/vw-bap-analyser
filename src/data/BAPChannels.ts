
export type BAPOpCodes = {
    [key: number]: string
};
export const BAPOpCodes: BAPOpCodes = {
    0x00: 'Reset',
    0x01: 'Get',
    0x02: 'SetGet',
    0x03: 'HeartbeatStatus',
    0x04: 'Status',
    0x05: 'StatusAck',
    0x06: 'Ack',
    0x07: 'Error'
};

export type BAPFunctionView = 'Unknown' | 'BAPConfig' | 'GenericArray' | 'BatteryControlProfilesArray';

export type BAPFunction = {
    name: string,
    view: string
};

export type BAPDevice = {
    name: string,
    functions: {
        [key: number]: BAPFunction
    }
};


export type BAPChannel = {
    name: string,
    devices: {
        [key: number]: BAPDevice
    }
};

export type BAPChannelArray = {
    [key: string]: BAPChannel
};


export const BAPChannels: BAPChannelArray = {
    'BatteryControl': {
        name: 'BatteryControl',
        devices: {
            0x25: {
                'name': 'BatteryControl',
                functions: {
                    0x01: {
                        'name': 'GetAllProperties',
                        'view': 'Unknown'
                    },
                    0x02: {
                        'name': 'BAP-Config',
                        'view': 'BAPConfig'
                    },
                    0x03: {
                        'name': 'FunctionList',
                        'view': 'Unknown'
                    },
                    0x04: {
                        'name': 'HeartbeatConfig',
                        'view': 'HeartbeatConfig'
                    },
                    0x0E: {
                        'name': 'FSG-Setup',
                        'view': 'Unknown'
                    },
                    0x0F: {
                        'name': 'FSG-OperationState',
                        'view': 'Unknown'
                    },
                    0x10: {
                        'name': 'PlugState',
                        'view': 'BatteryControlPlug'
                    },
                    0x11: {
                        'name': 'BatteryControlChargeState',
                        'view': 'BatteryControlChargeState'
                    },
                    0x12: {
                        'name': 'BatteryControlClimateState',
                        'view': 'BatteryControlClimateState'
                    },
                    0x18: {
                        'name': 'BatteryControlClimateOperationModeInstallation',
                        'view': 'BatteryControlClimateOperationModeInstallation'
                    },
                    0x19: {
                        'name': 'BatteryControlProfilesArray',
                        'view': 'BatteryControlProfilesArray'
                    },
                    0x1A: {
                        'name': 'BatteryControlPowerProvidersArray',
                        'view': 'GenericArray'
                    }
                }
            }
        }
    },
    'ENI': {
        name: 'ExtendedNetworkInterface',
        devices: {
            0x37: {
                'name': 'BatteryControl',
                functions: {
                    0x01: {
                        'name': 'GetAllProperties',
                        'view': 'Unknown'
                    },
                    0x02: {
                        'name': 'BAP-Config',
                        'view': 'BAPConfig'
                    },
                    0x03: {
                        'name': 'FunctionList',
                        'view': 'Unknown'
                    },
                    0x04: {
                        'name': 'HeartbeatConfig',
                        'view': 'HeartbeatConfig'
                    },
                    0x0D: {
                        'name': 'FSG-Control',
                        'view': 'Unknown'
                    },
                    0x0E: {
                        'name': 'FSG-Setup',
                        'view': 'Unknown'
                    },
                    0x0F: {
                        'name': 'FSG-OperationState',
                        'view': 'Unknown'
                    },
                    0x10: {
                        'name': 'DestinationListArray',
                        'view': 'GenericArray'
                    },
                    0x11: {
                        'name': 'DestinationList_ASGcapacity',
                        'view': 'Unknown'
                    },
                    0x12: {
                        'name': 'TriggerRemoteProcess',
                        'view': 'Unknown'
                    },
                    0x13: {
                        'name': 'RemoteProcessCommands',
                        'view': 'Unknown'
                    },
                    0x15: {
                        'name': 'UserListArray',
                        'view': 'GenericArray'
                    },
                    0x16: {
                        'name': 'ServiceListArray',
                        'view': 'GenericArray'
                    },
                    0x17: {
                        'name': 'ActiveMonitorings',
                        'view': 'Unknown'
                    },
                    0x18: {
                        'name': 'PrivacySetup',
                        'view': 'Unknown'
                    },
                    0x19: {
                        'name': 'AlertListArray',
                        'view': 'GenericArray'
                    },
                    0x1A: {
                        'name': 'MobileDeviceKeyCount',
                        'view': 'Unknown'
                    },
                    0x1B: {
                        'name': 'VTANDataEncrypted',
                        'view': 'Unknown'
                    },
                    0x1D: {
                        'name': 'ConnectionState',
                        'view': 'Unknown'
                    },
                    0x1E: {
                        'name': 'ChallengeDataArray',
                        'view': 'GenericArray'
                    },
                    0x1F: {
                        'name': 'FoDListArray',
                        'view': 'GenericArray'
                    },
                    0x21: {
                        'name': 'ActiveTrip',
                        'view': 'Unknown'
                    },
                    0x22: {
                        'name': 'OLBSettings',
                        'view': 'Unknown'
                    },
                    0x23: {
                        'name': 'OLBTripListArray',
                        'view': 'GenericArray'
                    },
                    0x24: {
                        'name': 'CurrentOnlineUpdateState',
                        'view': 'Unknown'
                    },
                    0x25: {
                        'name': 'OnlineUpdateListArray',
                        'view': 'GenericArray'
                    },
                }
            }
        }
    } as BAPChannel,
    'DoorLocking': {
        name: 'DoorLocking',
        devices: {
            0x0d: {
                'name': 'DoorLocking',
                functions: {
                    0x01: {
                        'name': 'GetAllProperties',
                        'view': 'Unknown'
                    },
                    0x02: {
                        'name': 'BAP-Config',
                        'view': 'BAPConfig'
                    },
                    0x03: {
                        'name': 'FunctionList',
                        'view': 'Unknown'
                    },
                    0x04: {
                        'name': 'HeartbeatConfig',
                        'view': 'HeartbeatConfig'
                    },
                    0x0E: {
                        'name': 'FSG-Setup',
                        'view': 'Unknown'
                    },
                    0x0F: {
                        'name': 'FSG-OperationState',
                        'view': 'Unknown'
                    },
                    0x24: {
                        'name': 'UserList',
                        'view': 'GenericArray'
                    },
                }
            }
        }
    },
};


