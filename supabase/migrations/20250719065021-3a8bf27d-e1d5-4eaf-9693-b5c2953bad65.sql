-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone_number TEXT,
  user_type TEXT CHECK (user_type IN ('donor', 'ngo', 'admin')) NOT NULL DEFAULT 'donor',
  organization_name TEXT,
  organization_registration_number TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  postal_code TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create medicine categories table
CREATE TABLE public.medicine_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for medicine categories
ALTER TABLE public.medicine_categories ENABLE ROW LEVEL SECURITY;

-- Create policy for medicine categories (readable by all)
CREATE POLICY "Medicine categories are viewable by everyone" 
ON public.medicine_categories 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can manage categories" 
ON public.medicine_categories 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND user_type = 'admin'
));

-- Create medicine donations table
CREATE TABLE public.medicine_donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  medicine_name TEXT NOT NULL,
  brand_name TEXT,
  generic_name TEXT,
  category_id UUID REFERENCES public.medicine_categories(id),
  dosage_form TEXT, -- tablet, capsule, syrup, injection, etc.
  strength TEXT, -- 500mg, 10ml, etc.
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit TEXT NOT NULL, -- pieces, bottles, boxes, etc.
  batch_number TEXT,
  manufacturing_date DATE,
  expiry_date DATE NOT NULL,
  storage_conditions TEXT,
  original_packaging BOOLEAN DEFAULT true,
  prescription_required BOOLEAN DEFAULT false,
  description TEXT,
  status TEXT CHECK (status IN ('pending', 'verified', 'available', 'reserved', 'delivered', 'expired', 'rejected')) NOT NULL DEFAULT 'pending',
  images TEXT[], -- array of image URLs
  estimated_value DECIMAL(10,2),
  pickup_address TEXT,
  pickup_city TEXT,
  pickup_state TEXT,
  pickup_country TEXT,
  pickup_postal_code TEXT,
  pickup_instructions TEXT,
  verified_by UUID REFERENCES public.profiles(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  verification_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Constraint to ensure expiry date is in the future (at least 6 months)
  CONSTRAINT valid_expiry_date CHECK (expiry_date > CURRENT_DATE + INTERVAL '6 months')
);

-- Enable RLS
ALTER TABLE public.medicine_donations ENABLE ROW LEVEL SECURITY;

-- Create policies for medicine donations
CREATE POLICY "Anyone can view available donations" 
ON public.medicine_donations 
FOR SELECT 
USING (status IN ('verified', 'available', 'reserved'));

CREATE POLICY "Donors can view their own donations" 
ON public.medicine_donations 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = donor_id AND user_id = auth.uid()
));

CREATE POLICY "Donors can create donations" 
ON public.medicine_donations 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = donor_id AND user_id = auth.uid()
));

CREATE POLICY "Donors can update their own donations" 
ON public.medicine_donations 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = donor_id AND user_id = auth.uid()
));

CREATE POLICY "Admins can manage all donations" 
ON public.medicine_donations 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND user_type = 'admin'
));

-- Create donation requests table
CREATE TABLE public.donation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ngo_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  donation_id UUID NOT NULL REFERENCES public.medicine_donations(id) ON DELETE CASCADE,
  requested_quantity INTEGER NOT NULL CHECK (requested_quantity > 0),
  purpose TEXT NOT NULL,
  urgency_level TEXT CHECK (urgency_level IN ('low', 'medium', 'high', 'critical')) NOT NULL DEFAULT 'medium',
  beneficiary_count INTEGER,
  beneficiary_details TEXT,
  delivery_address TEXT NOT NULL,
  delivery_city TEXT NOT NULL,
  delivery_state TEXT NOT NULL,
  delivery_country TEXT NOT NULL,
  delivery_postal_code TEXT NOT NULL,
  delivery_instructions TEXT,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected', 'delivered', 'cancelled')) NOT NULL DEFAULT 'pending',
  approved_by UUID REFERENCES public.profiles(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  tracking_number TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  UNIQUE(ngo_id, donation_id)
);

-- Enable RLS
ALTER TABLE public.donation_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for donation requests
CREATE POLICY "NGOs can view their own requests" 
ON public.donation_requests 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = ngo_id AND user_id = auth.uid()
));

CREATE POLICY "Donors can view requests for their donations" 
ON public.donation_requests 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.medicine_donations md
  JOIN public.profiles p ON p.id = md.donor_id
  WHERE md.id = donation_id AND p.user_id = auth.uid()
));

CREATE POLICY "NGOs can create requests" 
ON public.donation_requests 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = ngo_id AND user_id = auth.uid() AND user_type = 'ngo'
));

CREATE POLICY "NGOs can update their own requests" 
ON public.donation_requests 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = ngo_id AND user_id = auth.uid()
));

CREATE POLICY "Admins can manage all requests" 
ON public.donation_requests 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND user_type = 'admin'
));

-- Create contact messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT CHECK (status IN ('new', 'read', 'replied', 'closed')) NOT NULL DEFAULT 'new',
  replied_at TIMESTAMP WITH TIME ZONE,
  replied_by UUID REFERENCES public.profiles(id),
  reply_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for contact messages
CREATE POLICY "Anyone can create contact messages" 
ON public.contact_messages 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view all contact messages" 
ON public.contact_messages 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND user_type = 'admin'
));

CREATE POLICY "Admins can update contact messages" 
ON public.contact_messages 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE user_id = auth.uid() AND user_type = 'admin'
));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_medicine_donations_updated_at
  BEFORE UPDATE ON public.medicine_donations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_donation_requests_updated_at
  BEFORE UPDATE ON public.donation_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert some sample medicine categories
INSERT INTO public.medicine_categories (name, description) VALUES
('Pain Relief', 'Medications for pain management including analgesics and anti-inflammatory drugs'),
('Antibiotics', 'Medications used to treat bacterial infections'),
('Cardiovascular', 'Medications for heart and blood vessel conditions'),
('Diabetes', 'Medications for managing diabetes and blood sugar levels'),
('Respiratory', 'Medications for respiratory conditions like asthma and COPD'),
('Mental Health', 'Medications for mental health conditions including antidepressants and anxiolytics'),
('Gastrointestinal', 'Medications for digestive system disorders'),
('Vitamins & Supplements', 'Vitamins, minerals, and nutritional supplements'),
('Dermatology', 'Medications for skin conditions and disorders'),
('Pediatric', 'Medications specifically formulated for children');