import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import 'cross-fetch/polyfill';
import { graphql } from 'msw';
import { setupServer, SetupServerApi } from 'msw/node';
import React from 'react';
import { EmbeddedUserList, User } from '../src/generated/graphql';
import List from '../src/pages/list';
import { ANILIST_GRAPHQL_ENDPOINT } from '../src/utils/createApolloAnilist';


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
    graphql.query('Me', (req, res, ctx) => {
      return res(
        ctx.data({
          me: {
            id: "testUserId",
            username: "Test User",
            ratingSystems: [],
            userLists: [
              { id: "12345", name: "List 1" },
              { id: "67891", name: "List 2" }
            ] as EmbeddedUserList[]
          } as User
        })
      );
    }),

    // anilist.query('FetchAnimeInfo', (req, res, ctx) => {
    //   const { ids } = req.variables;

    //   return res(
    //     ctx.data({
    //       Page: {
    //         media: ids.map((id: number) => {
    //           return {
    //             id: id,
    //             title: {
    //               romaji: id.toString()
    //             },
    //             coverImage: {
    //               medium: "https://via.placeholder.com/230x320"
    //             }
    //           };
    //         })
    //       }
    //     })
    //   );
    // })
  );

  server.listen({
    onUnhandledRequest: 'warn'
  });

  // // https://stackoverflow.com/a/62148101
  // // IntersectionObserver isn't available in test environment
  // const mockIntersectionObserver = jest.fn();
  // mockIntersectionObserver.mockReturnValue({
  //   observe: () => null,
  //   unobserve: () => null,
  //   disconnect: () => null
  // });
  // window.IntersectionObserver = mockIntersectionObserver;
});

afterEach(() => {
  server.resetHandlers();
  apolloClient.cache.reset();
});

afterAll(() => {
  server.close();
});

describe('list page', () => {
  it('redirects to login page when not logged in', async () => {
    server.use(
      graphql.query('Me', (req, res, ctx) => {
        return res(ctx.data(undefined));
      })
    );
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    const router = { push: jest.fn() };
    useRouter.mockReturnValue(router);

    render(<WrappedListPage />);

    await waitFor(() => expect(router.push).toHaveBeenCalledWith("/login"));
  });

  it('displays the correct header', async () => {
    render(<WrappedListPage />);

    const header = await screen.findByText('Your Lists');
    expect(header).toBeTruthy();
  });

  it('displays two buttons given two user lists', async () => {
    render(<WrappedListPage />);

    const list1 = await screen.findByText('List 1');
    const list2 = await screen.findByText('List 2');

    expect(list1).toBeTruthy();
    expect(list2).toBeTruthy();
  });

  // it('displays two rows + header row given two user list entries', async () => {
  //   render(<WrappedListPage />);

  //   const rows = await screen.findAllByRole('row');
  //   expect(rows.length).toBe(3);
  // });

  // it('displays score for rated anime', async () => {
  //   render(<WrappedListPage />);

  //   const ratedRowLabel = await screen.findByText('123');
  //   const ratedRow = ratedRowLabel.closest('tr');
  //   expect(ratedRow).toHaveTextContent('8.4');
  // });

  // it('displays icon instead of score for unrated anime', async () => {
  //   render(<WrappedListPage />);

  //   const unratedRowLabel = await screen.findByText('999');
  //   const unratedRow = unratedRowLabel.closest('tr');
  //   expect(unratedRow).not.toHaveTextContent('1.1');

  //   // should be querying for an icon here but couldn't find a way to do it
  //   // without adding data-testid (very ugly)
  // });

  // it('displays edit button for each anime', async () => {
  //   render(<WrappedListPage />);

  //   const editButtons = await screen.findAllByRole('button', {
  //     name: /edit/i
  //   });
  //   expect(editButtons.length).toBe(2);
  // });

  // it('shows score in edit modal for rated anime', async () => {
  //   render(<WrappedListPage />);
  //   const ratedRowLabel = await screen.findByText('123');
  //   const ratedRow = ratedRowLabel.closest('tr');
  //   const editButton = await findByRole(ratedRow, 'button', {
  //     name: /edit/i
  //   });
  //   userEvent.click(editButton);

  //   const scoreField = await screen.findByLabelText(/score/i);
  //   expect(scoreField).toHaveDisplayValue('8.4');
  // });

  // it('shows add anime button', async () => {
  //   render(<WrappedListPage />);

  //   await screen.findByRole('button', {
  //     name: /add anime/i
  //   });
  // });
});