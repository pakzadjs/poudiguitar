"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/services/adminServices";
import { getUserProfile } from "@/services/authServices";

export const useGetUser = () =>
  useQuery({
    queryKey: ["get-user"],
    queryFn: getUserProfile,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetUsers = (search) =>
  useQuery({
    queryKey: ["get-users", search],
    queryFn: getAllUsers,
    retry: false,
    refetchOnWindowFocus: true,
  });
