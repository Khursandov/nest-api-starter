import { IBasicPaginatedResponse } from '@core/interfaces/base-paginated-reponse.interface';

export class BasePaginatedResponse {
  static success<T>(
    payload: IBasicPaginatedResponse<T>,
  ): IBasicPaginatedResponse<T> {
    return payload;
  }
}
