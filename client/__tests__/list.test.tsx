import React from 'react'
import List from '../src/pages/list';
import { findByRole, getByRole, render, screen, waitFor } from '@testing-library/react';
import { setupServer, SetupServerApi } from 'msw/node';
import { graphql } from 'msw';
import { ANILIST_GRAPHQL_ENDPOINT } from '../src/utils/createApolloAnilist';
import { ApolloClient, ApolloProvider, createHttpLink,  InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import router from 'next/router';

import 'cross-fetch/polyfill';
import '@testing-library/jest-dom'

const FAKE_BACKEND_ENDPOINT = 'https://localhost/graphql';
const anilist = graphql.link(ANILIST_GRAPHQL_ENDPOINT);

var apolloClient: ApolloClient<NormalizedCacheObject>;

const WrappedListPage: React.FC = (props) => {
  return (
    <ApolloProvider client={apolloClient}>
      <List />
    </ApolloProvider>
  )
}

var server: SetupServerApi;
beforeAll(() => {
  apolloClient = new ApolloClient({
    link: createHttpLink({ uri: FAKE_BACKEND_ENDPOINT }),
    cache: new InMemoryCache(),
  });

  server = setupServer(
    graphql.query('UserList', (req, res, ctx) => {
      return res(
        ctx.data({
          me: {
            userList: [
              {mediaID: 123, rated: true, rating: 8.4},
              {mediaID: 999, rated: false, rating: 1.1}
            ]
          }
        })
      );
    }),

    anilist.query('FetchAnimeInfo', (req, res, ctx) => {
      const { ids } = req.variables;

      return res(
        ctx.data({
          Page: {
            media: [ids.map(id => {
              return {
                id: id,
                title: {
                  romaji: "Dragon Ball Z"
                },
                coverImage: {
                  medium: "https://via.placeholder.com/230x320"
                }
              };
            })]
          }
        })
      );
    })
  );

  server.listen({
    onUnhandledRequest: 'warn'
  });
});

afterEach(() => {
  server.resetHandlers();
  apolloClient.cache.reset();
});

afterAll(() => {
  server.close();
});

describe('User list', () => {
  it('redirects to login page when not logged in', async () => {
    server.use(
      graphql.query('UserList', (req, res, ctx) => {
        return res(ctx.data(undefined));
      })
    );
    router.push = jest.fn();

    render(<WrappedListPage />);

    await waitFor(() => expect(router.push).toHaveBeenCalledWith("/login"));
  });

  it('displays two rows given two user list entries', async () => {
    render(<WrappedListPage />);

    const rows = await screen.findAllByRole('row');
    expect(rows.length).toBe(2);
  });

  it('displays score for rated anime', async () => {
    render(<WrappedListPage />);

    const rows = await screen.findAllByRole('row');
    expect(rows[0]).toHaveTextContent('8.4');
  });

  it('displays icon instead of score for unrated anime', async () => {
    render(<WrappedListPage />);

    const rows = await screen.findAllByRole('row');
    expect(rows[1]).not.toHaveTextContent('1.1');
    
    const icon = await findByRole(rows[1], 'img');
  });

  it('displays correct anime titles', async () => {
    render(<WrappedListPage />);

    const rows = await screen.findAllByRole('row');
    expect(rows[0]).toHaveTextContent('Dragon Ball Z');
    expect(rows[1]).toHaveTextContent('Dragon Ball Z');
  })

  it('displays edit button for each anime', () => {

  });

  it('opens edit modal after pressing edit button', () => {

  });
  
  it('shows score in edit modal for rated anime', () => {

  });

  it('shows add anime button', () => {

  });

  it('redirects to search page after clicking add anime button', () => {

  });
});