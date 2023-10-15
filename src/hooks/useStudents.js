import { useQuery } from "@tanstack/react-query";
import { getAllStudents } from "@/services/adminServices";

export const useGetStudents = (search, pageSearchParam, limitSearchParam) =>
  useQuery({
    queryKey: ["get-students", { search, pageSearchParam, limitSearchParam }],
    queryFn: () => getAllStudents(search, pageSearchParam, limitSearchParam),
    retry: false,
    refetchOnWindowFocus: true,
  });
