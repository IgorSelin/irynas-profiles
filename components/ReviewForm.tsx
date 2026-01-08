"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

interface ReviewFormData {
  name: string;
  text: string;
  rating: number;
}

export default function ReviewForm({
  onSuccess,
  tourId,
}: {
  onSuccess?: () => void;
  tourId?: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewFormData>();

  const onSubmit = async (data: ReviewFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          ...(tourId && { tourId }),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Дякуємо за ваш відгук! Він опублікований.",
        });
        reset();
        setTimeout(() => {
          if (onSuccess) onSuccess();
        }, 500);
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error,
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Помилка при відправці відгуку. Спробуйте ще раз.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-lg shadow-lg"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Залишити відгук</h3>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Ваше ім'я *
          </label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "Ім'я обов'язкове",
              minLength: {
                value: 2,
                message: "Мінімум 2 символи",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Оцінка *
          </label>
          <select
            id="rating"
            {...register("rating", {
              required: "Оберіть оцінку",
              valueAsNumber: true,
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white"
          >
            <option value="">Оберіть оцінку</option>
            <option value="5">5 - Відмінно</option>
            <option value="4">4 - Добре</option>
            <option value="3">3 - Задовільно</option>
            <option value="2">2 - Погано</option>
            <option value="1">1 - Дуже погано</option>
          </select>
          {errors.rating && (
            <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Ваш відгук *
          </label>
          <textarea
            id="text"
            rows={5}
            {...register("text", {
              required: "Відгук обов'язковий",
              minLength: {
                value: 10,
                message: "Мінімум 10 символів",
              },
              maxLength: {
                value: 1000,
                message: "Максимум 1000 символів",
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 bg-white resize-y"
          />
          {errors.text && (
            <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>
          )}
        </div>

        {submitStatus.type && (
          <div
            className={`p-4 rounded-lg ${
              submitStatus.type === "success"
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Відправка..." : "Відправити відгук"}
        </button>
      </div>
    </motion.form>
  );
}
