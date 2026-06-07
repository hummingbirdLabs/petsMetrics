export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: AppError };

export interface AppError {
  code: string;
  details?: string;
}
