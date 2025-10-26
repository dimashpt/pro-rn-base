export interface SuccessResponse<T> {
  data: T;
  message: string;
  status: number;
  error: null;
}

export interface ErrorResponse {
  data: null;
  errors?: Record<string, string[]> | string;
  error?: string;
  message?: string;
  request_id: string;
  status: number;
}
