import {Ant} from './ant';

export type Maybe<T> = T | null;
export type Exact<T extends {[key: string]: any}> = {[K in keyof T]: T[K]};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  listEntries?: Maybe<ListEntriesResult>;
};

export type QueryListEntriesArgs = {
  cursor: Scalars['String'];
};

export type ListEntriesResult = {
  ants: Array<Ant>;
};

export type ListEntriesQueryVariables = Exact<{
  cursor?: Maybe<Scalars['String']>;
}>;

export type ListEntriesQuery = {
  ants: Array<Ant>;
};
