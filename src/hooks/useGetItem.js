"use client";

import { useEffect, useState } from "react";

export default function useGetItem({ itemName }) {
  const [item, setItem] = useState('');

  useEffect(() => {
    setItem(localStorage.getItem(itemName));
  }, []);

  return item;
}
