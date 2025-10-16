import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the shape of the message of the day response
export interface MessageOfTheDay {
  id: string;
  message: string;
  date: string;
  author?: string;
}

// Define the API response shape from quotable.io
interface QuotableResponse {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
}

// Define the API slice
export const messageOfTheDayApi = createApi({
  reducerPath: 'messageOfTheDayApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.quotable.io/', // Using a free quotes API as example
  }),
  tagTypes: ['MessageOfTheDay'],
  endpoints: (builder) => ({
    // Get a random message/quote of the day
    getMessageOfTheDay: builder.query<MessageOfTheDay, void>({
      query: () => 'random',
      transformResponse: (response: QuotableResponse): MessageOfTheDay => ({
        id: response._id,
        message: response.content,
        date: new Date().toISOString().split('T')[0],
        author: response.author,
      }),
      providesTags: ['MessageOfTheDay'],
    }),
    // Get a specific message by ID (if needed)
    getMessageById: builder.query<MessageOfTheDay, string>({
      query: (id) => `quotes/${id}`,
      transformResponse: (response: QuotableResponse): MessageOfTheDay => ({
        id: response._id,
        message: response.content,
        date: new Date().toISOString().split('T')[0],
        author: response.author,
      }),
      providesTags: (_result, _error, id) => [{ type: 'MessageOfTheDay', id }],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetMessageOfTheDayQuery,
  useGetMessageByIdQuery,
} = messageOfTheDayApi;