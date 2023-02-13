import List from './components/List';
import SearchForm from './components/SearchForm';

import {
  GetListsType,
  ListContentsType,
  ListContentType,
  ListsAction,
  ListsState,
  ReducerActionType
} from './types';

import { API_ENDPOINT } from './utils/ApiUtils';
import { useStorageState } from './utils/HookUtils';

import axios from 'axios';
import { useCallback, useEffect, useReducer, useState } from 'react';

import './App.css';

function App() {
  const [searchValue, setSearchValue] = useStorageState(
    'search_value',
    'React'
  );
  const [url, setUrl] = useState(`${API_ENDPOINT}search?query=${searchValue}`);
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

  function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUrl(`${API_ENDPOINT}search?query=${searchValue}`);
  }

  function handleRemoveList(item: ListContentType) {
    dipatchLists({ type: ReducerActionType.RemoveList, payload: item });
  }

  const handleFetchLists = useCallback(async () => {
    // comment reason: button disabled set
    // if (!searchValue.trim()) {
    //   return;
    // }

    dipatchLists({
      type: ReducerActionType.ListsFetchInit
    });

    try {
      // const result = await ApiUtilities.get<GetListsType>('public/lists.json');
      const result = await axios.get<GetListsType>(url);
      const results = result.data?.hits;
      console.log(results);
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
  }, [url]);

  const errorTemplate = <div>Something went wrong</div>;
  const loadingTemplate = <div>Loading</div>;
  const listsTemplate = (
    <List lists={lists.data} onRemoveItem={handleRemoveList} />
  );

  useEffect(() => {
    handleFetchLists();
  }, [handleFetchLists]);

  return (
    <>
      <div className='App'>
        <h1>My Hacker Stories</h1>
        <SearchForm
          searchValue={searchValue}
          onSearchInput={handleSearchInput}
          onSearchSubmit={handleSearchSubmit}
        />
        <hr />
        {lists.isError && errorTemplate}
        {lists.isLoading ? loadingTemplate : listsTemplate}
      </div>
    </>
  );
}

export default App;
