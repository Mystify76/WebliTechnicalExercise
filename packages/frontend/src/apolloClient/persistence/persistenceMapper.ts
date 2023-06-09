import { isArray, isObjectLike } from "lodash";

/**
  Quick notes:
  To make a query persist its results to local storage,
  you need to tell the persistenceMapper it is to do so.
  So when you define your gql statement, you need to do the following:
  -- Step 1. Add: import { addPersistedQueryTypeName } from "@persistenceMapper";
  -- Step 2. Call addPersistedQueryTypeName can pass it your query name.

  //    example:
  //
  //    addPersistedQueryTypeName("myQuery");  //  <-- Add this. It needs to match "query myQuery" on the second line.
  //    export const MYQUERY_QUERY = gql`
  //      query myQuery($valueType: MyQuery_ValueTypes!) {
  //        ......
  //      }
  //    `;
 */

const persistedQueryTypeNames: string[] = [];
export const addPersistedQueryTypeName = (queryName: string) => {
  if (!persistedQueryTypeNames.includes(queryName)) persistedQueryTypeNames.push(queryName);
};

export const persistenceMapper = async (data: string) => {
  // convert the json string data to an object.
  let source: any;
  try {
    source = JSON.parse(data);
  } catch (err) {
    return "";
  }
  // This object will be populated with the data we want to write to local storage.
  const results: any = {};
  // this is the array that will hold all the __ref values for the queries we want to keep
  // that are extracted from the ROOT_QUERY property during its reduction.
  const persistEntities: any[] = [];
  // get the root query info out of the data.
  const rootQuery = source.ROOT_QUERY;

  if (!rootQuery) return "";

  // reduce the ROOT_QUERY property, omitting any queries that do not have the @persist
  // directive. This will also put any matching query __ref values into the persistEntities array.
  results.ROOT_QUERY = Object.keys(rootQuery).reduce(
    (accumulator: any, key: string) => {
      // if the key is __typename, then skip out.
      if (key === "__typename") return accumulator;
      if (!persistedQueryTypeNames.some((name: string) => key.startsWith(name))) return accumulator;

      // This query is persisted, so add it to the accumulator.
      accumulator[key] = rootQuery[key];

      // now we need to get the __ref value(s) for this query so we can trim out the
      // top level source data that is not persisted.
      if (isObjectLike(rootQuery[key]) && isArray(rootQuery[key].nodes)) {
        const entities = rootQuery[key].nodes.map((item: any) => item.__ref);
        persistEntities.push(...entities);
      } else if (isArray(rootQuery[key])) {
        // if the data is an array, get all the __ref values from all the elements.
        const entities = rootQuery[key].map((item: any) => item.__ref);
        persistEntities.push(...entities);
      } else {
        // the data is not an array, so just get the __ref value directly.
        const entity = rootQuery[key].__ref;
        persistEntities.push(entity);
      }

      return accumulator;
    },
    { __typename: "Query" },
  );

  // now that we have the list of __ref values we want to keep, loop over that array
  // and get only the values out of the original parsed data that we want to keep.
  persistEntities.reduce((accumulator, key) => {
    accumulator[key] = source[key];
    return accumulator;
  }, results);

  // return our data to write to local storage.
  return JSON.stringify(results);
};
