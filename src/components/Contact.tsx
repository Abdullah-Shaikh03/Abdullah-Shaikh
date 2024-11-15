"use client";
import React, { useState } from "react";
import AlertDemo from "@/components/Alert";
import Error from "@/components/Alert";


export const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    contact: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await fetch("/api/sendMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (resp.ok) {
        alert("Mail Sent, I will get back to you shortly.")
        setFormData({
          email: "",
          name: "",
          contact: "",
          subject: "",
          message: "",
        });
      } else {
       alert("Message not sent, code:"+ resp.status)
      }
    } catch (e) {
      alert("error sending email")
    }
    console.log(formData);
  };

  return (
    <form className="form mb-4 shadow-xl" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 px-2 py-2 rounded-md text-sm text-neutral-700 w-full"
          onChange={handleChange}
          value={formData.name}
        />
        <input
          type="text"
          name="contact"
          placeholder="Your Contact Number"
          className="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 px-2 py-2 rounded-md text-sm text-neutral-700 w-full"
          onChange={handleChange}
          value={formData.contact}
        />
      </div>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 px-2 py-2 rounded-md text-sm text-neutral-700 w-full my-6"
        onChange={handleChange}
        value={formData.email}
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        className="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 px-2 py-2 rounded-md text-sm text-neutral-700 w-full mb-2"
        onChange={handleChange}
        value={formData.subject}
      />
      <div>
        <textarea
          name="message"
          placeholder="Your Message"
          rows={8}
          className="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 px-2 mt-4 py-2 rounded-md text-sm text-neutral-700 w-full"
          onChange={handleChange}
          value={formData.message}
        />
      </div>
      <button
        className="w-full px-2 py-2 mt-4 bg-neutral-100 rounded-md font-bold text-neutral-500"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};