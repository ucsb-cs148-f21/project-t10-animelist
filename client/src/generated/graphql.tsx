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

export type AddUserListItemInput = {
  listId: Scalars['String'];
  mediaID: Scalars['Int'];
  subRatings?: Maybe<Array<Maybe<UserListSubRatingInput>>>;
  watchStatus: WatchStatus;
};

export type Block = {
  type: BlockType;
  width: Width;
};

export type BlockInput = {
  textBlockInput?: Maybe<TextBlockInput>;
  type: BlockType;
  userListBlockInput?: Maybe<UserListBlockInput>;
  width: Width;
};

export enum BlockType {
  Spacer = 'SPACER',
  Statistics = 'STATISTICS',
  Text = 'TEXT',
  UserList = 'USER_LIST'
}

export type ContinuousRatingSystem = RatingSystem & {
  __typename?: 'ContinuousRatingSystem';
  id: Scalars['ID'];
  name: Scalars['String'];
  offset: Scalars['Int'];
  ownerId?: Maybe<Scalars['String']>;
  size: Scalars['Int'];
  subRatings: Array<SubRating>;
};

export type ContinuousRatingSystemInput = {
  offset: Scalars['Int'];
};

export type CreateUserListInput = {
  name: Scalars['String'];
  ratingSystemId: Scalars['String'];
};

export type DiscreteRatingSystem = RatingSystem & {
  __typename?: 'DiscreteRatingSystem';
  id: Scalars['ID'];
  labels: Array<Scalars['String']>;
  name: Scalars['String'];
  ownerId?: Maybe<Scalars['String']>;
  size: Scalars['Int'];
  subRatings: Array<SubRating>;
};

export type DiscreteRatingSystemInput = {
  labels: Array<Scalars['String']>;
};

export type EmbeddedRatingSystem = {
  __typename?: 'EmbeddedRatingSystem';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type EmbeddedUserList = {
  __typename?: 'EmbeddedUserList';
  id: Scalars['ID'];
  name: Scalars['String'];
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
  addListEntry?: Maybe<Scalars['Boolean']>;
  addUserListItem?: Maybe<UserListItem>;
  createRatingSystem?: Maybe<RatingSystem>;
  createUserList?: Maybe<UserList>;
  login?: Maybe<LoginResponse>;
  logout?: Maybe<Scalars['Boolean']>;
  malLink?: Maybe<Scalars['Boolean']>;
  malLogin?: Maybe<LoginResponse>;
  register?: Maybe<RegisterResponse>;
  updateProfilePageBlocks?: Maybe<Scalars['Boolean']>;
  updateUserList?: Maybe<Scalars['Boolean']>;
  updateUserListEntry?: Maybe<UserListEntry>;
  updateUserListItem?: Maybe<UserListItem>;
};


export type MutationAddListEntryArgs = {
  input: UserListEntryInput;
};


export type MutationAddUserListItemArgs = {
  input: AddUserListItemInput;
};


export type MutationCreateRatingSystemArgs = {
  input: RatingSystemInput;
};


export type MutationCreateUserListArgs = {
  input: CreateUserListInput;
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


export type MutationUpdateProfilePageBlocksArgs = {
  input: ProfilePageInput;
};


export type MutationUpdateUserListArgs = {
  input: UpdateUserListInput;
};


export type MutationUpdateUserListEntryArgs = {
  input: UserListEntryInput;
};


export type MutationUpdateUserListItemArgs = {
  input: UpdateUserListItemInput;
};

export type ProfilePageInput = {
  blocks: Array<Array<BlockInput>>;
};

export type Query = {
  __typename?: 'Query';
  getRatingSystem?: Maybe<RatingSystem>;
  malLinkOauth: Scalars['String'];
  malLoginOauth: Scalars['String'];
  me?: Maybe<User>;
  userList?: Maybe<UserList>;
};


export type QueryGetRatingSystemArgs = {
  ratingSystemID: Scalars['String'];
};


export type QueryUserListArgs = {
  listId: Scalars['String'];
};

export type RatingSystem = {
  id: Scalars['ID'];
  name: Scalars['String'];
  ownerId?: Maybe<Scalars['String']>;
  size: Scalars['Int'];
  subRatings: Array<SubRating>;
};

export type RatingSystemInput = {
  continuousParam?: Maybe<ContinuousRatingSystemInput>;
  discreteParam?: Maybe<DiscreteRatingSystemInput>;
  name: Scalars['String'];
  ratingSystemType: RatingSystemType;
  size: Scalars['Int'];
  subRatings: Array<SubRatingInput>;
};

export enum RatingSystemType {
  Continuous = 'CONTINUOUS',
  Discrete = 'DISCRETE'
}

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  success: Scalars['Boolean'];
};

export type SpacerBlock = Block & {
  __typename?: 'SpacerBlock';
  type: BlockType;
  width: Width;
};

export type StatisticsBlock = Block & {
  __typename?: 'StatisticsBlock';
  additionalData: StatisticsBlockAdditionalData;
  type: BlockType;
  width: Width;
};

export type StatisticsBlockAdditionalData = {
  __typename?: 'StatisticsBlockAdditionalData';
  avgRating?: Maybe<Scalars['Int']>;
  entries: Scalars['Int'];
};

export type SubRating = {
  __typename?: 'SubRating';
  id: Scalars['ID'];
  name: Scalars['String'];
  weight: Scalars['Float'];
};

export type SubRatingInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
  weight: Scalars['Float'];
};

