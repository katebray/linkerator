// Connect to DB
// const { Client } = require('pg');
// require('dotenv').config();
// const CONNECTION_STRING =
//   process.env.DB_URL ||
//   'postgres://postgres:Campground16!@localhost:5432/linkerator';

const { Client } = require('pg');
require('dotenv').config();
const { USER, KEY } = process.env;
const DB_NAME = 'linkerator';
const DB_URL =
  process.env.DATABASE_URL ||
  `postgres://${USER}:${KEY}@localhost:5432/${DB_NAME}`;

let client;

// try {
client = new Client(DB_URL);
//client = new Client(CONNECTION_STRING);
// } catch (err) {
//   console.error('##########', err);
// }

// DATABASE METHODS

async function getAllLinks() {
  const { rows } = await client.query(
    `SELECT id, title, clicks, descript, date
    FROM links;
    `
  );

  const links = await Promise.all(
    rows.map(async (link) => {
      const { rows: tagIds } = await client.query(
        `
        SELECT "tagId"
        FROM link_tag
        WHERE "urlId"=$1
        `,
        [link.id]
      );

      const tags = await Promise.all(
        tagIds.map((tag) => getTagById(tag.tagId))
      );

      link.tags = tags;
      return link;
    })
  );
  return links;
}

async function createNewLink({ title, date, descript, clicks = 0, tags = [] }) {
  try {
    const tagResults = await Promise.all(
      tags.map((tagName) => createNewTag(tagName))
    );

    const {
      rows: [result],
    } = await client.query(
      `
      INSERT INTO links(title, date, descript, clicks)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `,
      [title, date, descript, clicks]
    );

    await Promise.all(tagResults.map(({ id }) => createTagLink(result.id, id)));
    result.tags = tagResults;
    return result;
  } catch (error) {
    console.error('createNewLink index db error', error);
  }
}

async function getAllTags() {
  try {
    const { rows: tags } = await client.query(`
      SELECT *
      FROM tags;
    `);

    return tags;
  } catch (error) {
    console.error('getAllTags index db error', error);
  }
}

async function createNewTag(tagName) {
  try {
    const {
      rows: [tag],
    } = await client.query(
      `
    INSERT INTO tags ("tagName")
    VALUES ($1)
    RETURNING *;
    `,
      [tagName]
    );

    return tag;
  } catch (error) {
    console.error('createNewLTag index db error', error);
  }
}

async function createTagLink(urlId, tagId) {
  try {
    const {
      rows: [result],
    } = await client.query(
      `
            INSERT INTO link_tag("urlId", "tagId")
            VALUES ($1, $2)
            RETURNING *;
            `,
      [urlId, tagId]
    );
    return result;
  } catch (error) {
    console.error('createTagLink index db error', error);
  }
}

async function getLinkByTag(tagName) {
  try {
    const { rows: urlId } = await client.query(
      `
      SELECT title.id
      FROM links
      JOIN post_tags ON posts.id=post_tags."postId"
      JOIN tags ON tags.id=post_tags."tagId"
      WHERE tags.name=$1;
    `,
      [tagName]
    );

    return await Promise.all(urlId.map((link) => getLinkById(title.id)));
  } catch (error) {
    console.error('getLinksByTag index db error', error);
  }
}

async function getTagById(tagId) {
  try {
    const {
      rows: [tag],
    } = await client.query(
      `
      SELECT *
      FROM tags
      WHERE id=$1
      `,
      [tagId]
    );
    return tag;
  } catch (error) {
    console.error('getTagById index db error', error);
  }
}

async function addLinkTags({ urlId, tagId }) {
  try {
    const {
      rows: [tagToLink],
    } = await client.query(
      `
    INSERT INTO link_tag ("urlId", "tagId")
    VALUES ($1, $2)
    RETURNING *;
    `,
      [urlId, tagId]
    );
    return tagToLink;
  } catch (error) {
    console.error('addLonkTags index db error', error);
  }
}

// export
module.exports = {
  client,
  createNewLink,
  createNewTag,
  createTagLink,
  getAllTags,
  getLinkByTag,
  getTagById,
  addLinkTags,
  getAllLinks,
};
