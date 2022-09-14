import React, { useState } from 'react';
import styled from 'styled-components';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);
  const [showNoError, setShowNoError] = useState(false);
  const [showNoLoading, setShowNoLoading] = useState(false);
  const [showNoSearch, setShowNoSearch] = useState(false);
  const [showNoSearchResults, setShowNoSearchResults] = useState(false);

  const handleChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setShowResults(false);
    setShowError(false);
    setShowLoading(false);
    setShowNoResults(false);
    setShowNoError(false);
    setShowNoLoading(false);
    setShowNoSearch(false);
    setShowNoSearchResults(false);
    setLoading(true);
    setError(null);
    setResults([]);
    fetch(`https://api.github.com/search/repositories?q=${search}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setResults(data.items);
        setShowResults(true);
        setShowNoResults(false);
        setShowNoError(false);
        setShowNoLoading(false);
        setShowNoSearch(false);
        setShowNoSearchResults(false);
        if (data.items.length === 0) {
          setShowNoResults(true);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        setShowError(true);
        setShowNoResults(false);
        setShowNoError(false);
        setShowNoLoading(false);
        setShowNoSearch(false);
        setShowNoSearchResults(false);
        if (error.toString().includes('404')) {
          setShowNoResults(true);
        }
      });
  };

  const handleClear = () => {
    setShowResults(false);
    setShowError(false);
    setShowLoading(false);
    setShowNoResults(false);
    setShowNoError(false);
    setShowNoLoading(false);
    setShowNoSearch(false);
    setShowNoSearchResults(false);
    setSearch('');
    setResults([]);
  };

  // const handleSearch = (e) => {

  return (
    <div className="flex flex-row">
      <InputControl className="border border-gray-400 w-full">
        <form className="flex flex-row w-full p-2" onSubmit={handleSubmit}>
          <input type="text" placeholder="Search" value={search} onChange={handleChange} />
          {search.length > 0 && <button onClick={handleClear}>clear</button>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded right-full"
          >
            Search
          </button>
        </form>
      </InputControl>

      {showResults && (
        <div className="flex flex-col">
          {results.map((result: any) => (
            <div className="flex flex-row">
              <div className="flex flex-col">
                <h3 className="text-xl font-bold">{result.name}</h3>
                <p className="text-sm">{result.description}</p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-bold">{result.language}</h3>
                <p className="text-sm">{result.language}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {showError && (
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">Error</h3>
          <p className="text-sm">{error}</p>
        </div>
      )}
      {showLoading && (
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">Loading</h3>
          <p className="text-sm">Loading...</p>
        </div>
      )}
      {showNoResults && (
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">No Results</h3>
          <p className="text-sm">No results found for {search}</p>
        </div>
      )}
      {showNoError && (
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">Error</h3>
          <p className="text-sm">{error}</p>
        </div>
      )}
      {showNoLoading && (
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">Loading</h3>
          <p className="text-sm">Loading...</p>
        </div>
      )}
      {showNoSearch && (
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">No Search</h3>
          <p className="text-sm">Please enter a search term</p>
        </div>
      )}
      {showNoSearchResults && (
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">No Search Results</h3>
          <p className="text-sm">No results found for {search}</p>
        </div>
      )}
    </div>
  );
}

const InputControl = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 1rem;
  padding: 0;
  border-radius: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  > form {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 0.5rem;
  }

  > form > input {
    width: 100%;
    padding: 0.5rem;
    border: none;
    font-size: 1.2rem;
    outline: none;
    background-color: #fafafa;
    color: #000;

    &:focus {
      outline: none;
    }
  }
`;
