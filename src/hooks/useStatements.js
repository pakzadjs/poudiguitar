import { useQuery } from "@tanstack/react-query";
import { getStatements } from "@/services/adminServices";
import { getClientStatement } from "@/services/statementService";

export const useGetStatements = () =>
  useQuery({
    queryKey: ["get-statements"],
    queryFn: getStatements,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetStatement = () =>
  useQuery({
    queryKey: ["get-statement"],
    queryFn: getClientStatement,
    retry: false,
    refetchOnWindowFocus: true,
  });
