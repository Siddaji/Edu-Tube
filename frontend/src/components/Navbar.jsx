import { Link } from "react-router-dom";

function Navbar({ searchTerm, setSearchTerm }) {
  return (
    <nav className="bg-red-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        EduTube
      </Link>
      <div className="flex items-center space-x-4 text-1xl text-white">
        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-2 py-1 rounded text-black"
        />
        <Link to="/upload" className="hover:underline">
          Upload
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
