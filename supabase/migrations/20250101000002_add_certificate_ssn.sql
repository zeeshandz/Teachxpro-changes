-- Add certificate_ssn column to internship table
ALTER TABLE internship 
ADD COLUMN IF NOT EXISTS certificate_ssn TEXT;

-- Create index for faster certificate SSN lookups
CREATE INDEX IF NOT EXISTS idx_internship_certificate_ssn 
ON internship(certificate_ssn) 
WHERE certificate_ssn IS NOT NULL;

-- Add comment to document the column purpose
COMMENT ON COLUMN internship.certificate_ssn IS 'Unique serial number for certificate verification'; 