ALTER TABLE hackathon_registrations
ADD COLUMN hackathon_id BIGINT,
ADD COLUMN hackathon_name TEXT,
ADD COLUMN razorpay_payment_id TEXT,
ADD COLUMN razorpay_order_id TEXT,
ADD COLUMN razorpay_signature TEXT,
ADD COLUMN payment_status TEXT;
