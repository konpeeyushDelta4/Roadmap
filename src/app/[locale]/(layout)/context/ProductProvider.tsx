"use client";
import { createContext, useContext } from "react";
import { ProductDetailD } from "../../../../types/product";

type ProductContextType = {
  productDetail: ProductDetailD;
};

const ProductContext = createContext<ProductContextType>({
  productDetail: {} as ProductDetailD,
});

export default function ProductProvider({
  productDetail,
  children,
}: {
  productDetail: ProductDetailD;
  children: React.ReactNode;
}) {
  return (
    <ProductContext.Provider
      value={{
        productDetail,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProductDetail = () => useContext(ProductContext);
