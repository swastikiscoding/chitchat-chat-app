import React from 'react'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { User, Mail, Lock, Loader, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import {Link} from 'react-router-dom'


const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  const { signup, isSigningUp } = useAuthStore()

  const validateForm = () => {
    if(!formData.fullName.trim()) return toast.error('fullname is required')
    if(!formData.email.trim()) return toast.error('email is required')
    if(!formData.password.trim()) return toast.error('email is required')
    if(formData.password.length < 6) return toast.error('password must be at least 6 characters');

    return true
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData)
    const success = validateForm()
    console.log("success: ",success)
    if(success) signup(formData)
  }
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-6 space-y-4 bg-slate-900 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-400">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="fullName"
                placeholder="John doe"
                value={formData.fullName}
                onChange={handleChange}
                className="input input-bordered pl-10 w-full"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered pl-10 w-full"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="************"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered pl-10 w-full"
                required
              />
            </div>
          </div>

         
          <button type="submit" className="btn btn-primary w-full" disabled= {isSigningUp}>
            {isSigningUp? (
              <>
              <Loader2 className='size-5, animate-spin'/>
              Loading
              </>
            ): "Create an Account"}
          </button>
        </form>
        <div>
          Already have an account? <Link className='text-blue-400' to = {'/login'}>Login Here</Link>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage