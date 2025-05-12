import {
  APIGatewayEvent,
  APIGatewayProxyResultV2,
  Callback,
  Context,
  Handler,
} from "aws-lambda";
import HttpStatus from "http-status";

export default (handlerFunction: Handler): Handler =>
  async (
    event: APIGatewayEvent,
    context: Context,
    callback: Callback
  ): Promise<APIGatewayProxyResultV2> => {
    try {
      const data = await handlerFunction(event, context, callback);

      const { statusCode } = data;

      return {
        statusCode: statusCode || HttpStatus.OK,
      };
    } catch (error) {
      return JSON.stringify({
        message: error?.data?.message || error?.message,
      });
    }
  };
