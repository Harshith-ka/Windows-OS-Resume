import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Send, Paperclip, Trash2, Star } from "lucide-react";
import { toast } from "sonner";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactSectionMail = () => {
  const [isSending, setIsSending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Contact form:", data);
    toast.success("Message sent! I'll get back to you soon.");
    reset();
    setIsSending(false);
  };

  return (
    <div className="h-full flex bg-background">
      {/* Mail Sidebar */}
      <div className="w-48 border-r border-border bg-muted/20 p-2">
        <button className="w-full flex items-center gap-2 px-3 py-2 bg-win-blue text-white rounded-lg mb-2">
          <Send className="w-4 h-4" />
          <span className="text-sm font-medium">New Message</span>
        </button>
        <div className="space-y-1">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-muted/50">
            <Mail className="w-4 h-4 text-text-secondary" />
            <span className="text-sm">Inbox</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-muted/50">
            <Star className="w-4 h-4 text-text-secondary" />
            <span className="text-sm">Starred</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-muted/50">
            <Send className="w-4 h-4 text-text-secondary" />
            <span className="text-sm">Sent</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-muted/50">
            <Trash2 className="w-4 h-4 text-text-secondary" />
            <span className="text-sm">Trash</span>
          </button>
        </div>
      </div>

      {/* Compose Area */}
      <div className="flex-1 flex flex-col">
        {/* Mail Header */}
        <div className="px-6 py-3 border-b border-border bg-window-title">
          <h1 className="text-lg font-semibold text-text-primary">Compose Message</h1>
        </div>

        {/* Mail Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col p-6 space-y-4">
          {/* To Field */}
          <div>
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <label className="text-sm font-medium text-text-secondary w-16">To:</label>
              <input
                type="text"
                value="john.doe@example.com"
                disabled
                className="flex-1 bg-transparent text-sm text-text-muted outline-none"
              />
            </div>
          </div>

          {/* From Field */}
          <div>
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <label className="text-sm font-medium text-text-secondary w-16">From:</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
                type="email"
                placeholder="your.email@example.com"
                className="flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
              />
            </div>
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
          </div>

          {/* Name Field */}
          <div>
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <label className="text-sm font-medium text-text-secondary w-16">Name:</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Your Name"
                className="flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
              />
            </div>
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
          </div>

          {/* Subject Field */}
          <div>
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <label className="text-sm font-medium text-text-secondary w-16">Subject:</label>
              <input
                {...register("subject", { required: "Subject is required" })}
                type="text"
                placeholder="Message subject"
                className="flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
              />
            </div>
            {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject.message}</p>}
          </div>

          {/* Message Body */}
          <div className="flex-1 flex flex-col">
            <textarea
              {...register("message", { required: "Message is required" })}
              placeholder="Write your message here..."
              className="flex-1 bg-transparent text-sm text-text-primary outline-none resize-none placeholder:text-text-muted p-3 border border-border rounded-lg"
            />
            {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
          </div>

          {/* Mail Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <button
              type="submit"
              disabled={isSending}
              className="flex items-center gap-2 px-6 py-2 bg-win-blue text-white rounded-lg hover:bg-win-blue-dark transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSending ? "Sending..." : "Send"}</span>
            </button>
            <button type="button" className="p-2 rounded hover:bg-muted/50 transition-colors">
              <Paperclip className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
