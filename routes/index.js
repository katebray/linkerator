const apiRouter = require('express').Router();
const {
  getAllLinks,
  createNewLink,
  getAllTags,
  getLinkByTag,
} = require('../db');

apiRouter.get('/links', async (req, res, next) => {
  try {
    const allLinks = await getAllLinks();

    res.send({ allLinks });
  } catch (error) {
    console.error('getAllLinks route error', error);
  }
});

apiRouter.post('/links', async (req, res, next) => {
  const { title, date, descript, clicks, tags = [] } = req.body;

  const tagArr = tags.trim().split(/\s+/);
  const linkData = {};

  try {
    linkData.title = title;
    linkData.date = date;
    linkData.descript = descript;
    linkData.clicks = clicks;
    linkData.tags = tagArr;

    const createdLink = await createNewLink(linkData);
    res.send({ createdLink });
  } catch (error) {
    console.error('createdNewLink route error', error);
  }
});

apiRouter.get('/tags', async (req, res) => {
  const tags = await getAllTags();
  res.send({ tags });
});

apiRouter.get('/tags/:tagName/links', async (req, res, next) => {
  const { tagName } = req.params;
  try {
    const allLinks = await getLinkByTag(tagName);
    res.send({ allLinks });
  } catch (error) {
    console.error('getLinkByTag route error', error);
  }
});

module.exports = apiRouter;
