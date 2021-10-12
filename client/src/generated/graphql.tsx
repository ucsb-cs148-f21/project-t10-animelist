import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An RFC-3339 compliant DateTime Scalar */
  DateTime: any;
};

export type LoginInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  success: Scalars['Boolean'];
  token: Scalars['String'];
  user: User;
};

export type MalOauthInput = {
  code: Scalars['String'];
  state: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<LoginResponse>;
  logout?: Maybe<Scalars['Boolean']>;
  malLink?: Maybe<Scalars['Boolean']>;
  malLogin?: Maybe<LoginResponse>;
  register?: Maybe<RegisterResponse>;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMalLinkArgs = {
  input: MalOauthInput;
};


export type MutationMalLoginArgs = {
  input: MalOauthInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type Query = {
  __typename?: 'Query';
  malLinkOauth: Scalars['String'];
  malLoginOauth: Scalars['String'];
  me?: Maybe<User>;
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  success: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: Maybe<{ __typename?: 'LoginResponse', success: boolean, token: string, user: { __typename?: 'User', id: string, username: string } }> };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: Maybe<boolean> };

export type MalLinkMutationVariables = Exact<{
  input: MalOauthInput;
}>;


export type MalLinkMutation = { __typename?: 'Mutation', malLink?: Maybe<boolean> };

export type MalLoginMutationVariables = Exact<{
  input: MalOauthInput;
}>;


export type MalLoginMutation = { __typename?: 'Mutation', malLogin?: Maybe<{ __typename?: 'LoginResponse', success: boolean, token: string, user: { __typename?: 'User', id: string, username: string } }> };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: Maybe<{ __typename?: 'RegisterResponse', success: boolean }> };

export type MalLinkOauthQueryVariables = Exact<{ [key: string]: never; }>;


export type MalLinkOauthQuery = { __typename?: 'Query', malLinkOauth: string };

export type MalLoginOauthQueryVariables = Exact<{ [key: string]: never; }>;


export type MalLoginOauthQuery = { __typename?: 'Query', malLoginOauth: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: string, username: string }> };


export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    success
    user {
      id
      username
    }
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MalLinkDocument = gql`
    mutation MALLink($input: MALOauthInput!) {
  malLink(input: $input)
}
    `;
export type MalLinkMutationFn = Apollo.MutationFunction<MalLinkMutation, MalLinkMutationVariables>;

/**
 * __useMalLinkMutation__
 *
 * To run a mutation, you first call `useMalLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMalLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [malLinkMutation, { data, loading, error }] = useMalLinkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMalLinkMutation(baseOptions?: Apollo.MutationHookOptions<MalLinkMutation, MalLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MalLinkMutation, MalLinkMutationVariables>(MalLinkDocument, options);
      }
export type MalLinkMutationHookResult = ReturnType<typeof useMalLinkMutation>;
export type MalLinkMutationResult = Apollo.MutationResult<MalLinkMutation>;
export type MalLinkMutationOptions = Apollo.BaseMutationOptions<MalLinkMutation, MalLinkMutationVariables>;
export const MalLoginDocument = gql`
    mutation MALLogin($input: MALOauthInput!) {
  malLogin(input: $input) {
    success
    user {
      id
      username
    }
    token
  }
}
    `;
export type MalLoginMutationFn = Apollo.MutationFunction<MalLoginMutation, MalLoginMutationVariables>;

/**
 * __useMalLoginMutation__
 *
 * To run a mutation, you first call `useMalLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMalLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [malLoginMutation, { data, loading, error }] = useMalLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMalLoginMutation(baseOptions?: Apollo.MutationHookOptions<MalLoginMutation, MalLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MalLoginMutation, MalLoginMutationVariables>(MalLoginDocument, options);
      }
export type MalLoginMutationHookResult = ReturnType<typeof useMalLoginMutation>;
export type MalLoginMutationResult = Apollo.MutationResult<MalLoginMutation>;
export type MalLoginMutationOptions = Apollo.BaseMutationOptions<MalLoginMutation, MalLoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    success
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const MalLinkOauthDocument = gql`
    query MALLinkOauth {
  malLinkOauth
}
    `;

/**
 * __useMalLinkOauthQuery__
 *
 * To run a query within a React component, call `useMalLinkOauthQuery` and pass it any options that fit your needs.
 * When your component renders, `useMalLinkOauthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMalLinkOauthQuery({
 *   variables: {
 *   },
 * });
 */
export function useMalLinkOauthQuery(baseOptions?: Apollo.QueryHookOptions<MalLinkOauthQuery, MalLinkOauthQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MalLinkOauthQuery, MalLinkOauthQueryVariables>(MalLinkOauthDocument, options);
      }
export function useMalLinkOauthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MalLinkOauthQuery, MalLinkOauthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MalLinkOauthQuery, MalLinkOauthQueryVariables>(MalLinkOauthDocument, options);
        }
export type MalLinkOauthQueryHookResult = ReturnType<typeof useMalLinkOauthQuery>;
export type MalLinkOauthLazyQueryHookResult = ReturnType<typeof useMalLinkOauthLazyQuery>;
export type MalLinkOauthQueryResult = Apollo.QueryResult<MalLinkOauthQuery, MalLinkOauthQueryVariables>;
export const MalLoginOauthDocument = gql`
    query MALLoginOauth {
  malLoginOauth
}
    `;

/**
 * __useMalLoginOauthQuery__
 *
 * To run a query within a React component, call `useMalLoginOauthQuery` and pass it any options that fit your needs.
 * When your component renders, `useMalLoginOauthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMalLoginOauthQuery({
 *   variables: {
 *   },
 * });
 */
export function useMalLoginOauthQuery(baseOptions?: Apollo.QueryHookOptions<MalLoginOauthQuery, MalLoginOauthQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MalLoginOauthQuery, MalLoginOauthQueryVariables>(MalLoginOauthDocument, options);
      }
export function useMalLoginOauthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MalLoginOauthQuery, MalLoginOauthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MalLoginOauthQuery, MalLoginOauthQueryVariables>(MalLoginOauthDocument, options);
        }
export type MalLoginOauthQueryHookResult = ReturnType<typeof useMalLoginOauthQuery>;
export type MalLoginOauthLazyQueryHookResult = ReturnType<typeof useMalLoginOauthLazyQuery>;
export type MalLoginOauthQueryResult = Apollo.QueryResult<MalLoginOauthQuery, MalLoginOauthQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;