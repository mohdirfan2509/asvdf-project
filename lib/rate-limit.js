/**
 * Minimal in-memory sliding-window limiter. Per server instance only (resets on restart and is not
 * shared between serverless instances), which is enough to blunt repeated form submissions.
 */
const buckets = new Map();

export function rateLimit(key, { limit, windowMs }) {
  const now = Date.now();
  const recent = (buckets.get(key) || []).filter((time) => now - time < windowMs);
  if (recent.length >= limit) {
    buckets.set(key, recent);
    return { allowed: false, retryAfterSeconds: Math.ceil((windowMs - (now - recent[0])) / 1000) };
  }
  recent.push(now);
  buckets.set(key, recent);
  if (buckets.size > 5000) {
    for (const [bucketKey, times] of buckets) {
      if (!times.some((time) => now - time < windowMs)) buckets.delete(bucketKey);
    }
  }
  return { allowed: true };
}

export function clientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  return (forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown').trim();
}
