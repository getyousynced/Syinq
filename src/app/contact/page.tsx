import { ContactForm } from "@/components/ContactForm"

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <div 
        className="relative h-[250px]"
        style={{
          backgroundImage: "url('/assets/Mask Group.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'bottom'
        }}
      >
      </div>
      
      <div className="flex-1 bg-white">
        <div className="px-4 md:px-6 max-w-6xl mx-auto text-center pt-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Got questions or <span className="text-[#4CC4FF]">feedback?</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 text-gray-700">
            We&apos;d love to hear from you! Reach out to us for support, suggestions, or inquiries.
          </p>
          
        </div>

        {/* Form Section */}
        <div className="w-full bg-[url('/assets/back-c.jpg')] bg-cover bg-center bg-no-repeat py-12">
          <div className="max-w-3xl mx-auto px-4 relative min-h-[600px]">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">
              Get in touch
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  )
}

