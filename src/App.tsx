import InputWithLabel from './components/InputWithLabel';
import List from './components/List';
import { ListContentsType, ListContentType, GetListsType } from './interfaces';
import { useStorageState } from './utilities/HookUtilities';
import ApiUtilities from './utilities/ApiUtilities';

import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [searchValue, setSearchValue] = useStorageState(
    'search_value',
    'React'
  );
  const defaultListsState: ListContentsType = [];
  const [lists, setLists] = useState(defaultListsState);

  async function getLists() {
    try {
      const result = await ApiUtilities.get<GetListsType>('public/lists.json');
      const newLists = result?.data || defaultListsState;
      // setLists(newLists);
      setTimeout(() => {
        setLists(newLists);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setSearchValue(val);
  }

  function handleRemoveList(item: ListContentType) {
    const newLists = lists.filter((list) => {
      return item.objectID !== list.objectID;
    });
    console.log(newLists);

    setLists(newLists);
  }

  const searchedLists = lists.filter((list) => {
    const searchVal = searchValue.trim().toLowerCase();
    const filterTitle = list.title.toLowerCase();

    return filterTitle.includes(searchVal);
  });

  useEffect(() => {
    getLists();
  }, []);

  return (
    <div className='App'>
      <h1>My Hacker Stories</h1>
      <InputWithLabel
        id='search'
        value={searchValue}
        isFocused={true}
        onInputChange={handleSearch}
      >
        Search:
      </InputWithLabel>
      <hr />
      <List lists={searchedLists} onRemoveItem={handleRemoveList} />
    </div>
  );
}

export default App;
