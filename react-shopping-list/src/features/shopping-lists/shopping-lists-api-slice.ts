import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ShoppingList } from '../../pages/ShoppingListsPage';
import { apiBaseUrl } from '../../config';
import { RootState } from '../../store';

type CreateShoppingListBody = Omit<ShoppingList, 'id'>;

export const shoppingListsApi = createApi({
  reducerPath: 'shoppingListsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl + '/api/v1',
    prepareHeaders: (headers, { getState }) => {
    const rootState: RootState = getState() as RootState;

    headers.append('authorization', `bearer ${rootState.auth.token}`);
  }}),
  endpoints: (builder) => ({
    getShoppingLists: builder.query<ShoppingList[], void>({
      query: () => ({ url: '/shopping-lists' }),
    }),
    createShoppingList: builder.mutation<ShoppingList, CreateShoppingListBody>({
      query: (body) => ({
        url: '/shopping-lists',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetShoppingListsQuery,
  useCreateShoppingListMutation,
} = shoppingListsApi;
