export interface IGlobalResp {
  message: string;
  data: any;
  pagination?: IPagination;
  error?: string;
  error_data?: IErrorData[];
}

export interface IErrorData {
  info?: string;
  message?: string;
  data?: any;
}

interface IPagination {
  page: number;
  total: number;
  total_page: number;
}
