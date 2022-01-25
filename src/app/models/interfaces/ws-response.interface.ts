export interface IWsResponse<T> {
  event: string;
  data: T;
}
