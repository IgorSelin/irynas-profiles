import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, query, orderBy, limit } from "firebase/firestore";

export async function GET() {
  try {
    const reviewsRef = collection(db, "reviews");
    const q = query(reviewsRef, orderBy("date", "desc"), limit(50));
    const querySnapshot = await getDocs(q);
    
    const reviews = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
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
      approved: false, // Manual approval
    };

    await addDoc(reviewsRef, newReview);

    return NextResponse.json({ success: true, message: "Review submitted successfully" });
  } catch (error) {
    console.error("Error adding review:", error);
    return NextResponse.json(
      { error: "Failed to add review" },
      { status: 500 }
    );
  }
}

