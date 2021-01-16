//TODO:
//clickable tags
//sort by popularity
//delete button
//shorten search bar and addLink inputs

// code to build and initialize DB goes here
const {
  client,
  createNewLink,
  createNewTag,
  addLinkTags,
  // other db methods
} = require('./index');

async function buildTables() {
  try {
    client.connect();

    console.log('Dropping Tables!');

    await client.query(`
      DROP TABLE IF EXISTS link_tag;
      DROP TABLE IF EXISTS links;
      DROP TABLE IF EXISTS tags;
    `);

    console.log('Tables Dropped!');
    console.log('Building Tables!');

    // build tables in correct order
    await client.query(`
    CREATE TABLE links(
      id SERIAL PRIMARY KEY,
      title VARCHAR (255) UNIQUE NOT NULL,
      clicks INTEGER DEFAULT 0,
      descript VARCHAR (255),
      date DATE NOT NULL,
      "isActive" BOOLEAN DEFAULT true
    );

    CREATE TABLE tags(
      id SERIAL PRIMARY KEY,
      "tagName" varchar (255) UNIQUE 
    );

    CREATE TABLE link_tag(
      id SERIAL PRIMARY KEY,
      "urlId" INTEGER REFERENCES links(id),
      "tagId" INTEGER REFERENCES tags(id)
    );
    `);
    console.log('Tables Created!');
  } catch (error) {
    console.error('Build tables db error', error);
  }
}

async function populateInitialData() {
  try {
    await createNewLink({
      title: 'www.careers.google.com',
      clicks: 0,
      descript:
        'Applying for a job at Google is easy! We already have all of your information.',
      date: '12/10/2020',
    });
    await createNewLink({
      title: 'www.disneyworld.disney.go.com',
      clicks: 0,
      descript: 'Happiest website on Earth!',
      date: '12/10/2020',
    });
    await createNewLink({
      title: 'www.redditanime.fandom.com/wiki/Hulu_Streaming_Anime',
      clicks: 0,
      descript: 'A complete list of all of the available Anime on Huluu',
      date: '12/10/2020',
    });
  } catch (error) {
    console.error('PopulateData createNewLink db error', error);
  }

  try {
    await createNewTag('job');
    await createNewTag('google');
    await createNewTag('career');
    await createNewTag('disney');
    await createNewTag('happy');
    await createNewTag('vacation');
    await createNewTag('anime');
    await createNewTag('hulu');
    await createNewTag('tv');
  } catch (error) {
    console.error('PopulateData createNewTag db error', error);
  }

  try {
    await addLinkTags({ urlId: 1, tagId: 1 });
    await addLinkTags({ urlId: 1, tagId: 2 });
    await addLinkTags({ urlId: 1, tagId: 3 });
    await addLinkTags({ urlId: 2, tagId: 4 });
    await addLinkTags({ urlId: 2, tagId: 5 });
    await addLinkTags({ urlId: 2, tagId: 6 });
    await addLinkTags({ urlId: 3, tagId: 7 });
    await addLinkTags({ urlId: 3, tagId: 8 });
    await addLinkTags({ urlId: 3, tagId: 9 });
  } catch (error) {
    console.error('PopulateData initial tags db error', error);
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
