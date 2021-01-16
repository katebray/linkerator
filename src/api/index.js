import axios from 'axios';

export async function getLinks() {
  try {
    const { data } = await axios.get('/routes/links');
    return data;
  } catch (error) {
    console.error('getLinks api error', error);
  }
}

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

export async function getTags() {
  try {
    const { data } = await axios.get('/routes/tags');
    return data;
  } catch (error) {
    console.error('getTags api error', error);
  }
}
