import { ISQSProvider } from 'src/shared/container/providers/SQSProvider/models/ISQSProvider'
import { inject, injectable } from 'tsyringe'

@injectable()
export class StoreRequestsService {
  constructor(
    @inject('SQSProvider')
    protected sqsProvider: ISQSProvider
  ) {

  }

  async execute(payload: any): Promise<void> {
    const queue = process.env.NEST_SERVERLESS_APP_PROCESS_ORDER_QUEUE
    const queueURL = await this.sqsProvider.getSQSQueueUrl(queue)
    await this.sqsProvider.sendToSQSQueue({
      messageBody: payload,
      queueURL: queueURL
    })
  }
}
