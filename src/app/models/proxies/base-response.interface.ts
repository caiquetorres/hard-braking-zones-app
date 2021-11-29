/**
 * Interface that represents the base object returned from the backend.
 */
export interface IBaseResponse {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
