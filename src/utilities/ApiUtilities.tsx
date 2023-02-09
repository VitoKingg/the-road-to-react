export const ApiUtilities = {
  get: <TResponse,>(url: string) => requestApi<TResponse>(url),
  post: <TBody extends BodyInit, TResponse>(url: string, body: TBody) =>
    requestApi<TResponse>(url, { method: 'Post', body })
};

async function requestApi<T>(
  url: string,
  config: RequestInit = {}
): Promise<T> {
  const response = await fetch(url, config);
  return await response.json();
}

export default ApiUtilities;
