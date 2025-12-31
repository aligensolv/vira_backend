import express from 'express';
import * as path from 'path';
import errorHandler from './core/middlewares/error_handler';
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet';
import cookieParser from "cookie-parser";

import logger from './core/utils/logger';
import { notFoundMiddleware } from './core/middlewares/not_found';
import { appConfig, corsConfig } from './core/config/server_configs';
import { TestRoute } from './dev.route';
import { AuthRoutes } from './packages/auth';

export const app = express();
app.use(helmet())

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/blueprints', express.static(path.join(__dirname, 'blueprints')));



if(appConfig.env == 'development') {
  app.use(TestRoute)
}

const whitelist = corsConfig.whitelist

console.log(whitelist);


const corsMiddleware = cors({
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin as string) != -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
})

app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression())
app.use(cookieParser())

app.use(
  '/api',
  AuthRoutes
)

const $404 = notFoundMiddleware({
  logger: logger,
  suggestAlternatives: true,
  includeRequestInfo: true,
  trackMetrics: true
})

app.use($404);

app.use(errorHandler)