import { api } from "./apiClient";

interface Entity {
  id: number;
}

export class HttpService<T extends Entity> {
  constructor(public endpoint: string) {}

  getAll() {
    const controller = new AbortController();

    const request = api.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  delete(id: number) {
    return api.delete(`${this.endpoint}/${id}`);
  }

  create(entity: Omit<T, "id">) {
    return api.post(this.endpoint, entity);
  }

  update(entity: T) {
    return api.patch(`${this.endpoint}/${entity.id}`, entity);
  }
}

export const create = <T extends Entity>(endpoint: string) =>
  new HttpService<T>(endpoint);
