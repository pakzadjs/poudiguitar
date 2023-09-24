import { addToCart, removeFromCart } from "@/services/cartService";
import { useMutation } from "@tanstack/react-query";

export const useAddToCart = () =>
  useMutation({
    mutationFn: addToCart,
  });

export const useRemoveFromCart = () =>
  useMutation({
    mutationFn: removeFromCart,
  });
