// Google Public APIs Service — Maps, Places, Translate, YouTube
// Uses Google API Key (not OAuth) for public API access
// All functions are Cloudflare Workers compatible (pure fetch)

// === Google Places API (New) ===

export interface PlaceResult {
  name: string;
  address: string;
  rating?: number;
  userRatingsTotal?: number;
  priceLevel?: number;
  openNow?: boolean;
  types?: string[];
  placeId: string;
  location?: { lat: number; lng: number };
}

export async function searchPlaces(
  apiKey: string,
  query: string,
  options: { location?: string; radius?: number; type?: string } = {}
): Promise<{ results: PlaceResult[]; error?: string }> {
  const params = new URLSearchParams({
    query,
    key: apiKey,
  });

  // Optional: bias results near a location (lat,lng)
  if (options.location) params.set('location', options.location);
  if (options.radius) params.set('radius', String(options.radius));
  if (options.type) params.set('type', options.type);

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?${params}`
  );

  if (!res.ok) {
    return { results: [], error: `Places API error: ${res.status}` };
  }

  const data = await res.json() as any;

  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    return { results: [], error: `Places API: ${data.status} — ${data.error_message || ''}` };
  }

  const results: PlaceResult[] = (data.results || []).slice(0, 8).map((p: any) => ({
    name: p.name,
    address: p.formatted_address,
    rating: p.rating,
    userRatingsTotal: p.user_ratings_total,
    priceLevel: p.price_level,
    openNow: p.opening_hours?.open_now,
    types: p.types?.slice(0, 5),
    placeId: p.place_id,
    location: p.geometry?.location,
  }));

  return { results };
}

// === Place Details ===

export interface PlaceDetails {
  name: string;
  address: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviews?: { author: string; rating: number; text: string; time: string }[];
  openingHours?: string[];
  location?: { lat: number; lng: number };
}

export async function getPlaceDetails(
  apiKey: string,
  placeId: string
): Promise<{ details?: PlaceDetails; error?: string }> {
  const params = new URLSearchParams({
    place_id: placeId,
    key: apiKey,
    fields: 'name,formatted_address,formatted_phone_number,website,rating,reviews,opening_hours,geometry',
  });

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?${params}`
  );

  if (!res.ok) {
    return { error: `Place Details API error: ${res.status}` };
  }

  const data = await res.json() as any;

  if (data.status !== 'OK') {
    return { error: `Place Details: ${data.status} — ${data.error_message || ''}` };
  }

  const p = data.result;
  return {
    details: {
      name: p.name,
      address: p.formatted_address,
      phone: p.formatted_phone_number,
      website: p.website,
      rating: p.rating,
      reviews: p.reviews?.slice(0, 3).map((r: any) => ({
        author: r.author_name,
        rating: r.rating,
        text: r.text?.substring(0, 200),
        time: r.relative_time_description,
      })),
      openingHours: p.opening_hours?.weekday_text,
      location: p.geometry?.location,
    },
  };
}

// === Google Directions API ===

export interface DirectionsResult {
  summary: string;
  distance: string;
  duration: string;
  durationInTraffic?: string;
  steps: { instruction: string; distance: string; duration: string }[];
  startAddress: string;
  endAddress: string;
}

