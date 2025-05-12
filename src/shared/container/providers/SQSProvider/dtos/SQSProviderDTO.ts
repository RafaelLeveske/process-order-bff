export interface ISendToSQSQueue {
  messageBody: any
  queueURL: string
  delaySeconds?: number
}
