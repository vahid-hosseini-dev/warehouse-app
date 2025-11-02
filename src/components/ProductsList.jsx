import api from "../services/config";
import { useQuery } from "@tanstack/react-query";
import ProductsListItem from "./ProductsListItem";
import { useSearch } from "../hooks/useSearch";
import Pagination from "./Pagination";
import { useState } from "react";

function ProductsList({
  modalType,
  setModalType,
  setSelectProduct,
  selectProduct,
}) {
  const [page, setPage] = useState(1);
  const { search } = useSearch();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page],
    queryFn: () =>
      api.get(`/products?page=${page}&limit=10`).then((res) => res.data),
  });

  if (isLoading) return <p>در حال بارگزاری .... </p>;
  if (isError) return <p> هیچ محصولی یافت نشد </p>;

  const filteredProducts = data?.data.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <table className=" flex flex-col w-[1140px] h-[737px] border-[rgba(228,228,228,1)] mt-5 border rounded-t-4xl border-separate overflow-hidden">
        <thead className="h-[70px] bg-[rgba(242,242,242,1)]">
          <tr className="flex items-center text-right pr-15 pt-5">
            <th className="w-1/6">نام کالا</th>
            <th className="w-1/6">موجودی</th>
            <th className="w-1/6">قیمت</th>
            <th className="w-3/6">شناسه کالا</th>
          </tr>
        </thead>
        <tbody className="flex flex-col items-right py-5">
          {filteredProducts?.map((product) => (
            <ProductsListItem
              key={product._id}
              setModalType={setModalType}
              product={product}
              modalType={modalType}
              setSelectProduct={setSelectProduct}
              selectProduct={selectProduct}
            />
          ))}
        </tbody>
      </table>
      <Pagination page={page} setPage={setPage} totalPages={data.totalPages} />
    </>
  );
}

export default ProductsList;
