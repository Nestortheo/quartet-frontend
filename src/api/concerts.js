import api from "./api"

export async function fetchConcerts(){
    const res = await api.get("/concerts/");
    return res.data.results ?? res.data;
}

export async function fetchConcertById(id){
    const res = await api.get(`/concerts/${id}/`)
    return res.data;
}

export async function createConcert(payload){
    const res = await api.post("/concerts/",payload)
    return res.data
}

export async function updateConcert(id, payload) {
  const res = await api.put(`/concerts/${id}/`, payload);
  return res.data;
}

export async function deleteConcert(id) {
  await api.delete(`/concerts/${id}/`);
}