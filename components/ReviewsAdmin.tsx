'use client';

import { useEffect, useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { GoogleAuthProvider, User, getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import ReviewCard from './ReviewCard';
import { app, db } from '@/lib/firebase';
import { REPLIES_COLLECTION, fetchReviewData, withReplies } from '@/lib/reviews';
import { staticReviews } from '@/lib/staticReviews';
import { Review, ReviewReply } from '@/lib/types';

const MAX_REPLY_LENGTH = 2000;

function errorMessage(error: unknown) {
  // Firestore rules only let Iryna's Google account write replies
  if (error instanceof FirebaseError && error.code === 'permission-denied') {
    return 'Цей акаунт не має права відповідати на відгуки. Увійдіть акаунтом Ірини.';
  }
  return 'Не вдалося зберегти. Перевірте інтернет і спробуйте ще раз.';
}

export default function ReviewsAdmin({ tourTitles }: { tourTitles: Record<string, string> }) {
  // undefined: still checking whether someone is signed in
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [signInError, setSignInError] = useState('');
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [loadError, setLoadError] = useState('');
  const [onlyUnanswered, setOnlyUnanswered] = useState(false);

  useEffect(() => onAuthStateChanged(getAuth(app), setUser), []);

  useEffect(() => {
    if (!user) return;
    fetchReviewData()
      .then(({ reviews, replies }) =>
        setReviews(
          withReplies([...reviews, ...staticReviews], replies).sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          ),
        ),
      )
      .catch((error) => {
        console.error('Error loading reviews:', error);
        setLoadError('Не вдалося завантажити відгуки. Оновіть сторінку.');
      });
  }, [user]);

  const signIn = async () => {
    setSignInError('');
    try {
      await signInWithPopup(getAuth(app), new GoogleAuthProvider());
    } catch (error) {
      if (error instanceof FirebaseError && error.code === 'auth/popup-closed-by-user') return;
      console.error('Sign-in error:', error);
      setSignInError('Не вдалося увійти. Спробуйте ще раз.');
    }
  };

  const updateReply = (id: string, reply: ReviewReply | undefined) =>
    setReviews((current) => current?.map((review) => (review.id === id ? { ...review, reply } : review)) ?? null);

  if (user === undefined) {
    return <AdminLayout>Завантаження...</AdminLayout>;
  }

  if (!user) {
    return (
      <AdminLayout>
        <p className="mb-6 text-gray-700">Увійдіть, щоб відповідати на відгуки на сайті.</p>
        <button
          onClick={signIn}
          className="rounded-full bg-purple-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
        >
          Увійти через Google
        </button>
        {signInError && <p className="mt-4 text-red-600">{signInError}</p>}
      </AdminLayout>
    );
  }

  const unansweredCount = reviews?.filter((review) => !review.reply).length ?? 0;
  const shownReviews = onlyUnanswered ? reviews?.filter((review) => !review.reply) : reviews;

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-gray-700">
          Ви увійшли як <span className="font-semibold">{user.email}</span>
        </p>
        <button onClick={() => signOut(getAuth(app))} className="font-semibold text-purple-600 hover:text-purple-700">
          Вийти
        </button>
      </div>

      {loadError && <p className="text-red-600">{loadError}</p>}
      {!reviews && !loadError && <p className="text-gray-600">Завантаження відгуків...</p>}

      {reviews && (
        <>
          <label className="mb-6 flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              checked={onlyUnanswered}
              onChange={(event) => setOnlyUnanswered(event.target.checked)}
              className="h-4 w-4 accent-purple-600"
            />
            Лише без відповіді ({unansweredCount} з {reviews.length})
          </label>

          <div className="space-y-8">
            {shownReviews?.map((review, index) => (
              <div key={review.id}>
                <p className="mb-2 text-sm font-medium text-purple-700">
                  {review.tourId ? tourTitles[review.tourId] || 'Екскурсія' : 'Загальний відгук'}
                </p>
                <ReviewCard review={review} index={index} />
                <ReplyEditor review={review} onChange={(reply) => updateReply(review.id!, reply)} />
              </div>
            ))}
          </div>
        </>
      )}
    </AdminLayout>
  );
}

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Відповіді на відгуки</h1>
        {children}
      </div>
    </main>
  );
}

function ReplyEditor({ review, onChange }: { review: Review; onChange: (reply: ReviewReply | undefined) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const replyRef = doc(db, REPLIES_COLLECTION, review.id!);

  const run = async (action: () => Promise<void>) => {
    setIsSaving(true);
    setError('');
    try {
      await action();
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving reply:', error);
      setError(errorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  const save = () =>
    run(async () => {
      const reply = { text: draft.trim(), date: new Date().toISOString() };
      await setDoc(replyRef, reply);
      onChange(reply);
    });

  const remove = () => {
    if (!confirm('Видалити відповідь із сайту?')) return;
    run(async () => {
      await deleteDoc(replyRef);
      onChange(undefined);
    });
  };

  if (!isEditing) {
    return (
      <div className="mt-3 flex gap-6">
        <button
          onClick={() => {
            setDraft(review.reply?.text ?? '');
            setIsEditing(true);
          }}
          className="font-semibold text-purple-600 hover:text-purple-700"
        >
          {review.reply ? 'Редагувати відповідь' : 'Відповісти'}
        </button>
        {review.reply && (
          <button onClick={remove} disabled={isSaving} className="font-semibold text-red-600 hover:text-red-700">
            Видалити відповідь
          </button>
        )}
        {error && <p className="text-red-600">{error}</p>}
      </div>
    );
  }

  return (
    <div className="mt-3 rounded-lg bg-white p-4 shadow-md">
      <textarea
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        rows={4}
        maxLength={MAX_REPLY_LENGTH}
        placeholder={`Відповідь для ${review.name}...`}
        className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-purple-500"
      />
      {error && <p className="mt-2 text-red-600">{error}</p>}
      <div className="mt-3 flex gap-4">
        <button
          onClick={save}
          disabled={isSaving || !draft.trim()}
          className="rounded-lg bg-purple-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? 'Збереження...' : 'Опублікувати'}
        </button>
        <button onClick={() => setIsEditing(false)} disabled={isSaving} className="font-semibold text-gray-600">
          Скасувати
        </button>
      </div>
    </div>
  );
}
