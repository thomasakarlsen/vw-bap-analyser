import { BAPMessage } from '@/models/generic/BAPMessage'
import Papa from 'papaparse'
import { CanIdMap } from '@/data/CanIdMap'

export type  RawGVRETLine = {
  'Time Stamp': string;
  ID: string;
  Extended: string;
  Dir: string;
  Bus: string;
  LEN: string;
  D1: string;
  D2: string;
  D3: string;
  D4: string;
  D5: string;
  D6: string;
  D7: string;
  D8: string
};

export type GVRETDirection = 'Rx' | 'Tx';

export type GVRETFileMeta = {
  canIds: number[];
  lsgIds: number[];
  fctIds: number[];
};

export class GVRETLine {
    timestamp: number;
    id: number;
    isExtended: boolean;
    direction: GVRETDirection;
    bus: number;
    length: number;
    byte1: number;
    byte2: number;
    byte3: number;
    byte4: number;
    byte5: number;
    byte6: number;
    byte7: number;
    byte8: number;

    constructor(timestamp: number, id: number, isExtended: boolean, direction: GVRETDirection, bus: number, length: number, byte1: number, byte2: number, byte3: number, byte4: number, byte5: number, byte6: number, byte7: number, byte8: number) {
        this.timestamp = timestamp;
        this.id = id;
        this.isExtended = isExtended;
        this.direction = direction;
        this.bus = bus;
        this.length = length;
        this.byte1 = byte1;
        this.byte2 = byte2;
        this.byte3 = byte3;
        this.byte4 = byte4;
        this.byte5 = byte5;
        this.byte6 = byte6;
        this.byte7 = byte7;
        this.byte8 = byte8;
    }

    static fromRawLine(line: RawGVRETLine) {
        return new GVRETLine(
            parseInt(line['Time Stamp']),
            parseInt(line.ID, 16),
            line.Extended === 'true',
            line.Dir === 'Rx' ? 'Rx' : 'Tx',
            parseInt(line.Bus),
            parseInt(line.LEN),
            parseInt(line.D1, 16),
            parseInt(line.D2, 16),
            parseInt(line.D3, 16),
            parseInt(line.D4, 16),
            parseInt(line.D5, 16),
            parseInt(line.D6, 16),
            parseInt(line.D7, 16),
            parseInt(line.D8, 16)
        );
    }
}

export const parseGVRETFile = (file: File, completed: (messages: BAPMessage[], meta: GVRETFileMeta) => any) => {
  const messages: BAPMessage[] = [];

  let canIds: number[] = [];
  let lsgIds: number[] = [];
  let fctIds: number[] = [];

  Papa.parse(file, {
    header: true,
    step: (results) => {
      const data = results.data as RawGVRETLine;

      // Either temporary fix or permanent fix for the Time Stamp
      // The timestamp is used for the key in the v-for loop in the MessagesTable component so it needs to be unique
      data['Time Stamp'] = results.meta.cursor.toString();

      const id = parseInt(data.ID, 16);

      // Check if the message id is in the CanIdMap
      if (! CanIdMap[id]) {
        return;
      }

      const line = GVRETLine.fromRawLine(data);
      const message = BAPMessage.fromGVRET(line);

      if (!message) {
        return;
      }

      // If we have not seen the can id before, add it to the list
      if (!canIds.includes(id)) {
        canIds.push(id);
      }

      // If we have not seen the lsg id before, add it to the list
      if (message.deviceId && !lsgIds.includes(message.deviceId)) {
        lsgIds.push(message.deviceId);
      }

      // If we have not seen the fct id before, add it to the list
      if (message.functionId && !fctIds.includes(message.functionId)) {
        fctIds.push(message.functionId);
      }

      // If the message is a continuation, we need to find the previous message and add the data to it
      if (message.frame.type === 'LongContinuation') {
        for (let i = messages.length - 1; i >= 0; i--) {
          const prevMessage = messages[i];
          const prevMessageTotalDataLength = prevMessage.totalDataLength ? prevMessage.totalDataLength : 0;

          if (prevMessage.frame.type === 'LongStart' && prevMessage.messageIndex === message.messageIndex && prevMessage.data.length < prevMessageTotalDataLength) {
            prevMessage.addFrame(message.frame);
            break;
          }
        }
      } else {
        messages.push(message);
      }
    },
    complete: () => {

      // Sort the can ids, lsg ids, and fct ids
      canIds = canIds.sort((a, b) => a - b);
      lsgIds = lsgIds.sort((a, b) => a - b);
      fctIds = fctIds.sort((a, b) => a - b);

      completed(messages, { canIds, lsgIds, fctIds });
    }
  });
};
