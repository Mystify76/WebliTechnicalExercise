import { gql, useQuery } from "@apollo/client";
import { GetAllResidentsQuery, GetResidentQuery } from "../gql/graphql";

const GET_ALL_RESIDENTS = gql`
  query GetAllResidents {
    getAllResidents {
      userId
      name
    }
  }
`;

const GET_RESIDENT = gql`
  query GetResident($id: String!) {
    findResidentById(id: $id) {
      userId
      name
      gender
      birthday
      moveInDate
      levelOfCare
      hobbies
      roomNumber
      recommendedPrograms {
        id
        name
        mode
        start
        end
        dimensions
        facilitators
        hobbies
        levelsOfCare
      }
    }
  }
`;

export const useGetAllResidents = () =>
  useQuery<GetAllResidentsQuery>(GET_ALL_RESIDENTS, {
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
    nextFetchPolicy: "cache-first",
  });

export const useGetResident = (userId: string) =>
  useQuery<GetResidentQuery>(GET_RESIDENT, {
    variables: {
      id: userId,
    },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
    nextFetchPolicy: "cache-first",
  });
