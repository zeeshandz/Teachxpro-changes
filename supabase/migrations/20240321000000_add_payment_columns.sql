-- Add payment-related columns to internship table
ALTER TABLE internship 
ADD COLUMN IF NOT EXISTS coupon_code text,
ADD COLUMN IF NOT EXISTS coupon_fee integer,
ADD COLUMN IF NOT EXISTS razorpay_payment_id text,
ADD COLUMN IF NOT EXISTS razorpay_order_id text,
ADD COLUMN IF NOT EXISTS razorpay_signature text,
ADD COLUMN IF NOT EXISTS payment_status text NOT NULL DEFAULT 'pending'
CHECK (payment_status IN ('pending', 'completed', 'failed'));

-- Create indexes for payment-related columns
CREATE INDEX IF NOT EXISTS internship_payment_id_idx ON internship(razorpay_payment_id);
CREATE INDEX IF NOT EXISTS internship_order_id_idx ON internship(razorpay_order_id);
CREATE INDEX IF NOT EXISTS internship_payment_status_idx ON internship(payment_status); 