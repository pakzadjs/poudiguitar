import { useQuery } from "@tanstack/react-query";
import { getAllCourses, getAllDownloadables } from "@/services/adminServices";

export const useGetCourses = () =>
  useQuery({
    queryKey: ["get-courses"],
    queryFn: getAllCourses,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetDownloads = () =>
  useQuery({
    queryKey: ["get-downloads"],
    queryFn: getAllDownloadables,
    retry: false,
    refetchOnWindowFocus: true,
  });
