export async function fetcher<T>(
  url: string,
  method: "POST" | "GET" | "PUT" | "DELETE",
  body: any,
  headers?: HeadersInit,
  noHeaders?: boolean,
  skipStringify?: boolean
): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: noHeaders
      ? new Headers({})
      : new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(headers || {}),
        }),
    body: skipStringify ? body : JSON.stringify(body),
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

export async function POSTFORM<T>(
  url: string,
  { arg }: { arg: any }
): Promise<T> {
  return fetcher(url, "POST", arg, {}, true, true);
}

export async function DELETE<T>(
  url: string,
  { arg }: { arg: { id: string } }
): Promise<T> {
  return fetcher(url + "/" + arg.id, "DELETE", {});
}
