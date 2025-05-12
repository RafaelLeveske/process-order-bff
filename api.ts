import 'reflect-metadata'
import APIHandler from "./src/modules/orders/handlers/APIHandler";
import { storeRequest } from "./src/modules/orders/infra/functions/ApiGateway/storeRequest";

export const storeRequestAPI = APIHandler(storeRequest);
