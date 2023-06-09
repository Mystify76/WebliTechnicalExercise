/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Program = {
  __typename?: 'Program';
  attendees?: Maybe<Array<Scalars['String']>>;
  dimensions?: Maybe<Array<Scalars['String']>>;
  end?: Maybe<Scalars['DateTime']>;
  facilitators?: Maybe<Array<Scalars['String']>>;
  hobbies?: Maybe<Array<Scalars['String']>>;
  id?: Maybe<Scalars['String']>;
  levelsOfCare?: Maybe<Array<Scalars['String']>>;
  mode?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['DateTime']>;
};

export type Query = {
  __typename?: 'Query';
  findProgramById: Program;
  findProgramByName: Array<Program>;
  findProgramsWithHighResidents: Array<Program>;
  findResidentById: User;
  findResidentByName: Array<User>;
  getAllResidents: Array<User>;
};


export type QueryfindProgramByIdArgs = {
  id: Scalars['String'];
};


export type QueryfindProgramByNameArgs = {
  name: Scalars['String'];
};


export type QueryfindProgramsWithHighResidentsArgs = {
  limit: Scalars['Int'];
  min: Scalars['Int'];
};


export type QueryfindResidentByIdArgs = {
  id: Scalars['String'];
};


export type QueryfindResidentByNameArgs = {
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  birthday?: Maybe<Scalars['DateTime']>;
  gender?: Maybe<Scalars['String']>;
  hobbies?: Maybe<Array<Scalars['String']>>;
  levelOfCare?: Maybe<Scalars['String']>;
  moveInDate?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  recommendedPrograms?: Maybe<Array<Program>>;
  roomNumber?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type GetAllResidentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllResidentsQuery = { __typename?: 'Query', getAllResidents: Array<{ __typename?: 'User', userId: string, name?: string | null }> };

export type GetResidentQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetResidentQuery = { __typename?: 'Query', findResidentById: { __typename?: 'User', userId: string, name?: string | null, gender?: string | null, birthday?: any | null, moveInDate?: any | null, levelOfCare?: string | null, hobbies?: Array<string> | null, roomNumber?: string | null, recommendedPrograms?: Array<{ __typename?: 'Program', id?: string | null, name?: string | null, mode?: string | null, start?: any | null, end?: any | null, dimensions?: Array<string> | null, facilitators?: Array<string> | null, hobbies?: Array<string> | null, levelsOfCare?: Array<string> | null }> | null } };


export const GetAllResidentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllResidents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllResidents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetAllResidentsQuery, GetAllResidentsQueryVariables>;
export const GetResidentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetResident"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findResidentById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"moveInDate"}},{"kind":"Field","name":{"kind":"Name","value":"levelOfCare"}},{"kind":"Field","name":{"kind":"Name","value":"hobbies"}},{"kind":"Field","name":{"kind":"Name","value":"roomNumber"}},{"kind":"Field","name":{"kind":"Name","value":"recommendedPrograms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"}},{"kind":"Field","name":{"kind":"Name","value":"facilitators"}},{"kind":"Field","name":{"kind":"Name","value":"hobbies"}},{"kind":"Field","name":{"kind":"Name","value":"levelsOfCare"}}]}}]}}]}}]} as unknown as DocumentNode<GetResidentQuery, GetResidentQueryVariables>;