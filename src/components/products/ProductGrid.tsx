"use client";

import React from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  title: string;
  image: any;
  rating?: number;
  soldCount?: number;
  price: number;
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
    <div className="w-full px-4 mb-6">
      <div className="grid grid-cols-2 gap-4 md:gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.image}
            rating={product.rating}
            soldCount={product.soldCount}
            price={product.price}
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
