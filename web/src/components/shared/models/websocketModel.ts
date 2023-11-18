import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
const { REACT_APP_PUBLIC_SERVER_URL, REACT_APP_LOCAL_SERVER_URL, REACT_APP_PRODUCTION } = process.env;

export const socketOrigin: string =
  REACT_APP_PRODUCTION === 'true' ? (REACT_APP_PUBLIC_SERVER_URL as string) : (REACT_APP_LOCAL_SERVER_URL as string);

export type SocketProp = Socket<DefaultEventsMap, DefaultEventsMap> | null;
