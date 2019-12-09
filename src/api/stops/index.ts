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
  schedule: {
    // The schedule for each route, key'd by Id.
    // The schedule is set in minutes from midnight for each of those routes
    [routeId: string]: number[];
  };
}

const Data: IStop[] = stopData;

export { Data as default };
