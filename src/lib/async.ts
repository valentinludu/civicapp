export type MaybePromise<T> = T | Promise<T>;

export async function safeAwait<T>(
  promise: Promise<T>,
  options?: {
    onSuccess?: (response: T) => MaybePromise<void>;
    onError?: (error: Error) => MaybePromise<void>;
  }
): Promise<[error: Error] | [error: null, data: T]> {
  try {
    const response = await promise;
    await options?.onSuccess?.(response);
    return [null, response];
  } catch (_error: any) {
    await options?.onError?.(_error);
    return [_error];
  }
}
