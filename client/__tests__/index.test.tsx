import React from 'react'
import Home from '../src/pages'
import TestRenderer from 'react-test-renderer';
import { MeDocument } from '../src/generated/graphql';
import { MockedProvider } from '@apollo/client/testing';

import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

describe('Home', () => {
  const meQueryMockHappy = {
    request: {
      query: MeDocument
    },
    result: {
      data: {
        me: {
          id: 1234,
          username: "Test user"
        }
      }
    }
  };

  it('renders Home page when user logged out', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    const h2 = await screen.findByRole('heading');
    expect(h2).toHaveTextContent('T10 - Anime List');
  });
})