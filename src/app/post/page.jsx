import BlogCard from "@/components/BlogCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div>
      <section class="bg-white dark:bg-gray-900">
        <div class="container px-6 py-10 mx-auto">
          <div class="text-center">
            <h1 class="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
              Blog Posts
            </h1>

            <p class="max-w-lg mx-auto mt-4 text-gray-500">
              Salami mustard spice tea fridge authentic Chinese food dish salt
              tasty liquor. Sweet savory foodtruck pie.
            </p>
          </div>
          <BlogCard />
        </div>
      </section>
    </div>
  );
}
