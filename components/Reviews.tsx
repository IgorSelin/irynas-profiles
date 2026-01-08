"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import { Review } from "@/lib/types";

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/reviews", {
        cache: "no-store",
      });
      const data = await response.json();
      console.log("Fetched reviews:", data.reviews?.length || 0);
      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Відгуки
          </h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Що кажуть наші гості про екскурсії
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {isLoading ? (
              <div className="col-span-2 text-center py-12">
                <p className="text-gray-600">Завантаження відгуків...</p>
              </div>
            ) : reviews.length > 0 ? (
              reviews.map((review, index) => (
                <ReviewCard
                  key={review.id || index}
                  review={review}
                  index={index}
                />
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-gray-600">
                  Поки що немає відгуків. Будьте першим!
                </p>
              </div>
            )}
          </div>

          <ReviewForm onSuccess={fetchReviews} />
        </div>
      </div>
    </section>
  );
}
