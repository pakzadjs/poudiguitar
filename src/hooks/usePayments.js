import { useQuery } from "@tanstack/react-query";
import { getPayments } from "@/services/paymentService";

export const useGetMyPayments = () =>
  useQuery({
    queryKey: ["get-my-payments"],
    queryFn: getPayments,
    retry: false,
    refetchOnWindowFocus: true,
  });
