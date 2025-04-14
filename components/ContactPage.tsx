"use client";
import axios from "axios";
import { useState } from "react";
import { FaRegComments, FaEnvelope, FaTwitter, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  services: string[];
}

const SERVICES = [
  "Website design", "Content creation", "UX design",
  "Strategy & consulting", "User research", "Other"
];

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    services: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (service: string) => {
    setForm((prevForm) => {
      const updatedServices = prevForm.services.includes(service)
        ? prevForm.services.filter((s) => s !== service)
        : [...prevForm.services, service];
      return { ...prevForm, services: updatedServices };
    });
  };
  
  /*
  id                   String       @unique @default(uuid())
  createdAt            DateTime     @default(now())
  firstName            String
  lastName             String
  email                String
  phoneNumber          String
  message              String
  services  
  */

  const submitFeedback = async() => {
    if(form.firstName.length > 0 && form.lastName.length > 0 && form.email.length > 0 && form.phone.length > 0 && form.message.length > 0) {
      const res = await axios.post('/api/feedback', form)
      if(res.data?.message) {
        alert(res.data.message)
      }
      else {
        alert('Something went wrong, please try again')
        console.log(res.data.error);
        
      }
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        services: [],
      });
    }
    else {
      alert('Please fill all the details')
    }
  }
 

  return (
    <div className="relative flex flex-col items-center px-6 py-12 md:px-24 lg:px-40 rounded-lg shadow-lg">
      {/* Grid Background */}
      <div className="absolute inset-0 -z-10 bg-white bg-grid-small [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0.2),rgba(0,0,0,0))]"></div>
      
      <h1 className="text-4xl font-bold text-center text-gray-900">Contact our team</h1>
      <p className="text-center text-gray-700 mt-2 max-w-2xl">
        Got any questions about the product or scaling on our platform? We’re here to help.
        Chat to our friendly team 24/7 and get onboard in less than 5 minutes.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 w-full">
        <div className="flex flex-col space-y-4 bg-white p-8 rounded-lg shadow-md border border-gray-200 text-black">
          <div className="grid grid-cols-2 gap-4">
            <input name="firstName" value={form.firstName} placeholder="First name" className="p-3 border rounded-lg w-full" onChange={handleChange} />
            <input name="lastName" value={form.lastName} placeholder="Last name" className="p-3 border rounded-lg w-full" onChange={handleChange} />
          </div>
          <input name="email" value={form.email} placeholder="you@company.com" type="email"  className="p-3 border rounded-lg w-full" onChange={handleChange} />
          <input name="phone" value={form.phone} placeholder="Phone number" className="p-3 border rounded-lg w-full" onChange={handleChange} />
          <textarea name="message" value={form.message} placeholder="Leave us a message..." className="p-3 border rounded-lg w-full h-24" onChange={handleChange}></textarea>
          <div className="grid grid-cols-2 gap-4">
            {SERVICES.map((service) => (
              <label key={service} className="flex items-center space-x-2">
                <input type="checkbox" onChange={() => handleServiceChange(service)} checked={form.services.includes(service)} className="h-5 w-5" />
                <span>{service}</span>
              </label>
            ))}
          </div>
          <button 
            onClick={(e)=> {
              e.preventDefault();
              submitFeedback()
            }}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">Send message</button>
        </div>
        
        <div className="space-y-6 text-gray-800 bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <div>
            <h2 className="font-semibold text-lg">Chat with us</h2>
            <p className="text-sm text-gray-600">Speak to our friendly team via live chat.</p>
            <div className="flex flex-col space-y-2 mt-2">
              <a className="flex items-center space-x-2 text-blue-600 hover:underline">
                <FaRegComments /> <span>Start a live chat</span>
              </a>
              <a className="flex items-center space-x-2 text-blue-600 hover:underline">
                <FaEnvelope /> <span>Shoot us an email</span>
              </a>
              <a className="flex items-center space-x-2 text-blue-600 hover:underline">
                <FaTwitter /> <span>Message us on X</span>
              </a>
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Call us</h2>
            <p className="text-sm text-gray-600">Call our team Mon-Fri from 8am to 5pm.</p>
            <p className="flex items-center space-x-2 mt-2 text-gray-900">
              <FaPhone /> <span>+1 (555) 000-0000</span>
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Visit us</h2>
            <p className="flex items-center space-x-2 mt-2 text-gray-900">
              <FaMapMarkerAlt /> <span>100 Smith Street, Collingwood VIC 3066</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