export async function getDirections(
  apiKey: string,
  origin: string,
  destination: string,
  options: { mode?: 'driving' | 'walking' | 'transit' | 'bicycling'; departureTime?: string } = {}
): Promise<{ route?: DirectionsResult; error?: string }> {
  const params = new URLSearchParams({
    origin,
    destination,
    key: apiKey,
    mode: options.mode || 'driving',
  });

  // departure_time=now gives traffic-aware estimates
  if (options.mode === 'driving' || !options.mode) {
    params.set('departure_time', 'now');
  }

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/directions/json?${params}`
  );

  if (!res.ok) {
    return { error: `Directions API error: ${res.status}` };
  }

  const data = await res.json() as any;

  if (data.status !== 'OK') {
    return { error: `Directions: ${data.status} — ${data.error_message || ''}` };
  }

  const route = data.routes[0];
  const leg = route.legs[0];

  return {
    route: {
      summary: route.summary,
      distance: leg.distance.text,
      duration: leg.duration.text,
      durationInTraffic: leg.duration_in_traffic?.text,
      steps: leg.steps.slice(0, 10).map((s: any) => ({
        instruction: s.html_instructions?.replace(/<[^>]*>/g, '') || '',
        distance: s.distance?.text || '',
        duration: s.duration?.text || '',
      })),
      startAddress: leg.start_address,
      endAddress: leg.end_address,
    },
  };
}

// === Google Translate API ===

export async function translateText(
  apiKey: string,
  text: string,
  targetLang: string,
  sourceLang?: string
): Promise<{ translatedText: string; detectedSourceLang?: string; error?: string }> {
  const params: Record<string, string> = {
    q: text,
    target: targetLang,
    key: apiKey,
    format: 'text',
  };
  if (sourceLang) params.source = sourceLang;

  const res = await fetch('https://translation.googleapis.com/language/translate/v2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const errBody = await res.text();
    return { translatedText: '', error: `Translate API error (${res.status}): ${errBody.substring(0, 200)}` };
  }

  const data = await res.json() as any;
  const translation = data.data?.translations?.[0];

  if (!translation) {
    return { translatedText: '', error: 'No translation returned.' };
  }

  return {
    translatedText: translation.translatedText,
    detectedSourceLang: translation.detectedSourceLanguage,
  };
}

// === Google Geocoding API ===

export interface GeocodingResult {
  address: string;
  lat: number;
  lng: number;
  placeId: string;
  types: string[];
}

export async function geocode(
  apiKey: string,
  address: string
): Promise<{ results: GeocodingResult[]; error?: string }> {
  const params = new URLSearchParams({
    address,
    key: apiKey,
  });

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?${params}`
  );

  if (!res.ok) {
    return { results: [], error: `Geocoding API error: ${res.status}` };
  }

  const data = await res.json() as any;

  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    return { results: [], error: `Geocoding: ${data.status} — ${data.error_message || ''}` };
  }

  return {
    results: (data.results || []).slice(0, 5).map((r: any) => ({
      address: r.formatted_address,
      lat: r.geometry.location.lat,
      lng: r.geometry.location.lng,
      placeId: r.place_id,
      types: r.types?.slice(0, 3),
    })),
  };
}

// === YouTube Data API v3 ===

export interface YouTubeResult {
  title: string;
  channelTitle: string;
  description: string;
  videoId: string;
  publishedAt: string;
  url: string;
  thumbnailUrl?: string;
}

export async function searchYouTube(
  apiKey: string,
  query: string,
  options: { maxResults?: number; type?: 'video' | 'channel' | 'playlist'; order?: 'relevance' | 'date' | 'viewCount' } = {}
): Promise<{ results: YouTubeResult[]; error?: string }> {
  const params = new URLSearchParams({
    part: 'snippet',
    q: query,
    key: apiKey,
    type: options.type || 'video',
    maxResults: String(options.maxResults || 5),
    order: options.order || 'relevance',
  });

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?${params}`
  );

  if (!res.ok) {
    const errBody = await res.text();
    return { results: [], error: `YouTube API error (${res.status}): ${errBody.substring(0, 200)}` };
  }

  const data = await res.json() as any;

  return {
    results: (data.items || []).map((item: any) => ({
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      description: item.snippet.description?.substring(0, 200),
      videoId: item.id?.videoId || item.id?.channelId || item.id?.playlistId || '',
      publishedAt: item.snippet.publishedAt,
      url: item.id?.videoId
        ? `https://www.youtube.com/watch?v=${item.id.videoId}`
        : item.id?.channelId
        ? `https://www.youtube.com/channel/${item.id.channelId}`
        : '',
      thumbnailUrl: item.snippet.thumbnails?.medium?.url,
    })),
  };
}

// === Distance Matrix API (for quick time estimates) ===

export async function getDistanceMatrix(
  apiKey: string,
  origins: string,
  destinations: string,
  mode: 'driving' | 'walking' | 'transit' = 'driving'
): Promise<{ distance: string; duration: string; durationInTraffic?: string; error?: string }> {
  const params = new URLSearchParams({
    origins,
    destinations,
    key: apiKey,
    mode,
    departure_time: 'now',
  });

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?${params}`
  );

  if (!res.ok) {
    return { distance: '', duration: '', error: `Distance Matrix error: ${res.status}` };
  }

  const data = await res.json() as any;
  const element = data.rows?.[0]?.elements?.[0];

  if (!element || element.status !== 'OK') {
    return { distance: '', duration: '', error: `No route found: ${element?.status || data.status}` };
  }

  return {
    distance: element.distance.text,
    duration: element.duration.text,
    durationInTraffic: element.duration_in_traffic?.text,
  };
}
