'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export function ContactForm() {
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    // Validate the email using a regular expression or a built-in method
    const emailValue = formData.get('email') as string
    const emailPattern = /^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(emailValue)) {
      alert('Please enter a valid email address.')
      return
    }

    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: emailValue,
      message: formData.get('message'),
    }

    console.log('Form submitted:', data)
    alert('Message sent successfully!')
    event.currentTarget.reset()
    setAgreedToTerms(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="First Name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        {/* Use HTML email validation with type="email" and an optional pattern attribute */}
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email Address"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Your message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us..."
          className="min-h-[150px]"
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="terms"
          checked={agreedToTerms}
          onCheckedChange={setAgreedToTerms}
        />
        <Label htmlFor="terms" className="text-sm">
          I agree to the{" "}
          <a href="/terms" className="text-blue-600 hover:underline">
            Terms and Conditions
          </a>
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-[#005884] to-[#00324D] text-white hover:opacity-90"
        disabled={!agreedToTerms}
      >
        Send Message
      </Button>
    </form>
  )
}