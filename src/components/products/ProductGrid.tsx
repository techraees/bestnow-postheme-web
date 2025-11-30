"use client";

import React from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  title: string;
  image: any;
  rating?: number;
  soldCount?: string;
  price: number;
  min_qty?: number;
  isFavorite?: boolean;
}

interface ProductGridProps {
  products?: Product[];
  onFavoriteClick?: (id: string) => void;
  onAddToCart?: (id: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products = [],
  onFavoriteClick,
  onAddToCart,
}) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5 xl:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.image}
            rating={product.rating}
            soldCount={product.soldCount}
            price={product.price}
            min_qty={product.min_qty}
            isFavorite={product.isFavorite}
            onFavoriteClick={onFavoriteClick}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
