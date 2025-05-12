import { ISQSProvider } from '../models/ISQSProvider'
import { ISendToSQSQueue } from '../dtos/SQSProviderDTO'
import { SQS } from 'aws-sdk'

export class SQSProvider implements ISQSProvider {
  private sqs: SQS

  constructor() {
    this.sqs = new SQS({
      apiVersion: '2012-11-05'
    })
  }

  async sendToSQSQueue({ messageBody, queueURL, delaySeconds = undefined }: ISendToSQSQueue): Promise<void> {
    try {
      await this.sqs
        .sendMessage({
          MessageBody: JSON.stringify(messageBody),
          QueueUrl: queueURL,
          DelaySeconds: delaySeconds
        })
        .promise()
    } catch (error) {
      console.error('Error putting object in the queue\nError: ', error)

      console.log({
        messageBody: JSON.stringify(messageBody),
        delaySeconds,
        queueURL
      })

      throw new Error(`Error putting object in the queue. Error: ${error}`)
    }
  }

  async getSQSQueueUrl(queueName: string | undefined): Promise<string> {
    try {
      if (!queueName) {
        throw new Error(`Queue name is not defined.`)
      }

      const getQueueUrl = await this.sqs
        .getQueueUrl({
          QueueName: queueName
        })
        .promise()

      const queueUrl = getQueueUrl?.QueueUrl

      if (!queueUrl) {
        throw new Error(`Queue URL do not exist.`)
      }

      return queueUrl
    } catch (error) {
      console.error('Error getting SQS queue URL\nError: ', error)

      throw new Error(`Error getting SQS queue URL. Error: ${error}`)
    }
  }
}
