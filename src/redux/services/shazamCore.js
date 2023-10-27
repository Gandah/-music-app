import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core7.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set(
        'X-RapidAPI-Key',
        import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY,
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: (params) => `charts/get-top-songs-in_world_by_genre?genre=${params.genre}&limit=${params.limit}`,
    }),
    getSongDetails: builder.query({ query: ({ songid }) => `/songs/get_details?id=${songid}`,
    }),
    getSongRelated: builder.query({ query: ({ songid }) => `/songs/list-recommendations?id=${songid}`,
    }),
    getArtistDetails: builder.query({ query: (artistId) => `/artist/get-top-songs?id=${artistId}`,
    }),
    getSongsByCountry: builder.query({ query: (countryCode) => `/charts/get-top-songs-in-country?country_code=${countryCode}&limit=${30}`,
    }),
    getSongsBySearch: builder.query({ query: (searchTerm) => `/search?term=${searchTerm}&limit=30`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
} = shazamCoreApi;
