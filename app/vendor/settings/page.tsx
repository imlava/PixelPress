"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Settings,
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Globe,
  Wallet,
  BellRing,
  Shield,
  Users,
  HelpCircle,
  Check,
  Printer,
  Trash2,
  Save,
  AlertTriangle,
  Clock,
} from "lucide-react"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  
  // Mock data for demonstration
  const vendorData = {
    storeName: "PixelPress Indiranagar",
    storeDescription: "Premier printing services for businesses and individuals",
    email: "indiranagar@pixelpress.ink",
    phone: "+91 98765 43210",
    address: "123 MG Road, Indiranagar, Bangalore - 560038",
    website: "https://pixelpress.ink",
    operatingHours: "Mon-Sat: 9:00 AM - 8:00 PM, Sun: Closed",
    taxId: "GSTIN: 29AABCU9603R1ZX",
  }
  
  const [formData, setFormData] = useState(vendorData)
  
  // Initialize form
  const form = useForm({
    defaultValues: vendorData
  })
  
  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    })
  }
  
  const saveChanges = () => {
    // In a real application, this would save to the backend
    console.log("Saving changes:", formData)
    // Display success message or handle errors
  }
  
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your store preferences and account settings
          </p>
        </div>
        <Button onClick={saveChanges}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 h-auto p-1 md:w-fit w-full">
          <TabsTrigger value="general" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">Business Profile</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">Payment</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <BellRing className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure general store settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="font-medium">Business Hours</div>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div className="grid gap-0.5">
                        <div className="font-medium">Monday - Friday</div>
                        <div className="text-sm text-muted-foreground">Store operating hours</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        className="w-24"
                        defaultValue="09:00"
                        type="time"
                      />
                      <span>to</span>
                      <Input
                        className="w-24"
                        defaultValue="20:00"
                        type="time"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div className="grid gap-0.5">
                        <div className="font-medium">Saturday</div>
                        <div className="text-sm text-muted-foreground">Weekend hours</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        className="w-24"
                        defaultValue="10:00"
                        type="time"
                      />
                      <span>to</span>
                      <Input
                        className="w-24"
                        defaultValue="18:00"
                        type="time"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div className="grid gap-0.5">
                        <div className="font-medium">Sunday</div>
                        <div className="text-sm text-muted-foreground">Weekend hours</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Closed</span>
                        <Switch defaultChecked={true} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="font-medium">Language and Regional Settings</div>
                <div className="grid gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Display Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                          <SelectItem value="kn">Kannada</SelectItem>
                          <SelectItem value="ta">Tamil</SelectItem>
                          <SelectItem value="te">Telugu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Currency</Label>
                      <Select defaultValue="inr">
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inr">Indian Rupee (₹)</SelectItem>
                          <SelectItem value="usd">US Dollar ($)</SelectItem>
                          <SelectItem value="eur">Euro (€)</SelectItem>
                          <SelectItem value="gbp">British Pound (£)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="font-medium">Default Order Settings</div>
                <div className="grid gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Default Print Quality</Label>
                      <Select defaultValue="standard">
                        <SelectTrigger>
                          <SelectValue placeholder="Select quality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft (90 DPI)</SelectItem>
                          <SelectItem value="standard">Standard (300 DPI)</SelectItem>
                          <SelectItem value="high">High Quality (600 DPI)</SelectItem>
                          <SelectItem value="ultra">Ultra HD (1200+ DPI)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Default Paper Type</Label>
                      <Select defaultValue="bond">
                        <SelectTrigger>
                          <SelectValue placeholder="Select paper type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bond">Bond Paper</SelectItem>
                          <SelectItem value="matte">Matte Paper</SelectItem>
                          <SelectItem value="glossy">Glossy Paper</SelectItem>
                          <SelectItem value="recycled">Recycled Paper</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="font-medium">System Preferences</div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="grid gap-0.5">
                      <div className="font-medium">Enable Order Notifications</div>
                      <div className="text-sm text-muted-foreground">Receive alerts for new orders</div>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="grid gap-0.5">
                      <div className="font-medium">Enable Stock Alerts</div>
                      <div className="text-sm text-muted-foreground">Get notified when supplies are low</div>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="grid gap-0.5">
                      <div className="font-medium">Auto-apply Standard Pricing</div>
                      <div className="text-sm text-muted-foreground">Apply standard pricing rules automatically</div>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="grid gap-0.5">
                      <div className="font-medium">Enable Customer Feedback</div>
                      <div className="text-sm text-muted-foreground">Allow customers to rate services</div>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={saveChanges}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Profile</CardTitle>
              <CardDescription>
                Update your business information and details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Store Name</Label>
                    <Input
                      placeholder="Enter store name"
                      value={formData.storeName}
                      onChange={(e) => handleInputChange('storeName', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Store Description</Label>
                    <Textarea
                      placeholder="Describe your printing business"
                      className="min-h-[120px]"
                      value={formData.storeDescription}
                      onChange={(e) => handleInputChange('storeDescription', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Tax ID / GSTIN</Label>
                    <Input
                      placeholder="Enter your GSTIN"
                      value={formData.taxId}
                      onChange={(e) => handleInputChange('taxId', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Enter email address"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Enter phone number"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Physical Address</Label>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-2.5" />
                      <Textarea
                        placeholder="Enter store address"
                        className="min-h-[80px]"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Website</Label>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Enter website URL"
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={saveChanges}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>
                Configure payment methods and options
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Wallet className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Payment Settings</h3>
              <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
                Configure your payment methods, transaction fees, and settlement options.
                This section is coming soon.
              </p>
              <Button variant="outline" disabled>
                Configure Payment Options
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <BellRing className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Notification Preferences</h3>
              <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
                Customize your notification preferences for order updates, system alerts, 
                and marketing communications. This section is coming soon.
              </p>
              <Button variant="outline" disabled>
                Configure Notifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage account security and access permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Shield className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Security & Access Control</h3>
              <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
                Manage password settings, two-factor authentication, and staff access permissions.
                This section is coming soon.
              </p>
              <Button variant="outline" disabled>
                Configure Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 