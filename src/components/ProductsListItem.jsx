import { useContext } from "react";
import { productContext } from "../context/productContext";

function ProductsListItem({
  product,
  setModalType,
  modalType,
  setSelectProduct,
  selectProduct,
}) {
  const { productInfo, setProductInfo } = useContext(productContext);

  const checkHandler = (e) => {
    if (e.target.checked) {
      setSelectProduct([...selectProduct, product._id]);
    } else {
      setSelectProduct(selectProduct.filter((id) => id !== product._id));
    }
  };

  return (
    <tr className="flex text-right pr-15 border-b-1 border-b-blue-300">
      <td className="w-1/6 h-15 pt-5">{product.name}</td>
      <td className="w-1/6 h-15 pt-5">{product.quantity}</td>
      <td className="w-1/6 h-15 pt-5">{product.price}</td>
      <td className="w-2/6 h-15 pt-5">{product._id}</td>
      <td className="w-1-6 h-15 pr-20 pt-5">
        <button
          onClick={() => {
            setModalType({
              ...modalType,
              type: "edit",
            });
            setProductInfo(product);
            console.log(productInfo);
          }}
          className="ml-2"
        >
          <img
            className="cursor-pointer hover:scale-120 transition duration-150 ease-in-out"
            src="/img/edit.png"
            alt="edit"
          />
        </button>
        <button
          onClick={() => {
            setProductInfo(product);
            setModalType({ ...modalType, type: "delete" });
          }}
        >
          <img
            className="cursor-pointer hover:scale-120 transition duration-150 ease-in-out"
            src="/img/trash.png"
            alt="trash"
          />
        </button>
        <input
          type="checkbox"
          className="mr-2 size-5"
          onChange={checkHandler}
          checked={selectProduct.includes(product._id)}
        />
      </td>
    </tr>
  );
}

export default ProductsListItem;
