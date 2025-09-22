// Follow Deno runtime requirements
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET') || '';

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.error('Missing required parameters:', {
        hasOrderId: !!razorpay_order_id,
        hasPaymentId: !!razorpay_payment_id,
        hasSignature: !!razorpay_signature
      });
      throw new Error('Missing required payment verification parameters');
    }

    console.log('Verifying payment:', {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id
    });

    // Create the string to be hashed
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;

    // Generate HMAC SHA256 hash
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(RAZORPAY_KEY_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signature = await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(text)
    );

    // Convert to hex string
    const calculatedSignature = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    if (calculatedSignature !== razorpay_signature) {
      console.error('Signature mismatch:', {
        expected: razorpay_signature,
        calculated: calculatedSignature
      });
      throw new Error('Invalid payment signature');
    }

    // Verify payment status with Razorpay
    const response = await fetch(`https://api.razorpay.com/v1/payments/${razorpay_payment_id}`, {
      headers: {
        'Authorization': `Basic ${btoa(`${Deno.env.get('RAZORPAY_KEY_ID')}:${RAZORPAY_KEY_SECRET}`)}`
      }
    });

    if (!response.ok) {
      console.error('Razorpay API error:', await response.text());
      throw new Error('Failed to verify payment with Razorpay');
    }

    const payment = await response.json();

    // Check payment status
    if (payment.status !== 'captured') {
      console.error('Payment not captured:', payment.status);
      throw new Error(`Payment not captured. Status: ${payment.status}`);
    }

    console.log('Payment verification successful');

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Payment verified successfully',
        payment: {
          id: payment.id,
          amount: payment.amount,
          status: payment.status,
          order_id: payment.order_id,
          method: payment.method
        }
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Payment verification error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error instanceof Error ? error.message : 'Payment verification failed',
        details: error instanceof Error ? error.stack : undefined
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 400
      }
    );
  }
});