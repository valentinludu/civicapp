export async function fetcher<T>(
  url: string,
  method: "POST" | "GET" | "PUT" | "DELETE",
  body: any,
  headers: HeadersInit = {}
): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    }),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  const json = await res.json();

  return json;
}

export async function POST<T>(url: string, { arg }: { arg: any }): Promise<T> {
  return fetcher(url, "POST", arg);
}
