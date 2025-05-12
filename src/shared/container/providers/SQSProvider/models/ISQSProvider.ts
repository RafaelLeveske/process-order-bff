import { ISendToSQSQueue } from "../dtos/SQSProviderDTO";

export interface ISQSProvider {
  sendToSQSQueue({ messageBody, queueURL, delaySeconds }: ISendToSQSQueue): Promise<void>

  getSQSQueueUrl(queueName: string | undefined): Promise<string>
}
