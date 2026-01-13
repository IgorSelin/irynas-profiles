import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 24,
        background: 'linear-gradient(135deg, #9333ea 0%, #4f46e5 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
      }}
    >
      Л
    </div>,
    {
      width: 32,
      height: 32,
    },
  );
}
