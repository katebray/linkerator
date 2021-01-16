import axios from 'axios';

//    const { data } = await axios.get('/routes/links');
export async function getLinks() {
  try {
    const { data } = await axios.get('/api/links');
    return data;
  } catch (error) {
    console.error('getLinks api error', error);
  }
}

//    const { data } = await axios.post('/routes/links', {
export async function createNewLink(title, date, descript, tags) {
  try {
    const { data } = await axios.post('/api/links', {
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

// const { data } = await axios.get('/routes/tags');
export async function getTags() {
  try {
    const { data } = await axios.get('/api/tags');
    return data;
  } catch (error) {
    console.error('getTags api error', error);
  }
}
