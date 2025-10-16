import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the shape of the message of the day response (matches actual API)
export interface MessageOfTheDay {
  id: string;
  content: string;
  createdAt: string;
  userId: string;
}

// Define the health check response
export interface HealthResponse {
  status: string;
  timestamp: string;
  service: string;
}

// Define the API slice
export const messageOfTheDayApi = createApi({
  reducerPath: 'messageOfTheDayApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://s2d9u010sg.execute-api.us-west-2.amazonaws.com',
  }),
  tagTypes: ['MessageOfTheDay', 'Health'],
  endpoints: (builder) => ({
    // GET /api/messageoftheday - Get message of the day
    getMessageOfTheDay: builder.query<MessageOfTheDay, void>({
      query: () => '/api/messageoftheday',
      providesTags: ['MessageOfTheDay'],
    }),
    // POST /api/messageoftheday - Create a new message of the day
    createMessageOfTheDay: builder.mutation<MessageOfTheDay, string>({
      query: (messageText) => ({
        url: '/api/messageoftheday',
        method: 'POST',
        body: `"${messageText}"`,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['MessageOfTheDay'],
    }),
    // GET /health - Health check endpoint
    getHealthCheck: builder.query<HealthResponse, void>({
      query: () => '/health',
      providesTags: ['Health'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetMessageOfTheDayQuery,
  useCreateMessageOfTheDayMutation,
  useGetHealthCheckQuery,
} = messageOfTheDayApi;
