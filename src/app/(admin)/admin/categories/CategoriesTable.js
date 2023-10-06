"use client";

import { toLocalDateStringShort } from "@/utils/toLocalDate";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import RemoveCategory from "./RemoveCategory";
import UpdateCategory from "./UpdateCategory";

export default function CategoriesTable({ category, index }) {
  const { title, description, englishTitle, createdAt, type, _id } = category || {};

  return (
    <tr>
      {/* Index */}
      <td className="table__td">{toPersianNumbers(index + 1)}</td>

      {/* title */}
      <td className="table__td">{title}</td>

      {/* slug */}
      <td className="table__td">{englishTitle}</td>

      {/* description */}
      <td className="table__td">{description}</td>

      {/* type */}
      <td className="table__td">{type}</td>

      {/* Date */}
      <td className="table__td">{toLocalDateStringShort(createdAt)}</td>

      {/* Settings */}
      <td className="table__td">
        <div className="flex gap-3">
          <RemoveCategory id={_id} />
          <UpdateCategory id={_id} category={category} />
        </div>
      </td>
    </tr>
  );
}
