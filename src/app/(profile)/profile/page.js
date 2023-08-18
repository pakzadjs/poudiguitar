"use client";

import Link from "next/link";
import { Spinner } from "@nextui-org/react";

import { useGetUser } from "@/hooks/useAuth";
import { toLocalDateString } from "@/utils/toLocalDate";
import Image from "next/image";

export default function Profile() {
  const { data, isLoading } = useGetUser();
  const { user, payments } = data || {};

  if (isLoading) return <Spinner color="primary" />;
  return (
    <div>
      <div className="z-30">
        <h1 className="mb-4 text-xl">
          سلام! <span className="font-bold">{user.name}</span> خوش آمدی!
        </h1>
        <p>
          <span>تاریخ پیوستن:</span>
          <span> {toLocalDateString(user.createdAt)} </span>
        </p>
      </div>
    </div>
  );
}
