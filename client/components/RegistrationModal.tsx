import { useState } from "react";
import { X, Check, Mail, Phone, Linkedin, Twitter, Building, User, Shield, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  registrationType: 'open' | 'approval_required';
}

interface ShareableDetails {
  email: boolean;
  phone: boolean;
  linkedin: boolean;
  twitter: boolean;
  company: boolean;
  role: boolean;
  bio: boolean;
}

const shareableFields = [
  {
    key: 'email' as keyof ShareableDetails,
    label: 'Email Address',
    description: 'Let attendees contact you directly',
    icon: Mail,
    required: true,
  },
  {
    key: 'phone' as keyof ShareableDetails,
    label: 'Phone Number',
    description: 'Share for urgent event updates',
    icon: Phone,
    required: false,
  },
  {
    key: 'linkedin' as keyof ShareableDetails,
    label: 'LinkedIn Profile',
    description: 'Connect professionally with attendees',
    icon: Linkedin,
    required: false,
  },
  {
    key: 'twitter' as keyof ShareableDetails,
    label: 'Twitter Profile',
    description: 'Share your social presence',
    icon: Twitter,
    required: false,
  },
  {
    key: 'company' as keyof ShareableDetails,
    label: 'Company Name',
    description: 'Help others know where you work',
    icon: Building,
    required: false,
  },
  {
    key: 'role' as keyof ShareableDetails,
    label: 'Job Title/Role',
    description: 'Share your professional role',
    icon: User,
    required: false,
  },
  {
    key: 'bio' as keyof ShareableDetails,
    label: 'Bio/About',
    description: 'Tell others about yourself',
    icon: Info,
    required: false,
  },
];

export default function RegistrationModal({ isOpen, onClose, eventTitle, eventPrice }: RegistrationModalProps) {
  const [shareableDetails, setShareableDetails] = useState<ShareableDetails>({
    email: true, // Email is required and pre-checked
    phone: false,
    linkedin: true, // LinkedIn commonly shared for networking
    twitter: false,
    company: true, // Company commonly shared for networking
    role: true, // Role commonly shared for networking
    bio: false,
  });

  const [step, setStep] = useState<'privacy' | 'details' | 'confirmation'>('privacy');

  const handleToggle = (field: keyof ShareableDetails) => {
    if (field === 'email') return; // Email is required, can't be toggled
    
    setShareableDetails(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleRegister = () => {
    // Here you would typically send the registration data to your backend
    console.log('Registering with shared details:', shareableDetails);
    
    // Simulate registration success
    setStep('confirmation');
    
    // Auto-close after a delay
    setTimeout(() => {
      onClose();
      setStep('privacy'); // Reset for next time
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {step === 'privacy' ? 'Privacy Settings' : 
                   step === 'details' ? 'Complete Registration' : 
                   'Registration Successful!'}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {step === 'privacy' ? `Choose what to share with other attendees at ${eventTitle}` :
                   step === 'details' ? 'Fill in your details for the event' :
                   'You\'re all set for the event!'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
            {step === 'privacy' && (
              <div className="p-6">
                {/* Privacy Notice */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                        Your Privacy Matters
                      </h3>
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        You control what information other attendees can see. You can change these settings anytime in your profile.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shareable Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    What would you like to share with other attendees?
                  </h3>
                  
                  {shareableFields.map((field) => (
                    <div key={field.key} className="flex items-start space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <div className="flex-shrink-0">
                        <field.icon className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">
                            {field.label}
                          </h4>
                          {field.required && (
                            <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full font-medium">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {field.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          onClick={() => handleToggle(field.key)}
                          disabled={field.required}
                          className={cn(
                            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
                            shareableDetails[field.key]
                              ? "bg-purple-600"
                              : "bg-gray-200 dark:bg-gray-600",
                            field.required && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          <span
                            className={cn(
                              "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                              shareableDetails[field.key] ? "translate-x-6" : "translate-x-1"
                            )}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continue Button */}
                <div className="mt-8 flex space-x-3">
                  <button
                    onClick={() => setStep('details')}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-200"
                  >
                    Continue to Registration
                  </button>
                </div>
              </div>
            )}

            {step === 'details' && (
              <div className="p-6">
                {/* Event Summary */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Event Summary</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p className="mb-1"><strong>Event:</strong> {eventTitle}</p>
                    <p><strong>Price:</strong> {eventPrice}</p>
                  </div>
                </div>

                {/* Registration Form */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Complete Your Registration
                  </h3>
                  
                  {/* Personal Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Conditional Fields Based on Privacy Settings */}
                  {shareableDetails.phone && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  )}

                  {shareableDetails.company && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        placeholder="Enter your company name"
                      />
                    </div>
                  )}

                  {shareableDetails.role && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Job Title/Role
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        placeholder="Enter your job title"
                      />
                    </div>
                  )}

                  {shareableDetails.linkedin && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                  )}

                  {shareableDetails.twitter && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Twitter Profile
                      </label>
                      <input
                        type="url"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        placeholder="https://twitter.com/yourusername"
                      />
                    </div>
                  )}

                  {shareableDetails.bio && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bio/About Yourself
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        placeholder="Tell other attendees about yourself..."
                      />
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex space-x-3">
                  <button
                    onClick={() => setStep('privacy')}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleRegister}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-200"
                  >
                    Complete Registration
                  </button>
                </div>
              </div>
            )}

            {step === 'confirmation' && (
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Registration Successful!
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  You're all set for {eventTitle}. We've sent a confirmation email with all the details.
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You can update your privacy settings and shared information anytime in your profile.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
