import { GqlModuleOptions } from "@nestjs/graphql";

export interface ApplicationModuleConfig {
  rawBody: boolean;
  host: string;
  graphql: GqlModuleOptions;
}

export interface ConnectionEdge<T> {
  cursor: string;
  node: T;
}

export interface RawQueryResults<T> {
  nodes: T[];
}

export interface RawGetManyAndCountResults<T> {
  nodes: T[];
  count?: number;
}

export interface Connection<T> {
  edges: Array<ConnectionEdge<T>>;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
}

export interface Residents {
  userId: string;
  name?: string;
  gender?: string;
  birthday?: Date;
  moveInDate?: Date;
  levelOfCare?: string;
  hobbies?: string[];
  roomNumber?: string;
}

export interface Programs {
  id: string;
  name?: string;
  start?: Date;
  end?: Date;
  mode?: string;
  dimensions?: string[];
  facilitators?: string[];
  hobbies?: string[];
  levelsOfCare?: string[];
  attendees?: string[];
}
