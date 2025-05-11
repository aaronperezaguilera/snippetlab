"use client";

import { Language, LANGUAGE_ICON } from "@/config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SnippetsFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Get initial values from URL params
  const [typeValue, setTypeValue] = useState(searchParams.get("type") || "");
  const [languageValue, setLanguageValue] = useState(
    searchParams.get("language") || ""
  );
  const [sortValue, setSortValue] = useState(searchParams.get("sort") || "");

  // Update local state when URL params change
  useEffect(() => {
    setTypeValue(searchParams.get("type") || "");
    setLanguageValue(searchParams.get("language") || "");
    setSortValue(searchParams.get("sort") || "");
  }, [searchParams]);

  const handleFilter = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(type, value);
    } else {
      params.delete(type);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleTypeChange = (value: string) => {
    setTypeValue(value);
    handleFilter("type", value);
  };

  const handleLanguageChange = (value: string) => {
    setLanguageValue(value);
    handleFilter("language", value);
  };

  const handleSortChange = (value: string) => {
    setSortValue(value);
    handleFilter("sort", value);
  };

  return (
    <>
      <Select value={typeValue} onValueChange={handleTypeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All types</SelectItem>
          <SelectItem value="public">Public</SelectItem>
          <SelectItem value="private">Private</SelectItem>
        </SelectContent>
      </Select>
      <Select value={languageValue} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All languages</SelectItem>
          {Object.values(Language).map((lang) => (
            <SelectItem key={lang} value={lang}>
              {LANGUAGE_ICON[lang]}
              {lang.slice(0, 1).toUpperCase() + lang.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={sortValue} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="popular">Most popular</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
