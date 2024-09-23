"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import MyCard from "@/components/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [cards, setCards] = useState<React.ReactNode[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getData();
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = search;
    }
  }, [search]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  async function getData() {
    const start = (currentPage - 1) * 25;
    const end = currentPage * 25;
    const data = await getTextData(start, end, debouncedSearch);
    setCards(data);
  }

  async function getTextData(
    start: number,
    end: number,
    startswith?: string
  ): Promise<React.ReactNode[]> {
    const cardList: React.ReactNode[] = [];
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    let data = await res.json();

    if (startswith) {
      data = data.filter((post: any) =>
        post.title.toLowerCase().startsWith(startswith.toLowerCase())
      );
    }

    for (let i = start; i < end && i < data.length; i++) {
      const post = data[i];

      cardList.push(
        <MyCard
          key={post.id}
          {...{
            title: post.title,
            userId: post.userId,
            id: post.id,
            body: post.body,
            saved: false,
          }}
        />
      );
    }

    return cardList;
  }

  function handlePrevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNextPage() {
    setCurrentPage(currentPage + 1);
  }

  function handleSearch() {
    setSearch(inputRef.current?.value || "");
  }

  function displayCards(): React.ReactNode {
    return (
      <>
        {cards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-5">
            {cards}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center pt-10">
            No Text Posts{" "}
            {debouncedSearch ? "found starting with " + debouncedSearch : ""}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <Navbar {...{ text: "Text Posts" }} />
      <div className="flex justify-center items-center gap-2 md:gap-5">
        <Input
          placeholder="Search"
          className="max-w-40 md:max-w-80"
          onChange={handleSearch}
          ref={inputRef}
        />

        <Link
          className={buttonVariants({ variant: "ghost" })}
          href={"/posts/text"}
        >
          Text
        </Link>

        <Link
          className={buttonVariants({ variant: "ghost" })}
          href={"/posts/image"}
        >
          Image
        </Link>

        <Separator orientation="vertical" className="h-6" />
        <Button variant="ghost" onClick={handlePrevPage}>
          Prev
        </Button>
        <Button variant="ghost" onClick={handleNextPage}>
          Next
        </Button>
      </div>
      {displayCards()}
      <Footer />
    </>
  );
}