export type TextBlock = Block & {
  __typename?: 'TextBlock';
  textBlockInput: TextBlockSettings;
  type: BlockType;
  width: Width;
};

export type TextBlockInput = {
  text: Scalars['String'];
};

export type TextBlockSettings = {
  __typename?: 'TextBlockSettings';
  text: Scalars['String'];
};

export type UpdateUserListInput = {
  listId: Scalars['String'];
  name: Scalars['String'];
  ratingSystemId: Scalars['String'];
};

export type UpdateUserListItemInput = {
  listId: Scalars['String'];
  mediaID: Scalars['Int'];
  subRatings?: Maybe<Array<Maybe<UserListSubRatingInput>>>;
  watchStatus: WatchStatus;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  profilePageBlocks: Array<Array<Block>>;
  ratingSystems?: Maybe<Array<Maybe<EmbeddedRatingSystem>>>;
  updatedAt: Scalars['DateTime'];
  userList: Array<UserListEntry>;
  userLists?: Maybe<Array<Maybe<EmbeddedUserList>>>;
  username: Scalars['String'];
};

export type UserList = {
  __typename?: 'UserList';
  id: Scalars['ID'];
  items?: Maybe<Array<Maybe<UserListItem>>>;
  name: Scalars['String'];
  ownerId: Scalars['String'];
  ratingSystem?: Maybe<RatingSystem>;
};

export type UserListBlock = Block & {
  __typename?: 'UserListBlock';
  additionalData: UserListBlockAdditionalData;
  type: BlockType;
  userListBlockInput: UserListBlockSettings;
  width: Width;
};

export type UserListBlockAdditionalData = {
  __typename?: 'UserListBlockAdditionalData';
  userList: UserList;
};

export type UserListBlockInput = {
  listId: Scalars['String'];
  maxEntries?: Maybe<Scalars['Int']>;
};

export type UserListBlockSettings = {
  __typename?: 'UserListBlockSettings';
  listId: Scalars['String'];
  maxEntries?: Maybe<Scalars['Int']>;
};

export type UserListEntry = {
  __typename?: 'UserListEntry';
  mediaID: Scalars['Int'];
  rated: Scalars['Boolean'];
  rating: Scalars['Float'];
};

export type UserListEntryInput = {
  mediaID: Scalars['Int'];
  rated: Scalars['Boolean'];
  rating: Scalars['Float'];
};

