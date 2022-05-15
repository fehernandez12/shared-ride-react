export class ApiService {
  async handleErrors(response: Response) {
    if (!response.ok) {
      console.log(response.statusText)
      throw Error(response.statusText);
    }
    return response;
  }
}