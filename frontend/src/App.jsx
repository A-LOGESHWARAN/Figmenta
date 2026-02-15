import { useEffect, useState } from "react";
import { api } from "./api";

export default function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    url: "",
    title: "",
    description: "",
    tags: ""
  });

  /* ===========================
     Dark Mode Effect (FULL PAGE)
  ============================ */

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  /* ===========================
     Fetch Bookmarks
  ============================ */

  const fetchBookmarks = async () => {
    try {
      const res = await api.get("/bookmarks", {
        params: {
          page,
          limit,
          tag: activeTag || undefined
        }
      });

      setBookmarks(res.data.data);   // FIXED for pagination
      setTotal(res.data.total);
    } catch {
      setError("Failed to fetch bookmarks");
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [page, activeTag]);

  /* ===========================
     Add / Update
  ============================ */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const tagsArray = form.tags
      .split(",")
      .map(t => t.trim())
      .filter(Boolean);

    try {
      if (editingId) {
        await api.put(`/bookmarks/${editingId}`, {
          ...form,
          tags: tagsArray
        });
      } else {
        await api.post("/bookmarks", {
          ...form,
          tags: tagsArray
        });
      }

      setForm({ url: "", title: "", description: "", tags: "" });
      setEditingId(null);
      fetchBookmarks();
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  /* ===========================
     Delete
  ============================ */

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this bookmark?")) return;

    try {
      await api.delete(`/bookmarks/${id}`);
      fetchBookmarks();
    } catch {
      setError("Failed to delete bookmark");
    }
  };

  /* ===========================
     Edit
  ============================ */

  const startEdit = (b) => {
    setEditingId(b.id);
    setForm({
      url: b.url,
      title: b.title,
      description: b.description,
      tags: b.tags.join(", ")
    });
  };

  /* ===========================
     Client-side Search
  ============================ */

  const filteredBookmarks = bookmarks.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.url.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="container">
      <h1>Bookmark Manager</h1>

      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Search */}
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="URL"
          required
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
        />

        <input
          placeholder="Title (leave empty to auto-fetch)"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={(e) =>
            setForm({ ...form, tags: e.target.value })
          }
        />

        <button className="primary">
          {editingId ? "Update" : "Add"} Bookmark
        </button>
      </form>

      {/* Active Tag */}
      {activeTag && (
        <p>
          Filtering by: {activeTag}
          <button onClick={() => setActiveTag(null)}>
            Clear
          </button>
        </p>
      )}

      {/* Bookmark List */}
      {filteredBookmarks.length === 0 && (
        <p>No bookmarks found.</p>
      )}

      {filteredBookmarks.map(b => (
        <div key={b.id} className="card">
          <h3>{b.title}</h3>

          <a href={b.url} target="_blank" rel="noreferrer">
            {b.url}
          </a>

          <p>{b.description}</p>

          <div>
            {b.tags.map(tag => (
              <span
                key={tag}
                className="tag"
                onClick={() => {
                  setActiveTag(tag);
                  setPage(1);
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div>
            <button onClick={() => startEdit(b)}>
              Edit
            </button>

            <button
              className="danger"
              onClick={() => handleDelete(b.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
