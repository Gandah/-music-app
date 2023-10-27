import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const Searchbar = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="p-2 text-gray-400
  focus-within:text-redBlood w-[80%] "
    >
      <label htmlFor="search-field" className="sr-only">Search all songs</label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch className="h-5 w-5 ml-4" />
        <input
          id="search-field"
          type="search"
          autoComplete="off"
          name="search-field"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex flex-1 bg-transparent border-solid focus-within:border focus-within:border-redBlood focus-within:shadow-xl outline-none
        placeholder-gray-400 text-white px-3 py-1 ml-2 rounded-xl "
        />

      </div>
    </form>
  );
};

export default Searchbar;
