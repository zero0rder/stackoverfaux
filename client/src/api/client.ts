// HTTP Client Module

function getRequest<T>(url: string): Promise<T> {
  return fetchData(url, { method: "GET" });
}
function postRequest<T>(url: string, data: T): Promise<T> {
  const opts = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };
  return fetchData(url, opts);
}

const client = {
  get: getRequest,
  post: postRequest,
};

export default client;

export async function fetchData(url: string, opts?: RequestInit): Promise<any> {
  try {
    const res = await fetch(url, opts);
    if (res.ok) return res.json();
  } catch (err) {
    console.error("error in api", err);
  }
}
