/*
  # Add payment status index
  
  1. New Indexes
    - Add index on payment_status column for enrollments and consultations tables
    - Add index on email column for case-insensitive searches
    
  2. Changes
    - Add indexes to improve query performance for payment status and email lookups
*/

-- Add index for payment_status on enrollments
CREATE INDEX IF NOT EXISTS enrollments_payment_status_email_idx 
ON enrollments(payment_status, email);

-- Add index for case-insensitive email searches on enrollments
CREATE INDEX IF NOT EXISTS enrollments_email_lower_idx 
ON enrollments(lower(email));

-- Add index for payment_status on consultations
CREATE INDEX IF NOT EXISTS consultations_payment_status_email_idx 
ON consultations(payment_status, client_email);

-- Add index for case-insensitive email searches on consultations
CREATE INDEX IF NOT EXISTS consultations_email_lower_idx 
ON consultations(lower(client_email));