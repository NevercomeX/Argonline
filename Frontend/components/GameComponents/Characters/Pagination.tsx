const Pagination = ({
  page,
  totalPages,
  setPage,
}: {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}) => (
  <div className="flex justify-center space-x-2 mt-6">
    <button
      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      onClick={() => setPage(page - 1)}
      disabled={page === 1}
    >
      Previous
    </button>
    <span className="px-4 py-2">
      Page {page} of {totalPages}
    </span>
    <button
      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      onClick={() => setPage(page + 1)}
      disabled={page === totalPages}
    >
      Next
    </button>
  </div>
);

export default Pagination;
