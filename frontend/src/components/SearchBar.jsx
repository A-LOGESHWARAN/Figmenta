export default function SearchBar({ search, setSearch }) {
  return (
    <input
      className="border p-2 w-full mb-4"
      placeholder="Search by title or URL..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
