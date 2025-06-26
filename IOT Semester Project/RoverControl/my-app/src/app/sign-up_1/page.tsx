'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeSlash } from 'phosphor-react';
import { useRouter } from 'next/navigation';

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
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          dob,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Something went wrong.');
        return;
      }

      alert('Sign up successful!');
      router.push('/signin');
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20 font-[Inter] px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-[400px] max-w-[90%] text-center animate-fadeIn">
        <h2 className="text-[32px] text-[#0a3d62] mb-8 tracking-wide font-bold">WELCOME</h2>
  
        <form onSubmit={handleSubmit} className="text-left">
          {step === 1 ? (
            <div className="space-y-5">
              <div>
                <label className="block text-[16px] font-medium mb-1 text-black">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-[#f9fcff] text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-300 text-base"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
  
              <div className="relative">
                <label className="block text-[16px] font-medium mb-1 text-black">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-4 py-3 pr-10 rounded-xl border border-blue-200 bg-[#f9fcff] text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-300 text-base"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="absolute right-4 top-[43px] text-gray-500 cursor-pointer hover:text-blue-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </div>
              </div>
  
              <div className="relative">
                <label className="block text-[16px] font-medium mb-1 text-black">Confirm Password</label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="w-full px-4 py-3 pr-10 rounded-xl border border-blue-200 bg-[#f9fcff] text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-300 text-base"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <div
                  className="absolute right-4 top-[43px] text-gray-500 cursor-pointer hover:text-blue-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </div>
              </div>
  
              <button
                type="button"
                onClick={handleNext}
                className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-xl hover:bg-blue-800 transition"
              >
                Next
              </button>
  
              <p className="text-base text-gray-600 text-center">
                Already have an account?{' '}
                <a href="/signin" className="text-blue-600 hover:underline font-medium">
                  Log in
                </a>
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <label className="block text-[16px] font-medium mb-1 text-black">First Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-[#f9fcff] text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-300 text-base"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
  
              <div>
                <label className="block text-[16px] font-medium mb-1 text-black">Last Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-[#f9fcff] text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-300 text-base"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
  
              <div>
                <label className="block text-[16px] font-medium mb-1 text-black">Date of Birth</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-[#f9fcff] text-black focus:outline-none focus:ring-2 focus:ring-blue-300 text-base"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </div>
  
              <button
                type="submit"
                className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-xl hover:bg-blue-800 transition"
              >
                Sign Up
              </button>
  
              <p className="text-base text-gray-600 text-center">
                Already have an account?{' '}
                <a href="/signin" className="text-blue-600 hover:underline font-medium">
                  Log in
                </a>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );   
}
