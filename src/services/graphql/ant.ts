import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
import {
  ListEntriesQuery,
  ListEntriesQueryVariables,
} from '../../models/graphql';

export const ListEntriesDocument = gql`
  query {
    ants {
      name
      length
      weight
      color
    }
  }
`;

/**
 * __useListEntriesQuery__
 *
 * To run a query within a React component, call `useListEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListEntriesQuery({
 *   variables: {
 *      path: // value for 'path'
 *      page: // value for 'page'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useListEntriesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ListEntriesQuery,
    ListEntriesQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<ListEntriesQuery, ListEntriesQueryVariables>(
    ListEntriesDocument,
    baseOptions,
  );
}

export function useListEntriesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ListEntriesQuery,
    ListEntriesQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    ListEntriesQuery,
    ListEntriesQueryVariables
  >(ListEntriesDocument, baseOptions);
}

export type ListEntriesQueryHookResult = ReturnType<typeof useListEntriesQuery>;

export type ListEntriesLazyQueryHookResult = ReturnType<
  typeof useListEntriesLazyQuery
>;

export type ListEntriesQueryResult = ApolloReactCommon.QueryResult<
  ListEntriesQuery,
  ListEntriesQueryVariables
>;
