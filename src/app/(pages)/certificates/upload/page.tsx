"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.currentTarget;
    const formData = {
      title:
        (target.elements.namedItem("title") as HTMLInputElement)?.value || "",
      description:
        (target.elements.namedItem("description") as HTMLInputElement)?.value ||
        "",
      image:
        (target.elements.namedItem("image") as HTMLInputElement)?.value || "",
      date:
        (target.elements.namedItem("date") as HTMLInputElement)?.value || "",
    };
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSubmitted(true);
      } else {
        const data = await Response.json({
          error: "Failed to submit form",
          status: res.status,
        });
        toast("Failed to add certificate");
        setError("Something went wrong");
        console.log(data);
      }
    } catch (error) {
      setError("Something went wrong");
      toast("Internal Server Error, Something went wrong");
      console.log(error);
    }
  };

  return <div>Upload Certificates Page</div>;
};
