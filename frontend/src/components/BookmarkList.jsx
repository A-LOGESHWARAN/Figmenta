export default function BookmarkList({
  bookmarks,
  onEdit,
  onDelete,
  setActiveTag
}) {
  return (
    <div className="space-y-4">
      {bookmarks.map(b => (
        <div key={b.id} className="border p-4 rounded">
          <h2 className="font-bold">{b.title}</h2>
          <a href={b.url} target="_blank" className="text-blue-600">
            {b.url}
          </a>
          <p>{b.description}</p>

          <div className="flex gap-2 mt-2">
            {b.tags.map(tag => (
              <span
                key={tag}
                className="bg-gray-200 px-2 py-1 cursor-pointer"
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-2 space-x-2">
            <button onClick={() => onEdit(b)}
              className="text-yellow-600">
              Edit
            </button>
            <button onClick={() => onDelete(b.id)}
              className="text-red-600">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
