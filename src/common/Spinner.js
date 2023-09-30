"use client";

import { Spinner } from "@nextui-org/react";

export default function SpinnerComponent({ size }) {
  return (
    <Spinner
      color="primary"
      size={size ? size : "lg"}
      className="flex items-center justify-center"
    />
  );
}
