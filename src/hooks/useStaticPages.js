import { useQuery } from "@tanstack/react-query";
import { getAllStaticPages } from "@/services/adminServices";

export const useGetStaticPages = () =>
  useQuery({
    queryKey: ["get-staticPages"],
    queryFn: getAllStaticPages,
    retry: false,
    refetchOnWindowFocus: true,
  });