export type UserListItem = {
  __typename?: 'UserListItem';
  mediaID: Scalars['Int'];
  rating?: Maybe<UserListRating>;
  watchStatus: Scalars['String'];
};

export type UserListRating = {
  __typename?: 'UserListRating';
  displayRating: Scalars['String'];
  rating: Scalars['Float'];
  subRatings: Array<UserListSubRating>;
};

export type UserListSubRating = {
  __typename?: 'UserListSubRating';
  displayRating?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  rating: Scalars['Float'];
};

export type UserListSubRatingInput = {
  id: Scalars['Int'];
  rating: Scalars['Float'];
};

export enum WatchStatus {
  Completed = 'COMPLETED',
  Dropped = 'DROPPED',
  OnHold = 'ON_HOLD',
  PlanToWatch = 'PLAN_TO_WATCH',
  Watching = 'WATCHING'
}

export enum Width {
  Full = 'FULL'
}

export type _AddUserListItemMutationVariables = Exact<{
  input: AddUserListItemInput;
}>;


export type _AddUserListItemMutation = { __typename?: 'Mutation', addUserListItem?: Maybe<{ __typename?: 'UserListItem', mediaID: number, watchStatus: string }> };

export type CreateUserListMutationVariables = Exact<{
  input: CreateUserListInput;
}>;


export type CreateUserListMutation = { __typename?: 'Mutation', createUserList?: Maybe<{ __typename?: 'UserList', id: string }> };

export type _UpdateUserListItemMutationVariables = Exact<{
  input: UpdateUserListItemInput;
}>;


export type _UpdateUserListItemMutation = { __typename?: 'Mutation', updateUserListItem?: Maybe<{ __typename?: 'UserListItem', mediaID: number, watchStatus: string, rating?: Maybe<{ __typename?: 'UserListRating', rating: number, displayRating: string, subRatings: Array<{ __typename?: 'UserListSubRating', id: number, rating: number }> }> }> };

export type AddListEntryMutationVariables = Exact<{
  input: UserListEntryInput;
}>;


export type AddListEntryMutation = { __typename?: 'Mutation', addListEntry?: Maybe<boolean> };

export type CreateRatingSystemMutationVariables = Exact<{
  input: RatingSystemInput;
}>;


export type CreateRatingSystemMutation = { __typename?: 'Mutation', createRatingSystem?: Maybe<{ __typename?: 'ContinuousRatingSystem', id: string, name: string } | { __typename?: 'DiscreteRatingSystem', id: string, name: string }> };

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

export type UpdateProfilePageBlocksMutationVariables = Exact<{
  input: ProfilePageInput;
}>;


export type UpdateProfilePageBlocksMutation = { __typename?: 'Mutation', updateProfilePageBlocks?: Maybe<boolean> };

export type UpdateUserListMutationVariables = Exact<{
  input: UpdateUserListInput;
}>;


export type UpdateUserListMutation = { __typename?: 'Mutation', updateUserList?: Maybe<boolean> };

export type UpdateUserListEntryMutationVariables = Exact<{
  input: UserListEntryInput;
}>;


export type UpdateUserListEntryMutation = { __typename?: 'Mutation', updateUserListEntry?: Maybe<{ __typename?: 'UserListEntry', mediaID: number, rated: boolean, rating: number }> };

export type _UserListQueryVariables = Exact<{
  listId: Scalars['String'];
}>;


export type _UserListQuery = { __typename?: 'Query', userList?: Maybe<{ __typename?: 'UserList', id: string, ownerId: string, name: string, items?: Maybe<Array<Maybe<{ __typename?: 'UserListItem', mediaID: number, watchStatus: string, rating?: Maybe<{ __typename?: 'UserListRating', displayRating: string, rating: number, subRatings: Array<{ __typename?: 'UserListSubRating', id: number, displayRating?: Maybe<string>, rating: number }> }> }>>>, ratingSystem?: Maybe<{ __typename?: 'ContinuousRatingSystem', offset: number, id: string, name: string, ownerId?: Maybe<string>, size: number, subRatings: Array<{ __typename?: 'SubRating', id: string, name: string, weight: number }> } | { __typename?: 'DiscreteRatingSystem', labels: Array<string>, id: string, name: string, ownerId?: Maybe<string>, size: number, subRatings: Array<{ __typename?: 'SubRating', id: string, name: string, weight: number }> }> }> };

