"use client";

import { useState } from "react";
import { TbCircleCheckFilled, TbCopy } from "react-icons/tb";

export default function CopyToClipboard({ copyText, title, style }) {
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const handleCopyClick = () => {
    copyTextToClipboard(copyText)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  return (
    <div>
      <button onClick={handleCopyClick} className={`btn ${style && style}`}>
        {isCopied ? (
          <div className="flex items-center gap-2">
            <TbCircleCheckFilled size={20} />
            <span>کپی شد</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <TbCopy size={20} />
            {title ? <span>{title}</span> : <span>کپی</span>}
          </div>
        )}
      </button>
    </div>
  );
}
