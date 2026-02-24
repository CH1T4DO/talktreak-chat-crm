const BASE_URL = window.location.origin;

function getToken(): string | null {
  return localStorage.getItem("tt_token");
}

function headers(): HeadersInit {
  const h: HeadersInit = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
}

export async function apiPost<T = any>(path: string, body?: any): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: headers(),
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Erro na requisição" }));
    throw new Error(err.message || `Erro ${res.status}`);
  }
  return res.json();
}

export async function apiGet<T = any>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { headers: headers() });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Erro na requisição" }));
    throw new Error(err.message || `Erro ${res.status}`);
  }
  return res.json();
}

export async function apiDelete<T = any>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "DELETE",
    headers: headers(),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Erro na requisição" }));
    throw new Error(err.message || `Erro ${res.status}`);
  }
  return res.json();
}

export async function apiPut<T = any>(path: string, body?: any): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "PUT",
    headers: headers(),
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Erro na requisição" }));
    throw new Error(err.message || `Erro ${res.status}`);
  }
  return res.json();
}
