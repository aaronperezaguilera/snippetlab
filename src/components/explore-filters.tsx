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
import { TagsInput } from "./tags-input";
import { Badge } from "./ui/badge";

const EXAMPLE_TAGS = [
  "react",
  "typescript",
  "javascript",
  "css",
  "html",
  "nodejs",
  "express",
  "mongodb",
  "graphql",
  "nextjs",
];

export function ExploreFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [languageValue, setLanguageValue] = useState(
    searchParams.get("language") || ""
  );
  const [sortValue, setSortValue] = useState(searchParams.get("sort") || "");
  const [tags, setTags] = useState<string[]>(
    searchParams
      .get("tags")
      ?.split(",")
      .map((t) => t.trim()) || []
  );

  useEffect(() => {
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

  const handleLanguageChange = (value: string) => {
    setLanguageValue(value);
    handleFilter("language", value);
  };

  const handleSortChange = (value: string) => {
    setSortValue(value);
    handleFilter("sort", value);
  };

  const handleTagsChange = (value: string[]) => {
    setTags(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value.length > 0) {
      params.set("tags", value.join(","));
    } else {
      params.delete("tags");
    }

    const query = params.toString();
    // Si query === "", vamos a pathname sin "?"
    const newPath = query ? `${pathname}?${query}` : pathname;
    replace(newPath);
  };

  const handleTagClick = (tag: string) => {
    const updatedTags = tags.includes(tag)
      ? tags.filter((t) => t !== tag)
      : [...tags, tag];

    handleTagsChange(updatedTags);
  };

  return (
    <>
      <Select value={languageValue} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[300px]">
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
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="popular">Most popular</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
        </SelectContent>
      </Select>
      <TagsInput
        value={tags}
        onValueChange={handleTagsChange}
        placeholder="Write or select a tag"
      />
      <div className="flex gap-2 flex-wrap">
        {EXAMPLE_TAGS.map((tag) => {
          const isSelected = tags.includes(tag);
          return (
            <Badge
              variant="secondary"
              key={tag}
              className={`cursor-pointer ${isSelected && "hidden"}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Badge>
          );
        })}
      </div>
    </>
  );
}
