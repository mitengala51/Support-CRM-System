import "./SearchFilterBar.css";

export default function SearchFilterBar({ search, setSearch, status, setStatus }) {

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function handleStatus(e) {
    setStatus(e.target.value);
  }

  return (
    <div className="SearchFilterBar">
      <div className="SearchInput">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Search by name, email, ID, or description..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      <select value={status} onChange={handleStatus}>
        <option value="">All Statuses</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Closed">Closed</option>
      </select>
    </div>
  );
}