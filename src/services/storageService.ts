import { get, set } from "idb-keyval";

export async function getStorage<T>(key: string): Promise<T | undefined> {
  try {
    const data = await get(key);
    return data as T;
  } catch (error) {
    console.error("Error reading from storage:", error);
    return undefined;
  }
}

export async function setStorage<T>(key: string, value: T): Promise<void> {
  try {
    await set(key, value);
  } catch (error) {
    console.error("Error writing to storage:", error);
  }
}
