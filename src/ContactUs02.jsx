import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Phone,
  MessageCircle,
  Mail,
  FileText,
  ChevronDown,
  MapPin,
  ExternalLink,
  Plus,
  Minus
} from 'lucide-react';
import Navbar from './Navbar';

export default function ContactUs02({ onNavigate, showNavbar = true }) {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    service: '',
    location: '',
    message: ''
  });

  const quickConnects = [
    {
      title: "Call Us",
      sub: "Speak directly with our experts.",
      actionText: "+91 98765 43210",
      icon: Phone
    },
    {
      title: "WhatsApp",
      sub: "Chat with us on WhatsApp.",
      actionText: "Chat Now",
      icon: MessageCircle
    },
    {
      title: "Email Us",
      sub: "Drop us an email anytime.",
      actionText: "Send Email",
      icon: Mail
    },
    {
      title: "Request Quote",
      sub: "Get a customized quote for your project.",
      actionText: "Request Now",
      icon: FileText
    }
  ];

  return (
    <div className="h-full w-full font-['Poppins'] antialiased text-slate-900 flex flex-col justify-between overflow-hidden selection:bg-purple-600 selection:text-white">
      
      {showNavbar && <Navbar activePage="Contact Us" onNavigate={onNavigate} />}

      {/* MAIN FLOATING CONTAINER */}
      <main className="flex-1 flex flex-col justify-between max-w-[1440px] w-full mx-auto bg-white rounded-[2rem] p-4 sm:p-5 lg:p-6 neu-lg border border-white/80 min-h-0 overflow-hidden">
        
        {/* TOP SECTION: Left Form Box ("Send Us a Message") + Right Map Box ("Our Location") */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-0 my-auto">
          
          {/* Left Column: Form Box */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <h2 className="text-lg sm:text-xl font-[800] text-slate-900 tracking-tight mb-2">
              Send Us a Message
            </h2>

            <form onSubmit={(e) => e.preventDefault()} className="flex-1 flex flex-col justify-between gap-2.5">
              
              {/* Row 1: Full Name & Company Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <label className="text-[11px] font-[600] text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#F6F7FB] neu-inset rounded-xl px-3.5 py-2 text-xs font-[400] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[11px] font-[600] text-slate-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter company name"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-[#F6F7FB] neu-inset rounded-xl px-3.5 py-2 text-xs font-[400] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
                  />
                </div>
              </div>

              {/* Row 2: Email Address & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <label className="text-[11px] font-[600] text-slate-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F6F7FB] neu-inset rounded-xl px-3.5 py-2 text-xs font-[400] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[11px] font-[600] text-slate-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#F6F7FB] neu-inset rounded-xl px-3.5 py-2 text-xs font-[400] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
                  />
                </div>
              </div>

              {/* Row 3: Service Required & Project Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col relative">
                  <label className="text-[11px] font-[600] text-slate-700 mb-1">
                    Service Required <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#F6F7FB] neu-inset rounded-xl px-3.5 py-2 text-xs font-[400] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-400 appearance-none pr-8 cursor-pointer"
                    >
                      <option value="">Select a service</option>
                      <option value="vdf">VDF Flooring</option>
                      <option value="laser">FM2 Laser Concrete Flooring</option>
                      <option value="epoxy">Epoxy Flooring</option>
                      <option value="repair">Concrete Repair & Restoration</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[11px] font-[600] text-slate-700 mb-1">
                    Project Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter project location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-[#F6F7FB] neu-inset rounded-xl px-3.5 py-2 text-xs font-[400] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
                  />
                </div>
              </div>

              {/* Row 4: Message Textarea */}
              <div className="flex flex-col">
                <label className="text-[11px] font-[600] text-slate-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="3"
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#F6F7FB] neu-inset rounded-xl p-3 text-xs font-[400] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-400 resize-none"
                />
              </div>

              {/* Submit Row: Send Message Button + Privacy Note */}
              <div className="flex items-center gap-4 pt-1">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 text-white text-xs font-[600] px-6 py-3 rounded-xl neu-btn-primary cursor-pointer shrink-0"
                >
                  <span>Send Message</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2 text-slate-500">
                  <ShieldCheck className="w-5 h-5 text-purple-600 shrink-0" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-[10px] font-[600] text-slate-700">We respect your privacy.</span>
                    <span className="text-[9px] font-[400] text-slate-400">Your information is safe with us.</span>
                  </div>
                </div>
              </div>

            </form>
          </div>

          {/* Right Column: Map Box ("Our Location") */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <h2 className="text-lg sm:text-xl font-[800] text-slate-900 tracking-tight mb-2">
              Our Location
            </h2>

            {/* Interactive Styled Map View Box */}
            <div className="relative flex-1 rounded-2xl overflow-hidden bg-slate-100 neu-md border border-slate-100 min-h-[260px] flex items-center justify-center">
              
              {/* Map Canvas Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop')` }}
              />

              {/* Subtle Map Overlay Tint */}
              <div className="absolute inset-0 bg-slate-100/60 backdrop-blur-[1px]" />

              {/* Floating Address Card (Top Left of Map) */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 neu-md border border-white max-w-[240px] shadow-lg z-10">
                <h3 className="text-xs font-[800] text-slate-900 mb-1">
                  ASVDF Flooring Pvt. Ltd.
                </h3>
                <p className="text-[10px] font-[400] text-slate-500 leading-snug mb-2">
                  Plot No. 123, Industrial Area, Phase 2, Chakan, Pune – 410501, Maharashtra, India
                </p>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-1 text-[10px] font-[600] text-[#7C3AED] hover:underline"
                >
                  <span>View on Google Maps</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              {/* Red Map Pin Icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-white flex items-center justify-center shadow-lg animate-bounce">
                  <MapPin className="w-4 h-4 fill-white text-red-600" />
                </div>
              </div>

              {/* Zoom Controls (Bottom Right) */}
              <div className="absolute bottom-4 right-4 bg-white neu-sm rounded-xl flex flex-col overflow-hidden border border-slate-100 z-10">
                <button className="w-7 h-7 flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer">
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <div className="w-full h-[1px] bg-slate-100" />
                <button className="w-7 h-7 flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer">
                  <Minus className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: QUICK WAYS TO CONNECT (4 Cards Grid) */}
        <div className="shrink-0 bg-[#F6F7FB] rounded-2xl p-3.5 sm:p-4 neu-sm border border-white mt-3">
          <div className="flex flex-col items-center mb-2.5">
            <h3 className="text-sm font-[800] text-slate-900 tracking-tight">
              Quick Ways to Connect
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {quickConnects.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#FFFFFF] rounded-2xl p-3 neu-sm border border-slate-100 flex items-center gap-3 cursor-pointer"
                >
                  {/* Circular Inset Icon Badge */}
                  <div className="w-10 h-10 rounded-full bg-[#F6F7FB] neu-inset flex items-center justify-center text-[#7C3AED] shrink-0">
                    <IconComp className="w-4 h-4" />
                  </div>

                  {/* Text Details */}
                  <div className="flex flex-col">
                    <h4 className="text-xs font-[700] text-slate-900 leading-tight">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-[400] text-slate-400 leading-tight mb-1">
                      {item.sub}
                    </span>
                    <span className="text-[10.5px] font-[600] text-[#7C3AED] inline-flex items-center gap-1">
                      {item.actionText} <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
}
