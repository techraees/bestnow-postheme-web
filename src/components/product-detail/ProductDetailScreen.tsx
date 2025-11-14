"use client";

import React, { useState } from "react";
import ProductImageCarousel from "./ProductImageCarousel";
import ProductInfoSection from "./ProductInfoSection";
import ProductActionsBar from "./ProductActionsBar";

export interface ProductDetail {
  id: string;
  name: string;
  images: string[];
  price: number;
  rating?: number;
  reviewCount?: number;
  soldCount?: number;
  warranty?: string;
  description?: string;
  isFavorite?: boolean;
}

interface ProductDetailScreenProps {
  product: ProductDetail;
  onFavoriteClick?: (id: string) => void;
  onAddToCart?: (id: string, quantity: number) => void;
  onDescriptionClick?: () => void;
  onReviewsClick?: () => void;
  onBack?: () => void;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  onFavoriteClick,
  onAddToCart,
  onDescriptionClick,
  onReviewsClick,
  onBack,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    onFavoriteClick?.(product.id);
  };

  const handleQuantityIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleQuantityDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await onAddToCart?.(product.id, quantity);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-white w-full flex flex-col pb-20 md:pb-24">
      {/* Product Image Carousel */}
      <ProductImageCarousel
        images={product.images}
        productName={product.name}
        isFavorite={isFavorite}
        onFavoriteClick={handleFavoriteClick}
        onBack={onBack}
      />

      {/* Product Info Section */}
      <ProductInfoSection
        price={product.price}
        name={product.name}
        rating={product.rating}
        reviewCount={product.reviewCount}
        soldCount={product.soldCount}
        warranty={product.warranty}
        quantity={quantity}
        onQuantityIncrease={handleQuantityIncrease}
        onQuantityDecrease={handleQuantityDecrease}
        onDescriptionClick={onDescriptionClick}
        onReviewsClick={onReviewsClick}
      />

      {/* Fixed Bottom Actions Bar */}
      <ProductActionsBar
        totalPrice={product.price * quantity}
        onAddToCart={handleAddToCart}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProductDetailScreen;

