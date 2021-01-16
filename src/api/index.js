import axios from 'axios';

export async function getLinks() {
  try {
    const { data } = await axios.get('/routes/index');
    return data;
  } catch (error) {
    console.error('getLinks api error', error);
  }
}

export async function createNewLink(title, date, descript, tags) {
  try {
    const { data } = await axios.post('/routes/index', {
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
    const { data } = await axios.get('/routes/index');
    return data;
  } catch (error) {
    console.error('getTags api error', error);
  }
}
