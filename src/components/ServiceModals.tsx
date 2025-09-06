"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface FormData {
  name: string;
  email: string;
  service: string;
  requirements: string;
  budget: number;
}

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultService?: string | null;
};

const ServiceModals: React.FC<Props> = ({ open, onOpenChange, defaultService = "" }) => {
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    email: "",
    service: defaultService ?? "",
    requirements: "",
    budget: 0,
  });
  const [formError, setFormError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  // Sync defaultService when user opens different item
  React.useEffect(() => {
    setFormData((prev) => ({ ...prev, service: defaultService ?? "" }));
  }, [defaultService]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "budget" ? Number(value) || 0 : value,
    }));
  };

  const validate = (data: FormData) => {
    if (!data.name.trim()) return "Name is required";
    if (!data.email.trim() || !/^\S+@\S+\.\S+$/.test(data.email)) return "Valid email required";
    if (!data.service.trim()) return "Service required";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const err = validate(formData);
    if (err) {
      setFormError(err);
      return;
    }

    setIsSubmitting(true);
    setIsLoading(true);
    try {
      // Replace with real API call
      await new Promise((res) => setTimeout(res, 900));

      // on success:
      setIsSuccess(true);
      // Optionally reset form:
      setFormData({
        name: "",
        email: "",
        service: defaultService ?? "",
        requirements: "",
        budget: 0,
      });
      // Close modal
      onOpenChange(false);
    } catch (error: any) {
      setFormError(error?.message ?? "Something went wrong");
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* If you want an internal trigger, keep DialogTrigger; otherwise Page controls open */}
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Get a Quote</DialogTitle>
          <DialogDescription>
            Fill in the details and we&apos;ll get back to you with a quote.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {formError && <div className="text-sm text-destructive">{formError}</div>}

          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="service">Service</Label>
            <Input id="service" name="service" value={formData.service} onChange={handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea id="requirements" name="requirements" value={formData.requirements} onChange={handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="budget">Budget (₹)</Label>
            <Input id="budget" name="budget" type="number" value={formData.budget} onChange={handleChange} />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting || isLoading}>
              {isSubmitting ? "Submitting..." : "Request Quote"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModals;
