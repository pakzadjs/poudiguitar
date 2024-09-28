import { useQuery } from "@tanstack/react-query";
import { getAllCoupons } from "@/services/adminServices";

export const useGetCoupons = () =>
  useQuery({
    queryKey: ["get-coupons"],
    queryFn: getAllCoupons,
    retry: false,
    refetchOnWindowFocus: true,
  });
