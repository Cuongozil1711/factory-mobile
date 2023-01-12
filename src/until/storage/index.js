import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Loads a string from storage.
 *
 * @param {string} key The key to fetch.
 */
export function loadString(key, defaultValue = null) {
  try {
    const res = AsyncStorage.getItem(key);
    ////console.log('Token:' + JSON.stringify(res));
    return res ?? defaultValue;
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return defaultValue;
  }
}

/**
 * Saves a string to storage.
 *
 * @param {string} key The key to fetch.
 * @param {string} value The value to store.
 */
export async function saveString(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param {string} key The key to fetch.
 */
export async function load(key) {
  try {
    const almostThere = await AsyncStorage.getItem(key);
    return JSON.parse(almostThere);
  } catch {
    return null;
  }
}

/**
 * Saves an object to storage.
 *
 * @param {string} key The key to fetch.
 * @param {string} value The value to store.
 */
export async function save(key, value) {
  try {
    // ////console.log(key);
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Removes something from storage.
 *
 * @param {string} key The key to kill.
 */
export async function remove(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch {}
}

/**
 * Burn it all to the ground.
 */
export async function clear() {
  try {
    await AsyncStorage.clear();
  } catch {}
}
