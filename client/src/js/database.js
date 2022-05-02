import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  try{
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: id, content: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
} catch (err) {
  console.error(err);
}
};
// logic for a method that gets all the content from the database
export const getDb = async () => {
  try{
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const id = 1;
  const request = store.get({ id });
  const result = await request;
  console.log('result.value', result);
  return result;
} catch (err) {
  console.error(err);
}
};
initdb();
