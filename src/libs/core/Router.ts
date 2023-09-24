import { Application } from 'express';

export default interface Route {
  Rest: (express: Application) => Promise<void>;
  General?: () => Promise<void>;
}