export interface ListContentType {
  title: string;
  url: string;
  author: string;
  numComments: number;
  points: number;
  objectID: number;
}

export type ListContentsType = ListContentType[];

export interface GetListsType {
  data: ListContentsType;
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
