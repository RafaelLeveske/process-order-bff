import { ISQSProvider } from 'src/shared/container/providers/SQSProvider/models/ISQSProvider'
import { inject, injectable } from 'tsyringe'

@injectable()
export class StoreRequestsService {
  constructor(
    @inject('SQSProvider')
    protected sqsProvider: ISQSProvider
  ) {

  }

  async execute(payload: any): Promise<any> {
    const queue = `${process.env.SERVERLESS_SERVICE_NAME}-${process.env.SERVERLESS_STAGE_NAME}-store-order-request`
    const queueURL = await this.sqsProvider.getSQSQueueUrl(queue)
    await this.sqsProvider.sendToSQSQueue({
      messageBody: payload,
      queueURL: queueURL
    })
  }
}
