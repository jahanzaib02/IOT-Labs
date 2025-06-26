'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeSlash } from 'phosphor-react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/firebase/firebase'; // ✅ Update this path if needed

export default function SignUpPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleNext = () => {
    if (!email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !dob) {
      alert('Please complete all fields.');
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });

      router.push('/sign-in');
    } catch (error: any) {
      console.error('Firebase sign-up error:', error);
      alert(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20 font-[Inter] px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-[380px] max-w-[90%] text-center animate-fadeIn">
        <h2 className="text-3xl text-[#0a3d62] mb-8 tracking-wide">WELCOME</h2>

        <form onSubmit={handleSubmit} className="space-y-6 text-left text-black">
          {step === 1 ? (
            <>
              {/* Email */}
              <div>
                <label className="block text-base font-medium mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 pr-10 rounded-xl border border-blue-200 bg-[#f9fcff] text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-base font-medium mb-1">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-10 rounded-xl border border-blue-200 bg-[#f9fcff] text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <div
                  className="absolute right-4 top-10 text-gray-500 cursor-pointer hover:text-blue-600"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </div>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label className="block text-base font-medium mb-1">Confirm Password</label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-10 rounded-xl border border-blue-200 bg-[#f9fcff] text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <div
                  className="absolute right-4 top-10 text-gray-500 cursor-pointer hover:text-blue-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </div>
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="w-full bg-blue-600 text-white text-[16px] font-semibold py-3 rounded-xl hover:bg-blue-800 transition"
              >
                Next
              </button>

              <p className="text-[15px] text-gray-600 text-center">
                Already have an account?{' '}
                <a href="/sign-in" className="text-blue-600 hover:underline font-medium">
                  Log in
                </a>
              </p>
            </>
          ) : (
            <>
              {/* First Name */}
              <div>
                <label className="block text-base font-medium mb-1">First Name</label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-[#f9fcff] text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-base font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-[#f9fcff] text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-base font-medium mb-1">Date of Birth</label>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-[#f9fcff] text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white text-[16px] font-semibold py-3 rounded-xl hover:bg-blue-800 transition"
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>

              <p className="text-[15px] text-gray-600 text-center">
                Already have an account?{' '}
                <a href="/sign-in" className="text-blue-600 hover:underline font-medium">
                  Log in
                </a>
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
