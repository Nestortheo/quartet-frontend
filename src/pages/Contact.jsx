import { useState } from "react";
import { sendContactMessage } from "../api/contact";
import { Instagram, Facebook, Mail, Youtube, MapPin, Share2, ArrowRight } from "lucide-react";
//import contactHeroImg from '../assets/_C0A6131.jpg'

export default function Contact() {

  const [form, setForm] = useState({
    name:"",
    email:"",
    subject:"",
    message:"",
    company:""
  });
  const [status, setStatus] = useState({ state: "idle", msg: "" });
  
  function handleChange(e){
    const {name,value} = e.target
    setForm((prev) => ({...prev, [name] : value}))
    
  }
  //This is for the color of message 
 const statusStyles = {
  success: "text-[#3a3a3a]",
  error: "text-red-600",
  sending: "text-gray-500",
};
  //Validation Before submitting
  const validateForm = () => {
    if(!form.name.trim()) return "Name must be provided."
    if(!form.email.trim()) return "Email must be provided."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            return "Invalid email address!";
    if(!form.subject.trim()) return "Subject must be provided."
    if (!form.message.trim() || form.message.trim().length < 10)
            return "Please enter at least 10 characters";
    return null; //no errors
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    const validationError = validateForm();
    if(validationError){
      setStatus({state:"error", msg:validationError})
      return;
    }

    setStatus({ state: "sending", msg: "" });

    try {
      await sendContactMessage(form);

      setStatus({
        state: "success",
        msg: "Message sent! We’ll get back to you soon.",
      });

      setForm({ name: "", email: "", subject: "", message: "" });
    } 
    catch (err) {
      const msg =
        err.response?.data?.detail ||
        err.message ||
        "Failed to send message.";

      setStatus({ state: "error", msg });
    }
}


  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:py-16 mt-16">
      <div className="
            flex flex-col md:flex-row gap-4   
          "
      >
        {/*LEFT*/}
        <div className="
              w-full
              md:w-2/5 
              mt-10 
              flex
              flex-col
              gap-8
            "
        >
            <h2 className="text-sm text-yellow-700 font-semibold">CONTACT</h2>
            <div className="w-10 h-px border border-yellow-700"/>
            <p className="text-5xl font-serif ">
              Get in Touch
            </p>
            <p className="text-neutral-700 w-full md:max-w-sm">
              For bookings, collaborations, or press inquiries,
              feel free to send us a message.
            </p>
            {/*Socials*/}
            <div className="flex flex-col gap-8">
                {/*EMAIL*/}
                <div className="flex gap-4">
                    
                    <span className="w-15 h-15 bg-yellow-700/10 rounded-full flex items-center justify-center ">
                      <Mail size={24}/>
                    </span>
                    <div className="flex flex-col">
                        <p className="text-yellow-700 font-semibold">Email</p>
                        <p>erinysquartet@gmail.com</p>

                    </div>

              </div>
              {/*MapPin*/}
              <div className="flex gap-4">                           
                  <span className="w-15 h-15 bg-yellow-700/10 rounded-full flex items-center justify-center">
                      <MapPin size={24}/>
                  </span>
                  <div className="flex flex-col">
                    <p className="text-yellow-700 font-semibold">Based in</p>
                    <p>Indianopolis, USA</p>
                  </div>
                  
              </div>

              {/*Share*/}
              <div className="flex gap-4">
                <span className="w-15 h-15 bg-yellow-700/10 rounded-full flex items-center justify-center">
                    <Share2 />
                </span>
                <div>
                    <p className="text-yellow-700 font-semibold">Follow us</p>
                    <p className="w-full max-w-[280px]">
                      Stay connected for updates,
                      news, and upcoming concerts.
                    </p>
                </div>
              </div>
              {/*Social Icons*/}
                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 w-full">
                    <a 
                      href="https://www.instagram.com/erinysquartet/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-yellow-700 transition-colors duration-300"
                    >
                        <Instagram size={22}/>
                        <p>Instagram</p>
                    </a>
                    <div className="hidden md:block w-px h-5 bg-yellow-700/60" />
                    
                    <a
                      href="https://www.facebook.com/erinysquartet/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-yellow-700 transition-colors duration-300"
                    >
                        <Facebook />
                        <p>Facebook</p>
                        
                    </a>
                    <div className="hidden md:block w-px h-5 bg-yellow-700/60" />

                    <a
                      href="https://www.youtube.com/@erinysquartet" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-yellow-700 transition-colors duration-300"
                    >
                        <Youtube />
                        <p>Youtube</p>
                    </a>
                    
                </div>
              
            </div>
        </div>
      
        {/*RIGHT*/}
        <div className="md:w-3/5 mt-10 w-full max-w-xl mx-auto">
        {/* Form card */}
          <div className="rounded-3xl border border border-black/10 bg-white/30 p-6 shadow-sm backdrop-blur-md sm:p-8">
            <h2 className="text-xl font-semibold text-gray-900">Send a message</h2>
            <p className="mt-1 text-sm text-gray-600">
              We usually reply within a few days.
            </p>

            <form onSubmit={handleSubmit} className="mt-6">
              <div className="grid gap-4">
                {/* Honeypot */}
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-black/20 bg-white/70 px-3 py-2 outline-none transition focus:border-black/40 focus:ring-2 focus:ring-black/10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-black/20 bg-white/70 px-3 py-2 outline-none transition focus:border-black/40 focus:ring-2 focus:ring-black/10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Subject
                  </label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-black/20 bg-white/70 px-3 py-2 outline-none transition focus:border-black/40 focus:ring-2 focus:ring-black/10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    rows={6}
                    className="w-full rounded-xl border border-black/20 bg-white/70 px-3 py-2 outline-none transition focus:border-black/40 focus:ring-2 focus:ring-black/10"
                  />
                </div>
              </div>

              <button
                disabled={status.state === "sending"}
                className="mt-5 w-fit rounded-xl bg-yellow-700/90 px-6 py-3 text-sm font-medium text-gray-900
                          transition hover:bg-yellow-700 hover:text-white hover:scale-[1.02] disabled:opacity-50"
              >
                <div className="flex gap-2 items-center text-white">
                  {status.state === "sending" ? "Sending..." : "Send Message"}
                  <ArrowRight />
                </div>
              </button>

              {status.msg && (
                <p className={`mt-3 text-sm ${statusStyles[status.state] ?? "text-gray-500"}`}>
                  {status.msg}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}