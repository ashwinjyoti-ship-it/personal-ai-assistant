// Google Public APIs Service — Maps, Places, Translate, YouTube
// Uses Google API Key (not OAuth) for public API access
// All functions are Cloudflare Workers compatible (pure fetch)

// === Google Places API (New) — places.googleapis.com/v1 ===

export interface PlaceResult {
  name: string;
  address: string;
  rating?: number;
  userRatingsTotal?: number;
  priceLevel?: string;
  openNow?: boolean;
  types?: string[];
  placeId: string;
  location?: { lat: number; lng: number };
  googleMapsUri?: string;
}

export async function searchPlaces(
  apiKey: string,
  query: string,
  options: { location?: string; radius?: number; type?: string } = {}
): Promise<{ results: PlaceResult[]; error?: string }> {
  const body: Record<string, any> = {
    textQuery: query,
    languageCode: 'en',
    pageSize: 8,
  };

  // Optional: filter by place type
  if (options.type) body.includedType = options.type;

  // Optional: bias results near a location (lat,lng)
  if (options.location) {
    const parts = options.location.split(',').map(Number);
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      body.locationBias = {
        circle: {
          center: { latitude: parts[0], longitude: parts[1] },
          radius: options.radius || 5000,
        },
      };
    }
  }

  const fieldMask = [
    'places.displayName',
    'places.formattedAddress',
    'places.rating',
    'places.userRatingCount',
    'places.priceLevel',
    'places.currentOpeningHours',
    'places.types',
    'places.id',
    'places.location',
    'places.googleMapsUri',
  ].join(',');

  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': fieldMask,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    return { results: [], error: `Places API error (${res.status}): ${errText.substring(0, 200)}` };
  }

  const data = await res.json() as any;

  if (!data.places || data.places.length === 0) {
    return { results: [] };
  }

  const results: PlaceResult[] = data.places.map((p: any) => ({
    name: p.displayName?.text || '',
    address: p.formattedAddress || '',
    rating: p.rating,
    userRatingsTotal: p.userRatingCount,
    priceLevel: p.priceLevel,
    openNow: p.currentOpeningHours?.openNow,
    types: p.types?.slice(0, 5),
    placeId: p.id || '',
    location: p.location ? { lat: p.location.latitude, lng: p.location.longitude } : undefined,
    googleMapsUri: p.googleMapsUri,
  }));

  return { results };
}

// === Place Details (New) — GET /v1/places/{placeId} ===

export interface PlaceDetails {
  name: string;
  address: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviews?: { author: string; rating: number; text: string; time: string }[];
  openingHours?: string[];
  location?: { lat: number; lng: number };
  googleMapsUri?: string;
}

