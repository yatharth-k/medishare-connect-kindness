import React, { useState } from "react";
import StepperForm from "../components/ui/StepperForm";
import GradientButton from "../components/ui/GradientButton";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const steps = ["Medicine Details", "Upload Photos", "Review & Submit"];

type FormType = {
  name: string;
  category: string;
  quantity: string;
  expiry: string;
  condition: string;
  location: string;
  notes: string;
  photos: File[];
};

type ErrorType = {
  name?: string;
  category?: string;
  quantity?: string;
  expiry?: string;
  condition?: string;
  photos?: string;
};

const initialForm: FormType = {
  name: "",
  category: "",
  quantity: "",
  expiry: "",
  condition: "",
  location: "",
  notes: "",
  photos: [],
};

const DonateMedicine = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState<FormType>(initialForm);
  const [errors, setErrors] = useState<ErrorType>({});
  const [loading, setLoading] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm({ ...form, photos: Array.from(e.target.files) });
    }
  };

  const validateStep = () => {
    const errs: ErrorType = {};
    if (currentStep === 0) {
      if (!form.name) errs.name = "Medicine name is required.";
      if (!form.category) errs.category = "Category is required.";
      if (!form.quantity) errs.quantity = "Quantity is required.";
      if (!form.expiry) errs.expiry = "Expiry date is required.";
      if (!form.condition) errs.condition = "Condition is required.";
    }
    if (currentStep === 1 && form.photos.length === 0) {
      errs.photos = "At least one photo is required.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setCurrentStep((s) => s + 1);
  };
  const handleBack = () => setCurrentStep((s) => s - 1);

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate async donation submission
    setTimeout(() => {
      setLoading(false);
      setCurrentStep(0);
      setForm(initialForm);
      alert("Donation submitted! (Demo)");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50 font-sans">
      <Header />
      <main className="flex-1 flex items-center justify-center py-10">
        <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-2xl">
          <StepperForm steps={steps} currentStep={currentStep} onNext={handleNext} onBack={handleBack}>
            {currentStep === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input name="name" value={form.name} onChange={handleInput} className={`peer px-4 py-3 rounded-lg border ${errors.name ? 'border-red-400' : 'border-gray-200'} focus:ring-2 focus:ring-blue-200 outline-none w-full font-sans bg-transparent`} required />
                  <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500 peer-valid:-top-3 peer-valid:text-xs bg-white px-1 pointer-events-none">Medicine Name *</label>
                  {errors.name && <span className="text-xs text-red-500 mt-1 block">{errors.name}</span>}
                </div>
                <div className="relative">
                  <select name="category" value={form.category} onChange={handleInput} className={`peer px-4 py-3 rounded-lg border ${errors.category ? 'border-red-400' : 'border-gray-200'} focus:ring-2 focus:ring-blue-200 outline-none w-full font-sans bg-transparent`} required>
                    <option value="">Select category</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Syrup">Syrup</option>
                    <option value="Injection">Injection</option>
                    <option value="Other">Other</option>
                  </select>
                  <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500 peer-valid:-top-3 peer-valid:text-xs bg-white px-1 pointer-events-none">Category *</label>
                  {errors.category && <span className="text-xs text-red-500 mt-1 block">{errors.category}</span>}
                </div>
                <div className="relative">
                  <input name="quantity" value={form.quantity} onChange={handleInput} className={`peer px-4 py-3 rounded-lg border ${errors.quantity ? 'border-red-400' : 'border-gray-200'} focus:ring-2 focus:ring-blue-200 outline-none w-full font-sans bg-transparent`} required />
                  <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500 peer-valid:-top-3 peer-valid:text-xs bg-white px-1 pointer-events-none">Quantity *</label>
                  {errors.quantity && <span className="text-xs text-red-500 mt-1 block">{errors.quantity}</span>}
                </div>
                <div className="relative">
                  <input name="expiry" type="date" value={form.expiry} onChange={handleInput} className={`peer px-4 py-3 rounded-lg border ${errors.expiry ? 'border-red-400' : 'border-gray-200'} focus:ring-2 focus:ring-blue-200 outline-none w-full font-sans bg-transparent`} required />
                  <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500 peer-valid:-top-3 peer-valid:text-xs bg-white px-1 pointer-events-none">Expiry Date *</label>
                  {errors.expiry && <span className="text-xs text-red-500 mt-1 block">{errors.expiry}</span>}
                </div>
                <div className="relative md:col-span-2">
                  <select name="condition" value={form.condition} onChange={handleInput} className={`peer px-4 py-3 rounded-lg border ${errors.condition ? 'border-red-400' : 'border-gray-200'} focus:ring-2 focus:ring-blue-200 outline-none w-full font-sans bg-transparent`} required>
                    <option value="">Select condition</option>
                    <option value="Unopened">Unopened</option>
                    <option value="Opened">Opened</option>
                    <option value="Damaged Box">Damaged Box</option>
                  </select>
                  <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500 peer-valid:-top-3 peer-valid:text-xs bg-white px-1 pointer-events-none">Condition *</label>
                  {errors.condition && <span className="text-xs text-red-500 mt-1 block">{errors.condition}</span>}
                </div>
                <div className="relative md:col-span-2">
                  <input name="location" value={form.location} onChange={handleInput} className="peer px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none w-full font-sans bg-transparent" />
                  <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500 peer-valid:-top-3 peer-valid:text-xs bg-white px-1 pointer-events-none">Your Location</label>
                </div>
                <div className="relative md:col-span-2">
                  <textarea name="notes" value={form.notes} onChange={handleInput} className="peer px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none w-full font-sans bg-transparent resize-none" rows={2} />
                  <label className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500 peer-valid:-top-3 peer-valid:text-xs bg-white px-1 pointer-events-none">Additional Notes</label>
                </div>
              </div>
            )}
            {currentStep === 1 && (
              <div className="flex flex-col items-center gap-6">
                <label className="w-full flex flex-col items-center px-4 py-8 bg-blue-50 rounded-xl border-2 border-dashed border-blue-200 cursor-pointer hover:bg-blue-100 transition-all">
                  <span className="text-lg font-semibold text-blue-500 mb-2">Upload Medicine Photos *</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoUpload} />
                  <span className="text-gray-400 text-sm">Drag & drop or click to select files</span>
                  {errors.photos && <span className="text-xs text-red-500 mt-2">{errors.photos}</span>}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {form.photos.map((file, idx) => (
                      <span key={idx} className="inline-block bg-white border border-blue-200 rounded-lg px-3 py-1 text-xs text-blue-600 shadow">{file.name}</span>
                    ))}
                  </div>
                </label>
              </div>
            )}
            {currentStep === 2 && (
              <div className="flex flex-col items-center gap-6">
                <h3 className="text-xl font-bold mb-2">Review Your Donation</h3>
                <div className="w-full bg-blue-50 rounded-xl p-6 flex flex-col gap-2">
                  <div><span className="font-semibold">Medicine Name:</span> {form.name}</div>
                  <div><span className="font-semibold">Category:</span> {form.category}</div>
                  <div><span className="font-semibold">Quantity:</span> {form.quantity}</div>
                  <div><span className="font-semibold">Expiry Date:</span> {form.expiry}</div>
                  <div><span className="font-semibold">Condition:</span> {form.condition}</div>
                  <div><span className="font-semibold">Location:</span> {form.location}</div>
                  <div><span className="font-semibold">Notes:</span> {form.notes}</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.photos.map((file, idx) => (
                      <span key={idx} className="inline-block bg-white border border-blue-200 rounded-lg px-3 py-1 text-xs text-blue-600 shadow">{file.name}</span>
                    ))}
                  </div>
                </div>
                <GradientButton className="w-full text-lg mt-4" onClick={handleSubmit} disabled={loading}>
                  {loading ? <LoadingSpinner /> : "Submit Donation"}
                </GradientButton>
              </div>
            )}
          </StepperForm>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DonateMedicine; 