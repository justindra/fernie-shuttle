import stopData from './data.json';

export interface IStop {
  id: string;
  name: string;
  description: string;
  // WGS84/Pseudo-Mercator coordinates of the stop
  point: {
    lat: number;
    lng: number;
  };
}

const Data: IStop[] = stopData;

export { Data as default };
