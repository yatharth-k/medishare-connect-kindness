
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Heart, Shield, Users, ArrowRight, Phone, Mail, MapPin, Plus, Search, Check, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([contactForm]);

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Thank you for your message! We will get back to you soon.",
      });
      
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      const err = error as Error;
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">MediShare</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">How It Works</a>
              <a href="#benefits" className="text-gray-700 hover:text-blue-600 transition-colors">Benefits</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            </div>
            <div className="flex space-x-4">
              {user ? (
                <>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">{user.email}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                    onClick={signOut}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                    onClick={() => navigate('/auth')}
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    onClick={() => navigate('/auth')}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
              Making Healthcare Accessible
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Turn Your Unused Medicines Into
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Hope</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect with NGOs and communities in need. Safely donate your unused medicines 
              and help bridge the healthcare gap in underserved communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                onClick={() => user ? navigate('/donate-medicine') : navigate('/auth')}
              >
                Donate Medicines
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => user ? navigate('/dashboard') : navigate('/auth')}
              >
                I'm an NGO
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every year, millions of dollars worth of medicines go unused while communities struggle 
              to access basic healthcare. We're changing that by creating a safe, transparent platform 
              that connects generous donors with verified NGOs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Compassionate Giving</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Transform your unused medicines into life-saving resources for those who need them most.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Safe & Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Every donation is verified, tracked, and handled with the highest safety standards.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="bg-purple-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Community Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Join a growing network of donors and NGOs working together to improve global health.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Simple steps to make a meaningful impact</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Plus className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Register</h3>
              <p className="text-gray-600">
                Sign up as a donor or NGO with verified credentials
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. List or Find</h3>
              <p className="text-gray-600">
                Donors list medicines, NGOs browse available donations
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Verify</h3>
              <p className="text-gray-600">
                Our team verifies medicine quality and safety standards
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-600 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">4. Deliver</h3>
              <p className="text-gray-600">
                Safe delivery to NGOs and communities in need
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Benefits for Everyone</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-600">For Donors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold">Make a Real Impact</p>
                    <p className="text-gray-600">Your unused medicines can save lives and improve health outcomes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold">Tax Benefits</p>
                    <p className="text-gray-600">Receive tax deductions for your charitable donations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold">Environmental Impact</p>
                    <p className="text-gray-600">Prevent pharmaceutical waste and protect the environment</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold">Track Your Impact</p>
                    <p className="text-gray-600">See exactly how your donations are being used</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-green-600">For NGOs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold">Access Essential Medicines</p>
                    <p className="text-gray-600">Get the medicines your communities need at no cost</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold">Quality Assurance</p>
                    <p className="text-gray-600">All medicines are verified for safety and effectiveness</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold">Inventory Management</p>
                    <p className="text-gray-600">Track and manage your medicine inventory efficiently</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold">Expand Your Reach</p>
                    <p className="text-gray-600">Serve more people in your community with increased resources</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Medicines Donated</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">NGOs Partnered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-blue-100">Lives Impacted</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-blue-100">Countries Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>What types of medicines can be donated?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We accept unopened, unexpired prescription and over-the-counter medicines. 
                  All donations must be in their original packaging with clear labeling and 
                  must have at least 6 months until expiration.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>How do you ensure medicine safety?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our certified pharmacists review all donations, checking expiration dates, 
                  packaging integrity, and storage conditions. We also maintain cold chain 
                  logistics for temperature-sensitive medications.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Can individuals donate directly to specific NGOs?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes! You can browse our network of verified NGOs and choose specific 
                  organizations to support, or let our algorithm match your donations 
                  with the most urgent needs.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>How are NGOs verified?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All NGOs undergo a thorough verification process including legal documentation 
                  review, site visits, and ongoing monitoring to ensure they meet our standards 
                  for legitimate charitable work.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-600">Have questions? We're here to help.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span>+91-7023733199</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span>yatharth00kherodia@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span>INDIA</span>
                </div>
              </div>
              <Separator className="my-6" />
              <div>
                <h4 className="font-semibold mb-2">Office Hours</h4>
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>We'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">MediShare</span>
              </div>
              <p className="text-gray-400">
                Connecting unused medicines with communities in need, 
                one donation at a time.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Donors</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For NGOs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Standards</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guidelines</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-800" />
          <div className="text-center text-gray-400">
            <p>&copy; 2024 MediShare. All rights reserved. Made with ❤️ for global health.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
