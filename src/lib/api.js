const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

// Guard: localStorage only works in the browser, not on the server
function isBrowser() {
  return typeof window !== 'undefined';
}

export function saveToken(token) {
  if (isBrowser()) localStorage.setItem('access_token', token);
}

export function getToken() {
  if (isBrowser()) return localStorage.getItem('access_token');
  return null;
}

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  saveToken(data.data.accessToken);
  return data;
}

export async function createShipment(shipmentData) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/shipments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(shipmentData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create shipment');
  return data;
}

export async function getShipments() {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/shipments`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch shipments');
  return data;
}