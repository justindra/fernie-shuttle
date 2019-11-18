// Basic interface for all entities
interface IEntity {
  id: string;
  name: string;
}

/**
 * An API Factory to return the provided _APIs_. This should allow us to swap to
 * a backend API later on a bit easier if required.
 */
export default class ApiFactory<T = IEntity> {
  constructor(private data: T[]) {}

  /**
   * Get of the items
   */
  getAll(): Promise<T[]> {
    return new Promise((resolve) => {
      return resolve(this.data);
    });
  }

  /**
   * Get a single entity with a particular id
   * @param id Id of the entity to get
   */
  get(id: string): Promise<T> {
    return new Promise(() => {
      return this.data.find((val) => ((val as unknown) as IEntity).id === id);
    });
  }
}
