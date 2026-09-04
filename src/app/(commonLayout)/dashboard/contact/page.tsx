"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { toast } from "sonner";
import { FaUser, FaEnvelope, FaPaperPlane } from "react-icons/fa";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Message sent!");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setLoading(false);
  };

  return (
    <div className="max-w-[680px] mx-auto">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-white">Contact us</h1>
        <p className="text-sm text-gray-500">Have a question or feedback? Let us know.</p>
      </div>

      <div className="bg-[#141414]/80 border border-[#2A2A2A] rounded-2xl p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" size={15} />
            <Input
              placeholder="Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-11"
              classNames={{
                inputWrapper: "bg-[#141414] border border-[#2A2A2A] h-12",
                input: "text-white text-sm placeholder-gray-600",
              }}
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600" size={15} />
            <Input
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-11"
              classNames={{
                inputWrapper: "bg-[#141414] border border-[#2A2A2A] h-12",
                input: "text-white text-sm placeholder-gray-600",
              }}
            />
          </div>
        </div>

        <Input
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          classNames={{
            inputWrapper: "bg-[#141414] border border-[#2A2A2A] h-12",
            input: "text-white text-sm placeholder-gray-600",
          }}
        />

        <Textarea
          placeholder="Your message *"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          minRows={4}
          classNames={{
            inputWrapper: "bg-[#141414] border border-[#2A2A2A]",
            input: "text-white text-sm placeholder-gray-600",
          }}
        />

        <div className="flex justify-end pt-2">
          <Button
            className="bg-[#141414] text-white font-semibold text-sm px-6"
            isLoading={isLoading}
            onClick={handleSubmit}
            disabled={isLoading}
            startContent={!isLoading && <FaPaperPlane size={14} />}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
