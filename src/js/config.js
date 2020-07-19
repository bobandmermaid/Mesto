const API_URL =
  NODE_ENV === 'production'
    ? 'https://praktikum.tk'
    : 'http://praktikum.tk';

const obj = {
  baseUrl: `${API_URL}/cohort11`,
  headers: {
    authorization: '3d586cb3-b972-4364-9e4e-d3f459cab5c9',
    'Content-Type': 'application/json'
  }
};

export const config = JSON.stringify(obj);