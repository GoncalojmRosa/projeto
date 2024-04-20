import api from "./api";

export interface Crosswalk {
  id: string;
  state: string;
  location: {
    longitude: number;
    latitude: number;
  };
  city: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface CrosswalksResponse {
  crosswalks: Crosswalk[];
  semDesgasteCount: number;
  desgasteModeradoCount: number;
  desgasteSeveroCount: number;
}

export function getCrosswalks(params: object): Promise<CrosswalksResponse> {
  return api.get("/crosswalks", params).then((response) => response.data);
}

export function deleteCrosswalk(id: string): Promise<Crosswalk> {
  return api.delete(`/crosswalks/${id}`).then((response) => response.data);
}
