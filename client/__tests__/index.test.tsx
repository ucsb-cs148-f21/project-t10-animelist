import React from 'react'
import Home from '../src/pages'
import TestRenderer from 'react-test-renderer';
import { MeDocument } from '../src/generated/graphql';
import { MockedProvider } from '@apollo/client/testing';

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

  it('renders Home page when user logged out', () => {
    const component = TestRenderer.create(
      <MockedProvider mocks={[]} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    const h2 = component.root.findByType("h2");
    expect(h2.children.join('')).toContain('Anime List App');
  });
})