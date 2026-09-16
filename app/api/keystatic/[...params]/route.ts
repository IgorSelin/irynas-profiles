import { makeRouteHandler } from '@keystatic/next/route-handler';
import config, { isKeystaticEnabled } from '@/keystatic.config';

const handler = makeRouteHandler({ config });
const notFound = () => new Response('Not Found', { status: 404 });

export const GET = isKeystaticEnabled ? handler.GET : notFound;
export const POST = isKeystaticEnabled ? handler.POST : notFound;
