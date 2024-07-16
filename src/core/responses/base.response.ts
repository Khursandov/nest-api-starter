export class BaseResponse {
  static success<T>(code: number = 200, message = 'success', data?: T | T[]) {
    return {
      success: true,
      statusCode: code,
      message: message,
      data: data ?? [],
    };
  }
  static error(code: number = 400, message = 'error', data?: any | any[]) {
    return {
      success: false,
      statusCode: code,
      message: message,
      data: data ?? [],
    };
  }
}
