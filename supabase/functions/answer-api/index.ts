import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': '*'
};

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjY3ZDZmODU4ZGIwZmVlMzgwMWUzZmExYiIsInN0cmlwZUlkIjoiY3VzX1J4RUZoU2hlb2FXd09tIiwic2Vzc2lvbklkIjoiNjdmYmJiNmY0OTg5YjJiYWQ0N2I0YzkyIiwiYmFsYW5jZSI6NSwic3Vic2NyaXB0aW9uUGVyaW9kRW5kIjoxNzQ0ODIzNTM0fSwiaWF0IjoxNzQ0NTUwNzY3LCJleHAiOjE3NDQ1NTE2Njd9.GVTcnOw8FNkGuOUOtIk3ngM2_w_w-pG8gMdBBo08V9Y';

const FUNCTION_ROUTE = '/answer-api'; // The route Supabase uses for this function

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    // Add Content-Type specifically for OPTIONS response if needed, otherwise just CORS
    return new Response(null, {
      headers: CORS_HEADERS
    });
  }

  try {
    const url = new URL(req.url);
    let requestPath = url.pathname;

    // Remove the function route prefix if present
    if (requestPath.startsWith(FUNCTION_ROUTE)) {
      requestPath = requestPath.substring(FUNCTION_ROUTE.length);
    }

    // Ensure path starts with a slash
    if (!requestPath.startsWith('/')) {
      requestPath = '/' + requestPath;
    }

    const targetUrl = 'https://api.answersai.com' + requestPath + url.search;
    console.log('Target URL:', targetUrl);

    // Get the request body if it exists
    let body = undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD') { // HEAD requests shouldn't have bodies either
      const bodyText = await req.text();
      if (bodyText) { // Only set body if there's content
        body = bodyText;
        console.log('Request Body:', body);
      }
    }

    // Prepare headers for the target API request
    const requestHeaders = {
      'Content-Type': req.headers.get('Content-Type') || 'application/json', // Use incoming or default
      'Cookie': `x-access-token=${ACCESS_TOKEN}`
      // Add other headers from req if needed, be careful not to overwrite essential ones like Host
    };
    console.log('Making request with headers:', requestHeaders);

    // Forward the request to the target API using the original method
    const response = await fetch(targetUrl, {
      method: req.method, // Use the original request method
      headers: requestHeaders,
      body: body
    });

    console.log('Response Status:', response.status);
    console.log('Raw Response Headers:', Object.fromEntries(response.headers));

    // Read the response body
    const responseBody = await response.text();
    console.log('Response Body:', responseBody);

    // Create final headers, preserving original ones and adding CORS
    const finalHeaders = new Headers(response.headers); // Copy original headers
    finalHeaders.set('Access-Control-Allow-Origin', '*');
    finalHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    finalHeaders.set('Access-Control-Allow-Headers', '*');
    // Don't force Content-Type here, let the original response's Content-Type pass through

    console.log('Final Response Headers Object:', Object.fromEntries(finalHeaders));

    // Create a new response with the body, original status, and final headers
    const finalResponse = new Response(responseBody, {
      status: response.status,       // Use original status
      statusText: response.statusText, // Use original status text
      headers: finalHeaders           // Use combined headers
    });

    console.log('Final Response Status:', finalResponse.status);
    console.log('Final Response Headers:', Object.fromEntries(finalResponse.headers));
    
    return finalResponse;
  } catch (error) {
    console.error('Error:', error);
    // Ensure error response also has CORS headers
    const errorHeaders = new Headers(CORS_HEADERS);
    errorHeaders.set('Content-Type', 'application/json');
    
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: error.message }), {
      status: 500,
      headers: errorHeaders
    });
  }
}); 