export async function getPlaceDetails(
  apiKey: string,
  placeId: string
): Promise<{ details?: PlaceDetails; error?: string }> {
  const fieldMask = [
    'displayName',
    'formattedAddress',
    'internationalPhoneNumber',
    'websiteUri',
    'rating',
    'reviews',
    'currentOpeningHours',
    'location',
    'googleMapsUri',
  ].join(',');

  const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    method: 'GET',
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': fieldMask,
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    return { error: `Place Details API error (${res.status}): ${errText.substring(0, 200)}` };
  }

  const p = await res.json() as any;

  return {
    details: {
      name: p.displayName?.text || '',
      address: p.formattedAddress || '',
      phone: p.internationalPhoneNumber,
      website: p.websiteUri,
      rating: p.rating,
      reviews: p.reviews?.slice(0, 3).map((r: any) => ({
        author: r.authorAttribution?.displayName || 'Anonymous',
        rating: r.rating || 0,
        text: r.text?.text?.substring(0, 200) || '',
        time: r.relativePublishTimeDescription || '',
      })),
      openingHours: p.currentOpeningHours?.weekdayDescriptions,
      location: p.location ? { lat: p.location.latitude, lng: p.location.longitude } : undefined,
      googleMapsUri: p.googleMapsUri,
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

// === Web Search ===
// Uses DuckDuckGo HTML search — zero API keys, zero cost, searches the entire web.
// Parses the HTML response for organic results.
// Falls back to Google CSE if GOOGLE_CSE_ID is configured.

export interface WebSearchResult {
  title: string;
  link: string;
  snippet: string;
  displayLink: string;
}

const DDG_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

/** Parse DuckDuckGo HTML search results (POST /html/ response format). */
export function parseDuckDuckGoHtml(html: string, maxResults: number): WebSearchResult[] {
  if (/anomaly-modal/i.test(html)) {
    return [];
  }

  const results: WebSearchResult[] = [];
  const resultBlocks = html.split(/class="result results_links/g).slice(1);

  for (const block of resultBlocks) {
    if (results.length >= maxResults) break;

    const titleMatch = block.match(/class="result__a"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/);
    const snippetMatch = block.match(/class="result__snippet"[^>]*>([\s\S]*?)<\/a>/);

    if (titleMatch) {
      let url = titleMatch[1];
      const uddgMatch = url.match(/uddg=([^&]+)/);
      if (uddgMatch) {
        url = decodeURIComponent(uddgMatch[1]);
      } else if (url.startsWith('//')) {
        url = 'https:' + url;
      }

      const cleanHtml = (s: string) => s
        .replace(/<[^>]*>/g, '')
        .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        .replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
        .trim();

      const title = cleanHtml(titleMatch[2]);
      const snippet = snippetMatch ? cleanHtml(snippetMatch[1]) : '';

      if (title && url.startsWith('http')) {
        const displayLink = url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
        results.push({ title, link: url, snippet, displayLink });
      }
    }
  }

  return results;
}

async function webSearchViaGoogleCse(
  query: string,
  apiKey: string,
  cseId: string,
  maxResults: number
): Promise<{ results: WebSearchResult[]; error?: string }> {
  const params = new URLSearchParams({
    key: apiKey,
    cx: cseId,
    q: query,
    num: String(Math.min(maxResults, 10)),
  });

  const res = await fetch(`https://www.googleapis.com/customsearch/v1?${params}`);
  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    return { results: [], error: `Google CSE failed (${res.status}): ${errText.substring(0, 200)}` };
  }

  const data = await res.json() as {
    items?: { title?: string; link?: string; snippet?: string; displayLink?: string }[];
  };

  const results = (data.items || []).map(item => ({
    title: item.title || '',
    link: item.link || '',
    snippet: item.snippet || '',
    displayLink: item.displayLink || (item.link || '').replace(/^https?:\/\/(www\.)?/, '').split('/')[0],
  })).filter(r => r.title && r.link.startsWith('http'));

  return { results };
}

export async function webSearch(
  query: string,
  options: { num?: number; site?: string; googleApiKey?: string; googleCseId?: string } = {}
): Promise<{ results: WebSearchResult[]; error?: string }> {
  const maxResults = Math.min(options.num || 5, 10);
  const fullQuery = options.site ? `site:${options.site} ${query}` : query;

  try {
    // DuckDuckGo requires POST — GET often returns a bot challenge (anomaly modal) with zero results.
    const params = new URLSearchParams({ q: fullQuery });
    const res = await fetch('https://html.duckduckgo.com/html/', {
      method: 'POST',
      headers: {
        'User-Agent': DDG_USER_AGENT,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!res.ok) {
      return { results: [], error: `Search request failed (${res.status})` };
    }

    const html = await res.text();
    const results = parseDuckDuckGoHtml(html, maxResults);

    if (results.length > 0) {
      return { results };
    }

    // Fallback: Google Custom Search when DDG is blocked or returns no parseable results
    if (options.googleApiKey && options.googleCseId) {
      const cse = await webSearchViaGoogleCse(fullQuery, options.googleApiKey, options.googleCseId, maxResults);
      if (cse.results.length > 0) return cse;
      if (cse.error) return { results: [], error: cse.error };
    }

    if (/anomaly-modal/i.test(html)) {
      return {
        results: [],
        error: 'Web search blocked by DuckDuckGo bot protection. Configure GOOGLE_API_KEY + GOOGLE_CSE_ID, or add a Perplexity API key in Settings → Keys for faster research.',
      };
    }

    return { results: [], error: undefined };
  } catch (err: any) {
    return { results: [], error: `Web search error: ${err.message}` };
  }
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
