/**
 * This is a mocked API so that we don't have to have any backend data to start with.
 * But we do write this as a set of API Calls so that it won't be complicated to
 * re-factor it if we ever need to have a backend.
 */

import ApiFactory from './api';

import StopData, { IStop } from './stops';
import RouteData, { IRoute } from './routes/index';

const Stops = new ApiFactory<IStop>(StopData);
const Routes = new ApiFactory<IRoute>(RouteData);

export default {
  Stops,
  Routes
};
