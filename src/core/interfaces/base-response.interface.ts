export interface IBaseResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | T[];
}
