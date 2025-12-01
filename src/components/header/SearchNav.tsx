import { useGetDropdownSearchResultsQuery } from "@/redux/api/core/searchApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import SearchDropdown from "../search/SearchDropdown";
import { SearchIcon } from "lucide-react";

const SearchInput = ({
  initialValue = "",
  onSearchChange,
  onSearchSubmit,
  onFilterClick,
  placeholder = "Search products...",
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearchChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) {
      e.preventDefault();
      onSearchSubmit?.(value.trim());
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      onSearchSubmit?.(value.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-light_mode_text dark:text-dark_mode_text opacity-60">
        <SearchIcon className="h-5 w-5 text-light_mode_yellow_color dark:text-dark_mode_yellow_color md:h-6 md:w-6" />
      </div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full bg-light_mode_color2 dark:bg-dark_mode_color2 text-light_mode_text dark:text-dark_mode_text placeholder:text-light_mode_gray_color dark:placeholder:text-light_mode_gray_color border border-light_mode_yellow_color dark:border-dark_mode_yellow_color rounded-full pl-12 pr-12 py-3.5 md:py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-light_mode_yellow_color dark:focus:ring-dark_mode_yellow_color focus:border-transparent"
      />
      {onFilterClick && (
        <button
          type="button"
          onClick={onFilterClick}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-light_mode_text dark:text-dark_mode_text hover:opacity-80 active:opacity-60 transition-opacity p-1.5 rounded-lg hover:bg-light_mode_color3 dark:hover:bg-dark_mode_color3"
          aria-label="Filter"
        >
          <FilterIcon className="h-5 w-5 text-light_mode_blue_color dark:text-dark_mode_blue_color md:h-6 md:w-6" />
        </button>
      )}
    </form>
  );
};

const SearchNav = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Call dropdown API when user types (debounced)
  const { data: dropdownData, isLoading: isDropdownLoading } =
    useGetDropdownSearchResultsQuery(
      { q: searchQuery, limit: 5 },
      {
        skip: !searchQuery.trim() || searchQuery.trim().length < 2,
      }
    );

  // Extract products from dropdown response
  const dropdownProducts = useMemo(() => {
    if (!dropdownData?.payload) return [];
    if (Array.isArray(dropdownData.payload)) {
      return dropdownData.payload;
    }
    return dropdownData.payload.results || [];
  }, [dropdownData]);

  // Show dropdown when products are available
  useEffect(() => {
    if (dropdownProducts.length > 0 && searchQuery.trim().length >= 2) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [dropdownProducts, searchQuery]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length < 2) {
      setShowDropdown(false);
    }
  };

  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      setShowDropdown(false);
      router.push(`/search-list?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div>
      <div className="relative min-w-[370px] lg:block hidden">
        <SearchInput
          initialValue={searchQuery}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
          placeholder="Search"
        />
        <SearchDropdown
          products={dropdownProducts}
          isOpen={showDropdown && !isDropdownLoading}
          onClose={() => setShowDropdown(false)}
        />
      </div>
    </div>
  );
};

export default SearchNav;
