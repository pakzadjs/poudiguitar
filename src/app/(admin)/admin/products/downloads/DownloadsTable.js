"use client";

import { toPersianNumbers } from "@/utils/toPersianNumbers";
import { toLocalDateStringShort } from "@/utils/toLocalDate";
import RemoveProduct from "../courses/RemoveProduct";
import UploadImage from "../courses/UploadImage";
import ReviewDownload from "./ReviewDownload";
import UpdateDownload from "./UpdateDownload";
import UploadFile from "./UploadFile";

export default function CoursesTable({ download, index, categories }) {
  const { title, category, tags, createdAt } = download || {};

  return (
    <tr>
      {/* Index */}
      <td className="table__td">{toPersianNumbers(index + 1)}</td>

      {/* Title*/}
      <td className="table__td">{title}</td>

      {/* Category */}
      <td className="table__td">
        {category ? category?.title : <span className="text-lg">-</span>}
      </td>

      {/* Tag */}
      <td className="table__td">{toPersianNumbers(tags[1])}</td>

      {/* Created at */}
      <td className="table__td">{toLocalDateStringShort(createdAt)}</td>

      {/* Options */}
      <td className="table__td">
        <div className="flex items-center gap-4">
          <ReviewDownload download={download} />
          <UpdateDownload categories={categories} download={download} />
          <UploadImage product={download} />
          <UploadFile product={download} />
          <RemoveProduct product={download} />
        </div>
      </td>
    </tr>
  );
}