export type MalLinkOauthQueryVariables = Exact<{ [key: string]: never; }>;


export type MalLinkOauthQuery = { __typename?: 'Query', malLinkOauth: string };

export type MalLoginOauthQueryVariables = Exact<{ [key: string]: never; }>;


export type MalLoginOauthQuery = { __typename?: 'Query', malLoginOauth: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: string, username: string, ratingSystems?: Maybe<Array<Maybe<{ __typename?: 'EmbeddedRatingSystem', id: string, name: string }>>>, userLists?: Maybe<Array<Maybe<{ __typename?: 'EmbeddedUserList', id: string, name: string }>>> }> };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', username: string, userLists?: Maybe<Array<Maybe<{ __typename?: 'EmbeddedUserList', id: string, name: string }>>>, profilePageBlocks: Array<Array<{ __typename?: 'SpacerBlock', width: Width, type: BlockType } | { __typename?: 'StatisticsBlock', width: Width, type: BlockType, additionalData: { __typename?: 'StatisticsBlockAdditionalData', entries: number } } | { __typename?: 'TextBlock', width: Width, type: BlockType, textBlockInput: { __typename?: 'TextBlockSettings', text: string } } | { __typename?: 'UserListBlock', width: Width, type: BlockType, userListBlockInput: { __typename?: 'UserListBlockSettings', listId: string, maxEntries?: Maybe<number> }, additionalData: { __typename?: 'UserListBlockAdditionalData', userList: { __typename?: 'UserList', name: string, items?: Maybe<Array<Maybe<{ __typename?: 'UserListItem', mediaID: number, watchStatus: string, rating?: Maybe<{ __typename?: 'UserListRating', displayRating: string }> }>>> } } }>> }> };

export type UserListBlockFieldsFragment = { __typename?: 'UserListBlock', userListBlockInput: { __typename?: 'UserListBlockSettings', listId: string, maxEntries?: Maybe<number> }, additionalData: { __typename?: 'UserListBlockAdditionalData', userList: { __typename?: 'UserList', name: string, items?: Maybe<Array<Maybe<{ __typename?: 'UserListItem', mediaID: number, watchStatus: string, rating?: Maybe<{ __typename?: 'UserListRating', displayRating: string }> }>>> } } };

export type TextBlockFieldsFragment = { __typename?: 'TextBlock', textBlockInput: { __typename?: 'TextBlockSettings', text: string } };

export type StatisticsBlockFieldsFragment = { __typename?: 'StatisticsBlock', additionalData: { __typename?: 'StatisticsBlockAdditionalData', entries: number } };

export type UserListQueryVariables = Exact<{ [key: string]: never; }>;


export type UserListQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', userList: Array<{ __typename?: 'UserListEntry', mediaID: number, rated: boolean, rating: number }> }> };

export const UserListBlockFieldsFragmentDoc = gql`
    fragment UserListBlockFields on UserListBlock {
  userListBlockInput {
    listId
    maxEntries
  }
  additionalData {
    userList {
      name
      items {
        mediaID
        watchStatus
        rating {
          displayRating
        }
      }
    }
  }
}
    `;
export const TextBlockFieldsFragmentDoc = gql`
    fragment TextBlockFields on TextBlock {
  textBlockInput {
    text
  }
}
    `;
export const StatisticsBlockFieldsFragmentDoc = gql`
    fragment StatisticsBlockFields on StatisticsBlock {
  additionalData {
    entries
  }
}
    `;
