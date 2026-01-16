import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, query, limit } from 'firebase/firestore';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tourId = searchParams.get('tourId');

    const reviewsRef = collection(db, 'reviews');
    let reviews;

    try {
      const q = query(reviewsRef, limit(200));
      const querySnapshot = await getDocs(q);

      reviews = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((review: any) => {
          if (review.approved !== undefined && review.approved !== true) return false;

          if (tourId) {
            return review.tourId === tourId;
          } else {
            return !review.tourId || review.tourId === undefined;
          }
        })
        .sort((a: any, b: any) => {
          const dateA = new Date(a.date || 0).getTime();
          const dateB = new Date(b.date || 0).getTime();
          return dateB - dateA;
        })
        .slice(0, 50);
    } catch (error: any) {
      console.error('Error fetching reviews:', error);
      throw error;
    }

    return NextResponse.json({ reviews });
  } catch (error: any) {
    console.error('Error fetching reviews from Firestore:', error);

    if (error?.code === 7 || error?.message?.includes('PERMISSION_DENIED')) {
      return NextResponse.json(
        {
          error: 'Firestore API не увімкнено. Див. FIREBASE_SETUP_FIX.md для інструкцій.',
          details: 'PERMISSION_DENIED: Cloud Firestore API has not been used in project before or it is disabled.',
        },
        { status: 503 },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: `Failed to fetch reviews: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ error: 'Failed to fetch reviews from Firestore' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, text, rating, tourId } = body;

    // Validation
    if (!name || !text || !rating) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }

    if (text.length < 10 || text.length > 1000) {
      return NextResponse.json({ error: 'Review text must be between 10 and 1000 characters' }, { status: 400 });
    }

    const reviewsRef = collection(db, 'reviews');
    const newReview = {
      name: name.trim(),
      text: text.trim(),
      rating: Number(rating),
      date: new Date().toISOString(),
      approved: true,
      ...(tourId && { tourId: tourId.trim() }),
    };

    const docRef = await addDoc(reviewsRef, newReview);

    return NextResponse.json({
      success: true,
      message: 'Review submitted successfully',
      id: docRef.id,
    });
  } catch (error: any) {
    console.error('Error adding review to Firestore:', error);

    if (error?.code === 7 || error?.message?.includes('PERMISSION_DENIED')) {
      return NextResponse.json(
        {
          error: 'Firestore API не увімкнено. Увімкніть Cloud Firestore API у Google Cloud Console.',
          details: 'PERMISSION_DENIED: Cloud Firestore API has not been used in project before or it is disabled.',
          helpUrl: 'https://console.developers.google.com/apis/api/firestore.googleapis.com/overview',
        },
        { status: 503 },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: `Failed to add review: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ error: 'Failed to add review to Firestore' }, { status: 500 });
  }
}
