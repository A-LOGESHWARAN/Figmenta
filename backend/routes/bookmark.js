import express from "express";
import { bookmarks } from "../data/store.js";
import { validateBookmark } from "../utils/validators.js";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import * as cheerio from "cheerio";

const router = express.Router();

/* ===========================
   Helper: Fetch Page Title
=========================== */

async function fetchPageTitle(url) {
  try {
    const response = await axios.get(url, { timeout: 5000 });
    const $ = cheerio.load(response.data);

    // First try Open Graph title (cleaner)
    const ogTitle = $('meta[property="og:title"]').attr("content");

    // Fallback to normal <title>
    const normalTitle = $("title").text();

    const finalTitle = ogTitle || normalTitle;

    return finalTitle ? finalTitle.substring(0, 200) : null;
  } catch {
    return null;
  }
}

/* ===========================
   GET /bookmarks (with pagination)
=========================== */

router.get("/", (req, res) => {
  const { tag, page = 1, limit = 5 } = req.query;

  let filtered = bookmarks;

  if (tag) {
    filtered = filtered.filter(b =>
      b.tags.includes(tag.toLowerCase())
    );
  }

  const start = (page - 1) * limit;
  const end = start + Number(limit);

  const paginated = filtered.slice(start, end);

  return res.status(200).json({
    total: filtered.length,
    page: Number(page),
    limit: Number(limit),
    data: paginated
  });
});

/* ===========================
   POST /bookmarks (metadata auto-fetch)
=========================== */

router.post("/", async (req, res) => {
  let { url, title, description, tags } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  // 🔥 DUPLICATE CHECK
  const existing = bookmarks.find(
    b => b.url.toLowerCase() === url.toLowerCase()
  );

  if (existing) {
    return res.status(409).json({
      error: "Bookmark already exists"
    });
  }

  if (!title) {
    const fetchedTitle = await fetchPageTitle(url);
    if (fetchedTitle) title = fetchedTitle;
  }

  const error = validateBookmark({ url, title, description, tags });
  if (error) return res.status(400).json({ error });

  const newBookmark = {
    id: uuidv4(),
    url,
    title,
    description: description || "",
    tags: (tags || []).map(t => t.toLowerCase()),
    createdAt: new Date().toISOString()
  };

  bookmarks.push(newBookmark);

  return res.status(201).json(newBookmark);
});


/* ===========================
   PUT /bookmarks/:id
=========================== */

router.put("/:id", (req, res) => {
  const bookmark = bookmarks.find(b => b.id === req.params.id);

  if (!bookmark) {
    return res.status(404).json({ error: "Bookmark not found" });
  }

  const updatedData = { ...bookmark, ...req.body };
  const error = validateBookmark(updatedData, true);
  if (error) return res.status(400).json({ error });

  bookmark.url = req.body.url ?? bookmark.url;
  bookmark.title = req.body.title ?? bookmark.title;
  bookmark.description =
    req.body.description ?? bookmark.description;
  bookmark.tags = req.body.tags
    ? req.body.tags.map(t => t.toLowerCase())
    : bookmark.tags;

  return res.status(200).json(bookmark);
});

/* ===========================
   DELETE /bookmarks/:id
=========================== */

router.delete("/:id", (req, res) => {
  const index = bookmarks.findIndex(b => b.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Bookmark not found" });
  }

  bookmarks.splice(index, 1);

  return res.status(204).send();
});

export default router;
