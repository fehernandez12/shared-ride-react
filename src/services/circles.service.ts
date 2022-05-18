import { CircleDto } from "../models/circle.model";
import { API_URL } from "../utilities/constants";
import { ApiService } from "./api.service";
import { StorageService } from "./storage.service";

export class CircleService extends ApiService {
  public async getCircles(username: string): Promise<CircleDto[]> {
    const token = await StorageService.getToken();
    const response = await fetch(`${API_URL}/users/${username}/circles/`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Token ${token}`
      }
    });
    return await response.json() as CircleDto[];
  }

  public async getCircle(slug_name: string): Promise<CircleDto> {
    const token = await StorageService.getToken();
    const response = await fetch(`${API_URL}/circles/${slug_name}/`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Token ${token}`
      }
    });
    return await response.json() as CircleDto;
  }

  public async createCircle(request: Partial<CircleDto>): Promise<CircleDto> {
    const token = await StorageService.getToken();
    const response = await fetch(`${API_URL}/circles/`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      },
      body: JSON.stringify(request)
    });
    return await response.json() as CircleDto;
  }


}