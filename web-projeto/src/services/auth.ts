import api from "./api";

export interface Crosswalk {
  id: number;
  state: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}

export function getCrosswalks(params: object): Promise<Crosswalk[]> {
  return api.get("/", params);
}
