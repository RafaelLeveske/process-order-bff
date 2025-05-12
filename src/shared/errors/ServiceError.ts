import HttpStatus from 'http-status'
import { INTERNAL_SERVER_ERROR } from './messages'

export class ServiceError extends Error {
  public statusCode: number

  public body: any

  public headers: { [header: string]: string | number | boolean }

  constructor(
    message = INTERNAL_SERVER_ERROR.message,
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR ||
      HttpStatus.UNPROCESSABLE_ENTITY ||
      HttpStatus.NOT_FOUND ||
      HttpStatus.FORBIDDEN ||
      HttpStatus.UNAUTHORIZED,
    data = null,
    type = INTERNAL_SERVER_ERROR.error
  ) {
    super(message)

    const body = { message, data, type }

    this.statusCode = statusCode
    this.body = body

    this.headers = {
      'Content-Type': 'application/json'
    }
  }
}
