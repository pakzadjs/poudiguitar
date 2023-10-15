import { useQuery } from "@tanstack/react-query";
import { getStatements } from "@/services/adminServices";

export const useGetStatements = () =>
  useQuery({
    queryKey: ["get-statements"],
    queryFn: getStatements,
    retry: false,
    refetchOnWindowFocus: true,
  });
