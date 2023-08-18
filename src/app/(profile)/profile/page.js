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
    <main className="rounded-tr-3xl xl:max-w-screen-xl">
      <div className="z-30">
        <p>
          <span>تاریخ پیوستن:</span>
          <span> {toLocalDateString(user.createdAt)} </span>
        </p>
      </div>
    </main>
  );
}
