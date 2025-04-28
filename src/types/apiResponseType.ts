interface SuccessResponseType<T> {
  data: T;
  message: string;
  success: true;
}

interface ErrorResponseType {
  message: string;
  success: false;
}

export type { SuccessResponseType, ErrorResponseType };
