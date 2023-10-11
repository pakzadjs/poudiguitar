import { useQuery } from "@tanstack/react-query";
import { getAllStudents } from "@/services/adminServices";

export const useGetStudents = (search, product) =>
  useQuery({
    queryKey: ["get-students", search, product],
    queryFn: getAllStudents,
    retry: false,
    refetchOnWindowFocus: true,
  });
