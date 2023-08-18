"use client";

import Link from "next/link";
import { Spinner } from "@nextui-org/react";

import { useGetUser } from "@/hooks/useAuth";
import { toLocalDateString } from "@/utils/toLocalDate";
import Image from "next/image";

export default function Profile() {
  const { data, isLoading } = useGetUser();
  const { user, payments } = data || {};

  if (isLoading)
    return <Spinner color="primary" size="lg" className="flex items-center justify-center" />;
  return (
    <main className="xl:max-w-screen-xl m-auto">
      <div className="z-30 bg-blue-950/50 p-10 rounded-3xl">
        <div className="mb-2">
          <h2 className="font-bold text-xl mb-1">{user?.name}</h2>
          <h3 className="font-extralight text-gray-400">{user?.biography}</h3>
        </div>
        <p>
          <span className="text-gray-300">تاریخ پیوستن:</span>
          <span> {toLocalDateString(user.createdAt)} </span>
        </p>
      </div>
    </main>
  );
}
