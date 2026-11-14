'use client';
import { useState } from "react";
import TextField from "@/components/text-field";
import TextArea from "@/components/text-area";
import Button from "@/components/button";
import { cn } from "@/lib/utils";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "success" }
  | { state: "error"; message: string };

export default function ContactForm(props: React.HTMLAttributes<HTMLFormElement>) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const isSending = status.state === "sending";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setStatus({ state: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus({ state: "error", message: data.error ?? "Could not send your message. Please try again." });
        return;
      }

      form.reset();
      setStatus({ state: "success" });
    } catch {
      setStatus({ state: "error", message: "Network error. Please check your connection and try again." });
    }
  };

  return (
    <form
      className="flex flex-col w-full gap-5"
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col w-full gap-5">
        <TextField
          id="name"
          name="name"
          label="Name"
          placeholder="Your name"
          autoComplete="name"
          type="text"
          maxLength={100}
          required
        />

        <TextField
          id="email"
          name="email"
          label="Email"
          placeholder="you@example.com"
          autoComplete="email"
          type="email"
          maxLength={254}
          required
        />

        <TextField
          id="subject"
          name="subject"
          label="Subject"
          placeholder="What's this about?"
          type="text"
          maxLength={150}
          required
        />
      </div>
      <div>
        <TextArea
          id="message"
          name="message"
          label="Message"
          rows={6}
          placeholder="Tell me about your project"
          maxLength={5000}
          required
        />
      </div>

      {/* Honeypot: hidden from people, filled by bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p
        role="status"
        aria-live="polite"
        className={cn(
          "text-sm text-center min-h-[1.25rem]",
          status.state === "success" && "text-secondary-400",
          status.state === "error" && "text-red-300"
        )}
      >
        {status.state === "success" && "Thanks! Your message was sent. I'll get back to you soon."}
        {status.state === "error" && status.message}
      </p>

      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={isSending}
          className="w-full md:!w-40 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSending ? "SENDING…" : "SUBMIT"}
        </Button>
      </div>
    </form>
  );
}
