import { useState } from "react";
import { sendContactMessage } from "../api/contact";
import { Instagram, Facebook, Mail, Youtube } from "lucide-react";
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
    <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
      {/* Header */}
      <h1 className="text-3xl font-semibold text-gray-900">Contact</h1>
      <p className="mt-2 text-gray-600">
        For bookings, collaborations, or press inquiries, send us a message.
      </p>

      {/* Mini info strip */}
      <div className="
                mt-6 mx-auto w-full max-w-4xl
                rounded-2xl border border-black/10 bg-white/30 px-6 py-4 text-sm text-gray-700 shadow-sm
                flex flex-col items-center gap-2
                md:flex-row md:items-center md:gap-x-6 md:gap-y-0">
        <span className="font-medium text-gray-900">Contact Erinys Quartet</span>

        <span>
          <span className="font-medium px-2">Email:</span>{" "}
          <a
            className="underline underline-offset-4 hover:text-gray-900 transition"
            href="mailto:erinysquartet@gmail.com"
          >
            erinysquartet@gmail.com
          </a>
        </span>

        <span>
          <span className="font-medium px-2">Based in:</span> Indianopolis, USA
        </span>

        <div className="mt-1 flex items-center gap-1 md:mt-0 ">
          <span className="font-medium px-2">Socials:</span>
          <a
              href="https://www.instagram.com/erinysquartet"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-[#ede6df] transition"
              aria-label="Instagram"
            >
              <Instagram size={28} />
            </a>

            <a
              href="https://facebook.com/erinysquartet"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-[#ede6df] transition"
              aria-label="Facebook"
            >
              <Facebook size={28} />
            </a>

            <a
              href="https://www.youtube.com/@erinysquartet"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-[#ede6df] transition"
              aria-label="YouTube"
            >
              <Youtube size={28} />
            </a>
        </div>
      </div>
      

      {/* Form card */}
      <div className="mt-10 max-w-2xl mx-auto rounded-3xl border border border-black/10 bg-white/30 p-6 shadow-sm backdrop-blur-md sm:p-8">
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
            className="mt-5 w-fit rounded-xl border border-gray-900 bg-white/60 px-6 py-3 text-sm font-medium text-gray-900
                      transition hover:bg-gray-900 hover:text-white disabled:opacity-50"
          >
            {status.state === "sending" ? "Sending..." : "Submit"}
          </button>

          {status.msg && (
            <p className={`mt-3 text-sm ${statusStyles[status.state] ?? "text-gray-500"}`}>
              {status.msg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}