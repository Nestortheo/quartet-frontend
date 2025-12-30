import api from "./api";

export async function fetchVenues() {
  const res = await api.get("/venues/");
  return res.data.results ?? res.data;
}

export async function createVenue(payload) {
  const res = await api.post("/venues/", payload);
  return res.data;
}

// optional later
export async function fetchVenueById(id) {
  const res = await api.get(`/venues/${id}/`);
  return res.data;
}

export async function updateVenue(id, payload) {
  const res = await api.put(`/venues/${id}/`, payload);
  return res.data;
}

export async function deleteVenue(id) {
  await api.delete(`/venues/${id}/`);
}