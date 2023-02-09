import InputWithLabel from './components/InputWithLabel';
import List from './components/List';
import {
  GetListsType,
  ListContentsType,
  ListContentType,
  ListsAction,
  ListsState,
  ReducerActionType
} from './interfaces';
import ApiUtilities, { ApiEndpoint } from './utilities/ApiUtilities';
import { useStorageState } from './utilities/HookUtilities';

import { useEffect, useReducer } from 'react';
import './App.css';

function App() {
  const [searchValue, setSearchValue] = useStorageState(
    'search_value',
    'React'
  );
  const defaultLists: ListContentsType = [];
  const [lists, dipatchLists] = useReducer(listsReducer, {
    data: defaultLists,
    isLoading: false,
    isError: false
  });

  function listsReducer(state: ListsState, action: ListsAction): ListsState {
    switch (action.type) {
      case ReducerActionType.ListsFetchInit:
        return {
          ...state,
          isLoading: true,
          isError: false
        };
      case ReducerActionType.ListsFetchSuccess:
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload
        };
      case ReducerActionType.ListsFetchFailure:
        return {
          ...state,
          isLoading: false,
          isError: true
        };
      case ReducerActionType.RemoveList:
        return {
          ...state,
          data: state.data.filter(
            (list: ListContentType) => action.payload.objectID !== list.objectID
          )
        };
      default:
        throw new Error();
    }
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setSearchValue(val);
    getLists();
  }

  function handleRemoveList(item: ListContentType) {
    dipatchLists({ type: ReducerActionType.RemoveList, payload: item });
  }

  async function getLists() {
    dipatchLists({
      type: ReducerActionType.ListsFetchInit
    });

    try {
      // const result = await ApiUtilities.get<GetListsType>('public/lists.json');
      const result = await ApiUtilities.get<GetListsType>(
        `${ApiEndpoint}search?query=${searchValue}`
      );
      const results = result?.hits;
      const newLists =
        results.length > 0
          ? results.map((item) => {
              const newHits: ListContentType = {
                title: item.title,
                url: item.url,
                author: item.author,
                numComments: item.num_comments,
                points: item.points,
                objectID: item.objectID,
                createdAt: item.created_at
              };
              return newHits;
            })
          : defaultLists;
      dipatchLists({
        type: ReducerActionType.ListsFetchSuccess,
        payload: newLists
      });
    } catch (error) {
      dipatchLists({ type: ReducerActionType.ListsFetchFailure });
      console.error(error);
    }
  }

  const searchedLists = lists.data.filter((list) => {
    const searchVal = searchValue.trim().toLowerCase();
    const filterTitle = list.title?.toLowerCase();

    return filterTitle?.includes(searchVal);
  });

  const errorTemplate = <div>Something went wrong</div>;
  const loadingTemplate = <div>Loading</div>;
  const listsTemplate = (
    <List lists={searchedLists} onRemoveItem={handleRemoveList} />
  );

  useEffect(() => {
    getLists();
  }, []);

  return (
    <>
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
        {lists.isError && errorTemplate}
        {lists.isLoading ? loadingTemplate : listsTemplate}
      </div>
    </>
  );
}

export default App;
