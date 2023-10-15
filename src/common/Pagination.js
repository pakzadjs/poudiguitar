import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function PaginationComponent({ pagination, pathname }) {
  const router = useRouter();

  const limit = pagination?.limit;
  const total = pagination?.total;

  const totalPages = Math.ceil(total / limit);

  const pageHandler = (page) => {
    router.push(`${pathname}?page=${page}`);
  };

  return (
    <div className="m-auto flex justify-center p-3">
      {totalPages > 1 && (
        <div>
          <Pagination
            total={totalPages}
            initialPage={1}
            page={pagination?.page}
            onChange={pageHandler}
            showShadow
            showControls
          />
        </div>
      )}
    </div>
  );
}
