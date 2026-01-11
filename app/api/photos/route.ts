import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const PLACE_ID = 'ChIJ-9i5C6ZA100RrKpK7u8eM-k'; // Placeholder Place ID for "Екскурсії Львовом з Іриною Красіцькою"
// Note: The Place ID can be found using the Google Maps Place ID Finder

export async function GET(request: NextRequest) {
  if (!GOOGLE_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const photoReference = searchParams.get('reference');

  // If a reference is provided, proxy the image
  if (photoReference) {
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photoreference=${photoReference}&key=${GOOGLE_API_KEY}`;
    const response = await fetch(photoUrl);
    const blob = await response.blob();
    return new NextResponse(blob, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  }

  // Otherwise, fetch place details to get photo references
  try {
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=photos&key=${GOOGLE_API_KEY}&language=uk`;
    const response = await fetch(detailsUrl);
    const data = await response.json();

    if (data.status !== 'OK') {
      return NextResponse.json({ error: data.status, message: data.error_message }, { status: 400 });
    }

    const photos = data.result.photos || [];
    const formattedPhotos = photos.map((p: any, index: number) => ({
      id: `google-${index}`,
      src: `/api/photos?reference=${p.photo_reference}`,
      alt: 'Фото з Google Maps',
      category: 'Google Maps',
    }));

    return NextResponse.json({ photos: formattedPhotos });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch photos' }, { status: 500 });
  }
}
