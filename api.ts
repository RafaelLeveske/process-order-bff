import "./src/infra/database/mongodb/connections";
import APIHandler from "./src/handlers/APIHandler";
import { storeRequest } from "./src/infra/functions/ApiGateway/storeRequest";

export const storeRequestAPI = APIHandler(storeRequest);
