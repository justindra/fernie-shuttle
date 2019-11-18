import routeData from './data.json';

export interface IRoute {
  id: string;
  name: string;
  description: string;
  // The id of the stops in order for the route
  stops: string[];
  // An array of arrays of schedules, so this should be
  // the number of mins from midnight as our schedule is repeated daily
  // e.g. [ [0, 100, 200, 200], [20, 400, 500] ]
  // The length of each schedule should equal to the number of stops
  schedule: number[][];
}

const Data: IRoute[] = routeData;

export { Data as default };
