import { useState, useEffect } from "react";

export default function BookmarkForm({ onSubmit, editing }) {
  const [form, setForm] = useState({
    url: "",
    title: "",
    description: "",
    tags: ""
  });

  useEffect(() => {
    if (editing) {
      setForm({
        ...editing,
        tags: editing.tags.join(", ")
      });
    }
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const tagsArray = form.tags
      .split(",")
      .map(t => t.trim())
      .filter(Boolean);

    onSubmit({ ...form, tags: tagsArray });
    setForm({ url: "", title: "", description: "", tags: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-6">
      <input required className="border p-2 w-full"
        placeholder="URL"
        value={form.url}
        onChange={e => setForm({...form, url: e.target.value})}
      />
      <input required className="border p-2 w-full"
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({...form, title: e.target.value})}
      />
      <textarea className="border p-2 w-full"
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({...form, description: e.target.value})}
      />
      <input className="border p-2 w-full"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={e => setForm({...form, tags: e.target.value})}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        {editing ? "Update" : "Add"} Bookmark
      </button>
    </form>
  );
}
