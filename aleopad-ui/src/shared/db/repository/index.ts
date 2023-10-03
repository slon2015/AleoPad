export default class Repository<T extends object> {
  constructor(public readonly key: string) {}

  private getStorageKey() {
    return `aleopad_${this.key}`;
  }

  load(): Array<T> {
    const storageText = localStorage.getItem(this.getStorageKey());

    const result = storageText ? JSON.parse(storageText) : [];

    return result;
  }

  save(data: Array<T>) {
    localStorage.setItem(this.getStorageKey(), JSON.stringify(data));
  }

  append(...newData: Array<T>) {
    const data = this.load();
    this.save(data.concat(newData));
  }
}
