import { useState } from "react";
import { sendContactMessage } from "../api/contact";
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
  success: "text-green-600",
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


  return(
    <div className="mx-auto max-w-5xl">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <p className="mt-2 text-gray-600">
        For bookings, collaborations, or press inquiries, send us a message.
      </p>
    {/* Info */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium">Erinys Quartet</h2>
          <div className="mt-4 space-y-3 text-sm text-gray-700">
            <p>
              <span className="font-medium">Email:</span>{" "}
              <a className="underline" href="mailto:erinysquartet@gmail.com">
                erinysquartet@gmail.com
              </a>
            </p>
            <p>
              <span className="font-medium">Based in:</span> Thessaloniki, Greece
            </p>
            <p>
              <span className="font-medium">Instagram:</span>{" "}
              <a className="underline" href="https://www.instagram.com/erinysquartet" target="_blank" rel="noreferrer">
                @erinysquartet
              </a>
            </p>
          </div>

          <div className="mt-6 rounded-xl bg-gray-50 p-4 text-xs text-gray-600">
            Tip: Keep this block simple now — you can add a booking PDF / EPK link later.
          </div>
        </div>
      {/* Form */}
      <form  onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid gap-3">

            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
            />

            <label className="text-sm font-medium">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-300 px-3 py-2"
            />

            <label className="text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange = {handleChange}
              required
              className="rounded-xl border border-gray-300 px-3 py-2"
            />

            <label className="text-sm font-medium">Subject</label>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-300 px-3 py-2"
            />

            <label className="text-sm font-medium">Message</label>
            <textarea
               name="message"
              value={form.message}
              onChange={handleChange}
              required
              minLength={10}
              rows={6}
              className="rounded-xl border border-gray-300 px-3 py-2"
            />
        </div>
        <button 
          disabled={status.state ==="sending"}
          className="mt-2 w-fit rounded-xl border border-gray-900 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white disabled:opacity-50"
        >
          {status.state ==="sending" ? "Sending..." : "Submit"}
        </button>

        {status.msg && (
          <p className={`text-sm ${statusStyles[status.state] ?? "text-gray-500"}`}>
            {status.msg}
          </p>
        )}
      </form>
    </div>
  );
}