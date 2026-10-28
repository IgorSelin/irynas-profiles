'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ReviewFormData {
  name: string;
  text: string;
  rating: number;
}

export default function ReviewForm({ onSuccess, tourId }: { onSuccess?: () => void; tourId?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewFormData>();

  const onSubmit = async (data: ReviewFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          ...(tourId && { tourId }),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Дякуємо за ваш відгук! Він опублікований.',
        });
        reset();
        setTimeout(() => {
          if (onSuccess) onSuccess();
        }, 500);
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error,
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Помилка при відправці відгуку. Спробуйте ще раз.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-[28px] bg-white p-6 sm:p-10">
      <h3 className="mb-8 font-display text-2xl font-medium tracking-tight text-night">Залишити відгук</h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink/80">
            Ваше ім'я *
          </label>
          <input
            type="text"
            id="name"
            {...register('name', {
              required: "Ім'я обов'язкове",
              minLength: {
                value: 2,
                message: 'Мінімум 2 символи',
              },
            })}
            className="w-full rounded-2xl border border-ink/15 bg-white px-4 py-3 text-ink transition-colors focus:border-azure-500 focus:outline-none focus:ring-4 focus:ring-azure-500/15"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="rating" className="mb-2 block text-sm font-medium text-ink/80">
            Оцінка *
          </label>
          <select
            id="rating"
            {...register('rating', {
              required: 'Оберіть оцінку',
              valueAsNumber: true,
            })}
            className="w-full rounded-2xl border border-ink/15 bg-white px-4 py-3 text-ink transition-colors focus:border-azure-500 focus:outline-none focus:ring-4 focus:ring-azure-500/15"
          >
            <option value="">Оберіть оцінку</option>
            <option value="5">5 - Відмінно</option>
            <option value="4">4 - Добре</option>
            <option value="3">3 - Задовільно</option>
            <option value="2">2 - Погано</option>
            <option value="1">1 - Дуже погано</option>
          </select>
          {errors.rating && <p className="mt-1 text-sm text-red-500">{errors.rating.message}</p>}
        </div>

        <div>
          <label htmlFor="text" className="mb-2 block text-sm font-medium text-ink/80">
            Ваш відгук *
          </label>
          <textarea
            id="text"
            rows={5}
            {...register('text', {
              required: "Відгук обов'язковий",
              minLength: {
                value: 10,
                message: 'Мінімум 10 символів',
              },
              maxLength: {
                value: 1000,
                message: 'Максимум 1000 символів',
              },
            })}
            className="w-full resize-y rounded-2xl border border-ink/15 bg-white px-4 py-3 text-ink transition-colors focus:border-azure-500 focus:outline-none focus:ring-4 focus:ring-azure-500/15"
          />
          {errors.text && <p className="mt-1 text-sm text-red-500">{errors.text.message}</p>}
        </div>

        {submitStatus.type && (
          <div
            className={`rounded-2xl p-4 ${
              submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-night py-4 font-semibold text-white transition-colors hover:bg-azure-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Відправка...' : 'Відправити відгук'}
        </button>
      </div>
    </form>
  );
}
