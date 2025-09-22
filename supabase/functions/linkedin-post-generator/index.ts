import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from "../_shared/cors.ts"

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get the request body
    const requestBody = await req.json()

    // Validate required fields
    if (!requestBody.formFields || !Array.isArray(requestBody.formFields)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request body format' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Forward the request to the external API
    const externalApiResponse = await fetch('https://assistants-backend.onrender.com/linkedin/generate-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!externalApiResponse.ok) {
      const errorText = await externalApiResponse.text()
      console.error('External API error:', externalApiResponse.status, errorText)
      
      return new Response(
        JSON.stringify({ 
          error: 'External API request failed',
          status: externalApiResponse.status,
          details: errorText
        }),
        { 
          status: externalApiResponse.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get the response content
    const content = await externalApiResponse.text()
    
    if (!content || content.trim() === '') {
      return new Response(
        JSON.stringify({ error: 'No content received from external API' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Extract hashtags from the content
    const hashtagRegex = /#\w+/g
    const hashtags = content.match(hashtagRegex) || ['#GenerativeAI', '#AILearning', '#Codways', '#ProfessionalDevelopment']

    // Return the successful response
    return new Response(
      JSON.stringify({
        content: content,
        hashtags: hashtags
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Function error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
