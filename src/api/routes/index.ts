import routeData from './data.json';

export interface IRoute {
  id: string;
  name: string;
  description: string;
  // The id of the stops in order for the route
  stops: string[];
}

const Data: IRoute[] = routeData;

export { Data as default };
