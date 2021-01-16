import axios from 'axios';

//const { data } = await axios.get('/api/links');
export async function getLinks() {
  try {
    const { data } = await axios.get('/routes/links');
    return data;
  } catch (error) {
    console.error('getLinks api error', error);
  }
}

//const { data } = await axios.post('/api/links', {
export async function createNewLink(title, date, descript, tags) {
  try {
    const { data } = await axios.post('/routes/links', {
      title,
      date,
      descript,
      tags,
    });
    return data;
  } catch (error) {
    console.error('createNewLink api error', error);
  }
}

//const { data } = await axios.get('/api/tags');
export async function getTags() {
  try {
    const { data } = await axios.get('/routes/tags');
    return data;
  } catch (error) {
    console.error('getTags api error', error);
  }
}
