import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Heart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, PostgrestError } from '@supabase/supabase-js';

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const [signInForm, setSignInForm] = useState({
    email: '',
    password: ''
  });

  const [signUpForm, setSignUpForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'donor',
    organizationName: '',
    organizationRegistration: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    phoneNumber: ''
  });

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        navigate('/');
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        navigate('/');
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: signInForm.email,
        password: signInForm.password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "You have been signed in successfully.",
      });
    } catch (error) {
      const supabaseError = error as PostgrestError;
      toast({
        variant: "destructive",
        title: "Sign In Failed",
        description: supabaseError.message || "An error occurred during sign in.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signUpForm.password !== signUpForm.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password Mismatch",
        description: "Passwords do not match.",
      });
      return;
    }

    if (signUpForm.password.length < 6) {
      toast({
        variant: "destructive",
        title: "Weak Password",
        description: "Password must be at least 6 characters long.",
      });
      return;
    }

    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: signUpForm.email,
        password: signUpForm.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: signUpForm.fullName,
            user_type: signUpForm.userType,
            organization_name: signUpForm.organizationName,
            organization_registration_number: signUpForm.organizationRegistration,
            address: signUpForm.address,
            city: signUpForm.city,
            state: signUpForm.state,
            country: signUpForm.country,
            postal_code: signUpForm.postalCode,
            phone_number: signUpForm.phoneNumber
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Account Created!",
        description: "Please check your email to verify your account.",
      });
    } catch (error) {
      const supabaseError = error as PostgrestError;
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: supabaseError.message || "An error occurred during sign up.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignInInputChange = (field: string, value: string) => {
    setSignInForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUpInputChange = (field: string, value: string) => {
    setSignUpForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">MediShare</span>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </nav>

      {/* Auth Forms */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to MediShare</h1>
            <p className="text-gray-600">Join our community of donors and NGOs</p>
          </div>

          <Card>
            <CardHeader>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="signin" className="space-y-4">
                  <CardTitle>Sign In</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div>
                      <Label htmlFor="signin-email">Email</Label>
                      <Input
                        id="signin-email"
                        type="email"
                        value={signInForm.email}
                        onChange={(e) => handleSignInInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="signin-password">Password</Label>
                      <Input
                        id="signin-password"
                        type="password"
                        value={signInForm.password}
                        onChange={(e) => handleSignInInputChange('password', e.target.value)}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                      disabled={loading}
                    >
                      {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>
                    Join MediShare as a donor or NGO
                  </CardDescription>
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div>
                      <Label htmlFor="user-type">I am a</Label>
                      <Select value={signUpForm.userType} onValueChange={(value) => handleSignUpInputChange('userType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="donor">Individual Donor</SelectItem>
                          <SelectItem value="ngo">NGO/Organization</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="full-name">Full Name</Label>
                      <Input
                        id="full-name"
                        value={signUpForm.fullName}
                        onChange={(e) => handleSignUpInputChange('fullName', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={signUpForm.email}
                        onChange={(e) => handleSignUpInputChange('email', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={signUpForm.phoneNumber}
                        onChange={(e) => handleSignUpInputChange('phoneNumber', e.target.value)}
                      />
                    </div>

                    {signUpForm.userType === 'ngo' && (
                      <>
                        <div>
                          <Label htmlFor="org-name">Organization Name</Label>
                          <Input
                            id="org-name"
                            value={signUpForm.organizationName}
                            onChange={(e) => handleSignUpInputChange('organizationName', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="org-reg">Registration Number</Label>
                          <Input
                            id="org-reg"
                            value={signUpForm.organizationRegistration}
                            onChange={(e) => handleSignUpInputChange('organizationRegistration', e.target.value)}
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={signUpForm.address}
                        onChange={(e) => handleSignUpInputChange('address', e.target.value)}
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={signUpForm.city}
                          onChange={(e) => handleSignUpInputChange('city', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={signUpForm.state}
                          onChange={(e) => handleSignUpInputChange('state', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={signUpForm.country}
                          onChange={(e) => handleSignUpInputChange('country', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="postal">Postal Code</Label>
                        <Input
                          id="postal"
                          value={signUpForm.postalCode}
                          onChange={(e) => handleSignUpInputChange('postalCode', e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={signUpForm.password}
                        onChange={(e) => handleSignUpInputChange('password', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={signUpForm.confirmPassword}
                        onChange={(e) => handleSignUpInputChange('confirmPassword', e.target.value)}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                      disabled={loading}
                    >
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Auth;