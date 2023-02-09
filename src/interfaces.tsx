interface ListType {
  title: string;
  url: string;
  author: string;
  points: number;
  objectID: number;
}

export interface ListApiType extends ListType {
  num_comments: number;
  created_at: number;
}

export interface ListContentType extends ListType {
  numComments: number;
  createdAt: number;
}

export type ListContentsType = ListContentType[];

export interface GetListsType {
  hits: ListApiType[];
  hitsPerpage: number;
  nbHits: number;
  nbPages: number;
  page: number;
}

export enum ReducerActionType {
  RemoveList = 'REMOVE_LIST',
  ListsFetchInit = 'LISTS_FETCH_INIT',
  ListsFetchSuccess = 'LISTS_FETCH_SUCCESS',
  ListsFetchFailure = 'LISTS_FETCH_FAILUER'
}

interface ListFetchInitAction {
  type: ReducerActionType.ListsFetchInit;
}

interface ListFetchSuccessAction {
  type: ReducerActionType.ListsFetchSuccess;
  payload: ListContentsType;
}

interface ListFetchFailureAction {
  type: ReducerActionType.ListsFetchFailure;
}

interface ListRemoveAction {
  type: ReducerActionType.RemoveList;
  payload: ListContentType;
}

export interface ListsState {
  data: ListContentsType;
  isLoading: boolean;
  isError: boolean;
}

export type ListsAction =
  | ListFetchInitAction
  | ListFetchSuccessAction
  | ListFetchFailureAction
  | ListRemoveAction;
