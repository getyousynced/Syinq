"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export function ContactForm() {
  const [agreed, setAgreed] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Add your form submission logic here
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-8 bg-black inline-block text-transparent bg-clip-text mt-12">
          Get in touch
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input 
            id="firstName" 
            name="firstName" 
            placeholder="John"
            className="p-6"
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input 
            id="lastName" 
            name="lastName" 
            placeholder="Doe"
            className="p-6"
            required 
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          className="p-6"
          placeholder="john.doe@example.com"
          required 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Your message</Label>
        <Textarea
          id="message"
          name="message"
          className="min-h-[150px] p-6"
          placeholder="Write your message here..."
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="terms"
          checked={agreed}
          onCheckedChange={setAgreed}
        />
        <Label htmlFor="terms" className="text-sm">
          I agree to the Terms and Conditions
        </Label>
      </div>
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700"
        disabled={!agreed}
      >
        SEND MESSAGE
      </Button>
    </form>
  )
}

