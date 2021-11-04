import React from 'react'
import List from '../src/pages/list';
import { render, screen } from '@testing-library/react';
import { setupServer, SetupServerApi } from 'msw/node';
import { graphql } from 'msw';
import { ANILIST_GRAPHQL_ENDPOINT } from '../src/utils/createApolloAnilist';
import router from 'next/router';

var server: SetupServerApi;
beforeAll(() => {
  const anilist = graphql.link(ANILIST_GRAPHQL_ENDPOINT);

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

  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('User list', () => {
  it('redirects to login page when not logged in', () => {
    server.use(
      graphql.query('UserList', (req, res, ctx) => {
        return res(ctx.data(null));
      })
    );
    jest.mock('next/router', () => {
      push: jest.fn()
    });

    render(<List />);

    expect(router.push).toHaveBeenCalledWith("/login");
  });

  it('displays two rows given two user list entries', () => {
    render(<List />);

    const table = screen.getByRole('table');
    expect(table.firstChild).toHaveTextContent('Dragon Ball Z');
  });

  it('displays score for rated anime', () => {

  });

  it('displays icon instead of score for unrated anime', () => {

  });

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