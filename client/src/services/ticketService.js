import { makeRequest } from "./apiService";

export async function getAllTickets() {
  return await makeRequest("/ticket/all/", {
    method: "GET",
  });
}

export function postTicket(payload) {
  return makeRequest("/ticket/create/", {
    method: "POST",
    data: payload,
  });
}

export function getTicketById(id) {
  return makeRequest(`/ticket/${id}/`, {
    method: "GET",
  });
}

export function postCommentToDb(id, payload) {
  return makeRequest(`/comment/${id}/create/`, {
    method: "POST",
    data: payload,
  });
}
