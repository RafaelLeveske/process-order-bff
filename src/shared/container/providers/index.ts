import { container } from "tsyringe";
import { ISQSProvider } from "./SQSProvider/models/ISQSProvider";
import { SQSProvider } from "./SQSProvider/implementations/SQSProvider";

container.registerSingleton<ISQSProvider>('SQSProvider', SQSProvider)

export * from './SQSProvider/implementations/SQSProvider'

