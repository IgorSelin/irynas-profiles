import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

export async function GET() {
  try {
    const reviewsRef = collection(db, "reviews");
    const q = query(reviewsRef, orderBy("date", "desc"), limit(50));
    const querySnapshot = await getDocs(q);

    const reviews = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

    console.log(`Fetched ${reviews.length} reviews from Firestore`);

    return NextResponse.json({ reviews });
  } catch (error: any) {
    console.error("Error fetching reviews from Firestore:", error);

    // Спеціальна обробка помилки PERMISSION_DENIED
    if (error?.code === 7 || error?.message?.includes("PERMISSION_DENIED")) {
      return NextResponse.json(
        {
          error:
            "Firestore API не увімкнено. Див. FIREBASE_SETUP_FIX.md для інструкцій.",
          details:
            "PERMISSION_DENIED: Cloud Firestore API has not been used in project before or it is disabled.",
        },
        { status: 503 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to fetch reviews: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch reviews from Firestore" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, text, rating } = body;

    // Validation
    if (!name || !text || !rating) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    if (text.length < 10 || text.length > 1000) {
      return NextResponse.json(
        { error: "Review text must be between 10 and 1000 characters" },
        { status: 400 }
      );
    }

    const reviewsRef = collection(db, "reviews");
    const newReview = {
      name: name.trim(),
      text: text.trim(),
      rating: Number(rating),
      date: new Date().toISOString(),
      approved: true, // Автоматична публікація без модерації
    };

    // Зберігаємо відгук у Firestore
    const docRef = await addDoc(reviewsRef, newReview);

    console.log("Review saved to Firestore with ID:", docRef.id);

    return NextResponse.json({
      success: true,
      message: "Review submitted successfully",
      id: docRef.id,
    });
  } catch (error: any) {
    console.error("Error adding review to Firestore:", error);

    // Спеціальна обробка помилки PERMISSION_DENIED
    if (error?.code === 7 || error?.message?.includes("PERMISSION_DENIED")) {
      return NextResponse.json(
        {
          error:
            "Firestore API не увімкнено. Увімкніть Cloud Firestore API у Google Cloud Console.",
          details:
            "PERMISSION_DENIED: Cloud Firestore API has not been used in project before or it is disabled.",
          helpUrl:
            "https://console.developers.google.com/apis/api/firestore.googleapis.com/overview",
        },
        { status: 503 }
      );
    }

    // Більш детальна обробка помилок
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to add review: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to add review to Firestore" },
      { status: 500 }
    );
  }
}
