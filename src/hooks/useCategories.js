import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/services/adminServices";

export const useGetCategories = () =>
  useQuery({
    queryKey: ["get-categories"],
    queryFn: getAllCategories,
    retry: false,
    refetchOnWindowFocus: true,
  });