export const _AddUserListItemDocument = gql`
    mutation _addUserListItem($input: AddUserListItemInput!) {
  addUserListItem(input: $input) {
    mediaID
    watchStatus
  }
}
    `;
export type _AddUserListItemMutationFn = Apollo.MutationFunction<_AddUserListItemMutation, _AddUserListItemMutationVariables>;

/**
 * __use_AddUserListItemMutation__
 *
 * To run a mutation, you first call `use_AddUserListItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `use_AddUserListItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserListItemMutation, { data, loading, error }] = use_AddUserListItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function use_AddUserListItemMutation(baseOptions?: Apollo.MutationHookOptions<_AddUserListItemMutation, _AddUserListItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<_AddUserListItemMutation, _AddUserListItemMutationVariables>(_AddUserListItemDocument, options);
      }
export type _AddUserListItemMutationHookResult = ReturnType<typeof use_AddUserListItemMutation>;
export type _AddUserListItemMutationResult = Apollo.MutationResult<_AddUserListItemMutation>;
export type _AddUserListItemMutationOptions = Apollo.BaseMutationOptions<_AddUserListItemMutation, _AddUserListItemMutationVariables>;
export const CreateUserListDocument = gql`
    mutation CreateUserList($input: CreateUserListInput!) {
  createUserList(input: $input) {
    id
  }
}
    `;
export type CreateUserListMutationFn = Apollo.MutationFunction<CreateUserListMutation, CreateUserListMutationVariables>;

/**
 * __useCreateUserListMutation__
 *
 * To run a mutation, you first call `useCreateUserListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserListMutation, { data, loading, error }] = useCreateUserListMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserListMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserListMutation, CreateUserListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserListMutation, CreateUserListMutationVariables>(CreateUserListDocument, options);
      }
export type CreateUserListMutationHookResult = ReturnType<typeof useCreateUserListMutation>;
export type CreateUserListMutationResult = Apollo.MutationResult<CreateUserListMutation>;
export type CreateUserListMutationOptions = Apollo.BaseMutationOptions<CreateUserListMutation, CreateUserListMutationVariables>;
export const _UpdateUserListItemDocument = gql`
    mutation _UpdateUserListItem($input: UpdateUserListItemInput!) {
  updateUserListItem(input: $input) {
    mediaID
    watchStatus
    rating {
      rating
      displayRating
      subRatings {
        id
        rating
      }
    }
  }
}
    `;
export type _UpdateUserListItemMutationFn = Apollo.MutationFunction<_UpdateUserListItemMutation, _UpdateUserListItemMutationVariables>;

/**
 * __use_UpdateUserListItemMutation__
 *
 * To run a mutation, you first call `use_UpdateUserListItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `use_UpdateUserListItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserListItemMutation, { data, loading, error }] = use_UpdateUserListItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function use_UpdateUserListItemMutation(baseOptions?: Apollo.MutationHookOptions<_UpdateUserListItemMutation, _UpdateUserListItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<_UpdateUserListItemMutation, _UpdateUserListItemMutationVariables>(_UpdateUserListItemDocument, options);
      }
export type _UpdateUserListItemMutationHookResult = ReturnType<typeof use_UpdateUserListItemMutation>;
export type _UpdateUserListItemMutationResult = Apollo.MutationResult<_UpdateUserListItemMutation>;
export type _UpdateUserListItemMutationOptions = Apollo.BaseMutationOptions<_UpdateUserListItemMutation, _UpdateUserListItemMutationVariables>;
export const AddListEntryDocument = gql`
    mutation AddListEntry($input: UserListEntryInput!) {
  addListEntry(input: $input)
}
    `;
export type AddListEntryMutationFn = Apollo.MutationFunction<AddListEntryMutation, AddListEntryMutationVariables>;

/**
 * __useAddListEntryMutation__
 *
 * To run a mutation, you first call `useAddListEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddListEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addListEntryMutation, { data, loading, error }] = useAddListEntryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddListEntryMutation(baseOptions?: Apollo.MutationHookOptions<AddListEntryMutation, AddListEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddListEntryMutation, AddListEntryMutationVariables>(AddListEntryDocument, options);
      }
export type AddListEntryMutationHookResult = ReturnType<typeof useAddListEntryMutation>;
export type AddListEntryMutationResult = Apollo.MutationResult<AddListEntryMutation>;
export type AddListEntryMutationOptions = Apollo.BaseMutationOptions<AddListEntryMutation, AddListEntryMutationVariables>;
export const CreateRatingSystemDocument = gql`
    mutation CreateRatingSystem($input: RatingSystemInput!) {
  createRatingSystem(input: $input) {
    id
    name
  }
}
    `;
export type CreateRatingSystemMutationFn = Apollo.MutationFunction<CreateRatingSystemMutation, CreateRatingSystemMutationVariables>;

/**
 * __useCreateRatingSystemMutation__
 *
 * To run a mutation, you first call `useCreateRatingSystemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRatingSystemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRatingSystemMutation, { data, loading, error }] = useCreateRatingSystemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRatingSystemMutation(baseOptions?: Apollo.MutationHookOptions<CreateRatingSystemMutation, CreateRatingSystemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRatingSystemMutation, CreateRatingSystemMutationVariables>(CreateRatingSystemDocument, options);
      }
export type CreateRatingSystemMutationHookResult = ReturnType<typeof useCreateRatingSystemMutation>;
export type CreateRatingSystemMutationResult = Apollo.MutationResult<CreateRatingSystemMutation>;
export type CreateRatingSystemMutationOptions = Apollo.BaseMutationOptions<CreateRatingSystemMutation, CreateRatingSystemMutationVariables>;
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
export const UpdateProfilePageBlocksDocument = gql`
    mutation UpdateProfilePageBlocks($input: ProfilePageInput!) {
  updateProfilePageBlocks(input: $input)
}
    `;
export type UpdateProfilePageBlocksMutationFn = Apollo.MutationFunction<UpdateProfilePageBlocksMutation, UpdateProfilePageBlocksMutationVariables>;

/**
 * __useUpdateProfilePageBlocksMutation__
 *
 * To run a mutation, you first call `useUpdateProfilePageBlocksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfilePageBlocksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfilePageBlocksMutation, { data, loading, error }] = useUpdateProfilePageBlocksMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfilePageBlocksMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfilePageBlocksMutation, UpdateProfilePageBlocksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfilePageBlocksMutation, UpdateProfilePageBlocksMutationVariables>(UpdateProfilePageBlocksDocument, options);
      }
export type UpdateProfilePageBlocksMutationHookResult = ReturnType<typeof useUpdateProfilePageBlocksMutation>;
export type UpdateProfilePageBlocksMutationResult = Apollo.MutationResult<UpdateProfilePageBlocksMutation>;
export type UpdateProfilePageBlocksMutationOptions = Apollo.BaseMutationOptions<UpdateProfilePageBlocksMutation, UpdateProfilePageBlocksMutationVariables>;
export const UpdateUserListDocument = gql`
    mutation UpdateUserList($input: UpdateUserListInput!) {
  updateUserList(input: $input)
}
    `;
export type UpdateUserListMutationFn = Apollo.MutationFunction<UpdateUserListMutation, UpdateUserListMutationVariables>;

/**
 * __useUpdateUserListMutation__
 *
 * To run a mutation, you first call `useUpdateUserListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserListMutation, { data, loading, error }] = useUpdateUserListMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserListMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserListMutation, UpdateUserListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserListMutation, UpdateUserListMutationVariables>(UpdateUserListDocument, options);
      }
export type UpdateUserListMutationHookResult = ReturnType<typeof useUpdateUserListMutation>;
export type UpdateUserListMutationResult = Apollo.MutationResult<UpdateUserListMutation>;
export type UpdateUserListMutationOptions = Apollo.BaseMutationOptions<UpdateUserListMutation, UpdateUserListMutationVariables>;
export const UpdateUserListEntryDocument = gql`
    mutation UpdateUserListEntry($input: UserListEntryInput!) {
  updateUserListEntry(input: $input) {
    mediaID
    rated
    rating
  }
}
    `;
export type UpdateUserListEntryMutationFn = Apollo.MutationFunction<UpdateUserListEntryMutation, UpdateUserListEntryMutationVariables>;

/**
 * __useUpdateUserListEntryMutation__
 *
 * To run a mutation, you first call `useUpdateUserListEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserListEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserListEntryMutation, { data, loading, error }] = useUpdateUserListEntryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserListEntryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserListEntryMutation, UpdateUserListEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserListEntryMutation, UpdateUserListEntryMutationVariables>(UpdateUserListEntryDocument, options);
      }
export type UpdateUserListEntryMutationHookResult = ReturnType<typeof useUpdateUserListEntryMutation>;
export type UpdateUserListEntryMutationResult = Apollo.MutationResult<UpdateUserListEntryMutation>;
export type UpdateUserListEntryMutationOptions = Apollo.BaseMutationOptions<UpdateUserListEntryMutation, UpdateUserListEntryMutationVariables>;
export const _UserListDocument = gql`
    query _UserList($listId: String!) {
  userList(listId: $listId) {
    id
    ownerId
    name
    items {
      mediaID
      watchStatus
      rating {
        displayRating
        rating
        subRatings {
          id
          displayRating
          rating
        }
      }
    }
    ratingSystem {
      id
      name
      ownerId
      size
      ... on ContinuousRatingSystem {
        offset
      }
      ... on DiscreteRatingSystem {
        labels
      }
      subRatings {
        id
        name
        weight
      }
    }
  }
}
    `;

/**
 * __use_UserListQuery__
 *
 * To run a query within a React component, call `use_UserListQuery` and pass it any options that fit your needs.
 * When your component renders, `use_UserListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = use_UserListQuery({
 *   variables: {
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function use_UserListQuery(baseOptions: Apollo.QueryHookOptions<_UserListQuery, _UserListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<_UserListQuery, _UserListQueryVariables>(_UserListDocument, options);
      }
export function use_UserListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<_UserListQuery, _UserListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<_UserListQuery, _UserListQueryVariables>(_UserListDocument, options);
        }
export type _UserListQueryHookResult = ReturnType<typeof use_UserListQuery>;
export type _UserListLazyQueryHookResult = ReturnType<typeof use_UserListLazyQuery>;
export type _UserListQueryResult = Apollo.QueryResult<_UserListQuery, _UserListQueryVariables>;
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
    ratingSystems {
      id
      name
    }
    userLists {
      id
      name
    }
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
export const ProfileDocument = gql`
    query Profile {
  me {
    username
    userLists {
      id
      name
    }
    profilePageBlocks {
      width
      type
      ...UserListBlockFields
      ...TextBlockFields
      ...StatisticsBlockFields
    }
  }
}
    ${UserListBlockFieldsFragmentDoc}
${TextBlockFieldsFragmentDoc}
${StatisticsBlockFieldsFragmentDoc}`;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const UserListDocument = gql`
    query UserList {
  me {
    userList {
      mediaID
      rated
      rating
    }
  }
}
    `;

/**
 * __useUserListQuery__
 *
 * To run a query within a React component, call `useUserListQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserListQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserListQuery(baseOptions?: Apollo.QueryHookOptions<UserListQuery, UserListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserListQuery, UserListQueryVariables>(UserListDocument, options);
      }
export function useUserListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserListQuery, UserListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserListQuery, UserListQueryVariables>(UserListDocument, options);
        }
export type UserListQueryHookResult = ReturnType<typeof useUserListQuery>;
export type UserListLazyQueryHookResult = ReturnType<typeof useUserListLazyQuery>;
export type UserListQueryResult = Apollo.QueryResult<UserListQuery, UserListQueryVariables>;