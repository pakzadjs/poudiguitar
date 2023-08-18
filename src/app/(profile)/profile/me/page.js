"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";

import { useGetUser } from "@/hooks/useAuth";
import TextField from "@/common/TextField";
import { includeObj } from "@/utils/objectUtils";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/services/authServices";

export default function Me() {
  const [formData, setFormData] = useState({});
  const { data, isLoading } = useGetUser();
  const { user } = data || {};
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutateAsync } = useMutation({
    mutationFn: updateProfile,
  });

  const includeskey = ["name", "email", "phoneNumber", "biography"];
  useEffect(() => {
    if (user) setFormData(includeObj(user, includeskey));
  }, [user]);

  const sumbitHandler = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync(formData);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  if (isLoading) return <Spinner color="primary" />;
  return (
    <div className="max-w-sm">
      <h1 className="text-xl font-bold mb-4">اطلاعات کاربری</h1>
      <form onSubmit={sumbitHandler} className="space-y-5">
        {Object.keys(includeObj(user, includeskey)).map((key) => {
          return (
            <TextField
              label={key}
              name={key}
              key={key}
              value={formData[key] || ""}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            />
          );
        })}

        <div className="pt-2">
          {isUpdating ? (
            "loading"
          ) : (
            <button type="submit" className="btn btn--primary w-full">
              تایید
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
