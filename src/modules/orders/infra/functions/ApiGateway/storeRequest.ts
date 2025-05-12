import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";
import HttpStatus from "http-status";
import { IResponse } from "src/modules/orders/dtos/IResponseDTO";
import { StoreRequestsService } from "src/modules/orders/services/StoreRequestService";
import { INTERNAL_SERVER_ERROR } from "src/shared/errors/messages";
import { ServiceError } from "src/shared/errors/ServiceError";
import { container } from "tsyringe";


export const storeRequest: Handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
): Promise<IResponse> => {

  try {
    const requestBody = JSON.parse(event.body);

    console.log({ event: JSON.stringify(requestBody) });

    const storeRequestService = container.resolve(StoreRequestsService);
    const response = await storeRequestService.execute({
      requestBody,
    });
    console.log({ response });
    return {
      statusCode: response.statusCode,
      body: JSON.stringify({
        message: response.message,
        data: response.data,
      }),
    };

  } catch (error) {
    console.error(
      "Erro inesperado ao tentar processar requisição\nError: ",
      error
    );

    return new ServiceError(
      error?.message || INTERNAL_SERVER_ERROR.message,
      error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      {
        message: error?.data?.message || error?.message,
      }
    );
  }
};
