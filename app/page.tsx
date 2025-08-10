"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, MessageCircle, Upload, Car, Shield, Clock } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    carModel: "",
    partName: "",
    description: "",
    urgency: "",
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const sendToWhatsApp = () => {
    const { name, phone, carModel, partName, description, urgency } = formData

    if (!name || !phone || !partName) {
      alert("कृपया सभी आवश्यक फील्ड भरें")
      return
    }

    let message = `🚗 *नया स्पेयर पार्ट्स इंक्वायरी*\n\n`
    message += `👤 *नाम:* ${name}\n`
    message += `📱 *फोन:* ${phone}\n`
    message += `🚙 *कार मॉडल:* ${carModel || "नहीं बताया"}\n`
    message += `🔧 *पार्ट का नाम:* ${partName}\n`
    message += `📝 *विवरण:* ${description || "कोई अतिरिक्त जानकारी नहीं"}\n`
    message += `⚡ *जरूरत:* ${urgency || "सामान्य"}\n\n`

    if (selectedImage) {
      message += `📷 *इमेज:* ग्राहक ने इमेज भेजी है\n\n`
    }

    message += `कृपया जल्दी रिप्लाई करें। धन्यवाद! 🙏`

    // Replace with your WhatsApp number (with country code, without +)
    const whatsappNumber = "919586126346" // आपका WhatsApp नंबर यहां डालें
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")

    // Reset form
    setFormData({
      name: "",
      phone: "",
      carModel: "",
      partName: "",
      description: "",
      urgency: "",
    })
    setSelectedImage(null)
    setImagePreview(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Car className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ZMiniAutoHub</h1>
                <p className="text-sm text-gray-600">All Genuine Parts</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-blue-600">
              <Phone className="h-5 w-5" />
              <span className="font-semibold">+91 9586126346</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            सभी गाड़ियों के <span className="text-blue-600">Original Parts</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            आपकी गाड़ी के लिए genuine spare parts की तलाश है? हमसे संपर्क करें और तुरंत quotation पाएं।
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">100% Genuine Parts</h3>
              <p className="text-gray-600">सभी parts original और warranty के साथ</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">24-48 घंटे में delivery</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <MessageCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">WhatsApp Support</h3>
              <p className="text-gray-600">Direct WhatsApp पर instant reply</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="text-center bg-blue-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl">पार्ट्स की जानकारी भेजें</CardTitle>
              <CardDescription className="text-blue-100">
                अपनी requirement भरें और instant WhatsApp पर quotation पाएं
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Personal Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">आपका नाम *</Label>
                  <Input
                    id="name"
                    placeholder="अपना नाम लिखें"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">मोबाइल नंबर *</Label>
                  <Input
                    id="phone"
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="carModel">कार मॉडल</Label>
                  <Input
                    id="carModel"
                    placeholder="जैसे: Maruti Swift, Hyundai i20"
                    value={formData.carModel}
                    onChange={(e) => handleInputChange("carModel", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="urgency">कितनी जल्दी चाहिए?</Label>
                  <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="समय चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">तुरंत चाहिए (1-2 दिन)</SelectItem>
                      <SelectItem value="normal">सामान्य (3-5 दिन)</SelectItem>
                      <SelectItem value="flexible">कोई जल्दी नहीं</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Part Details */}
              <div className="space-y-2">
                <Label htmlFor="partName">पार्ट का नाम *</Label>
                <Input
                  id="partName"
                  placeholder="जैसे: Brake Pad, Engine Oil, Headlight"
                  value={formData.partName}
                  onChange={(e) => handleInputChange("partName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">अतिरिक्त जानकारी</Label>
                <Textarea
                  id="description"
                  placeholder="कोई specific requirement या part number हो तो लिखें..."
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image">पार्ट की फोटो (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="hidden" />
                  <label htmlFor="image" className="cursor-pointer">
                    {imagePreview ? (
                      <div className="space-y-2">
                        <Image
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          width={200}
                          height={200}
                          className="mx-auto rounded-lg object-cover"
                        />
                        <p className="text-sm text-gray-600">फोटो अपलोड हो गई</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                        <p className="text-gray-600">फोटो अपलोड करने के लिए क्लिक करें</p>
                        <p className="text-sm text-gray-500">JPG, PNG files supported</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={sendToWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
                size="lg"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp पर भेजें
              </Button>

              <p className="text-sm text-gray-500 text-center">* आवश्यक फील्ड हैं। आपकी जानकारी सुरक्षित रहेगी।</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Car className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">AutoParts Pro</h3>
          </div>
          <p className="text-gray-400 mb-4">सभी प्रकार की गाड़ियों के लिए genuine spare parts का trusted supplier</p>
          <div className="flex items-center justify-center space-x-6 text-sm">
            <span>📍 Delhi, Mumbai, Bangalore</span>
            <span>📞 +91 98765 43210</span>
            <span>✉️ info@autopartspro.com</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
