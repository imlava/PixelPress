"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { 
  FileUp, 
  File, 
  Trash2, 
  ArrowRight, 
  AlertCircle, 
  Check,
  LayoutTemplate, 
  HelpCircle,
  InfoIcon 
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export default function UploadPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get("category") || "documents"

  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({})

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      handleFiles(selectedFiles)
    }
  }

  const handleFiles = (newFiles: File[]) => {
    // Validate file types based on category
    const validTypes = getValidFileTypes(category)
    const invalidFiles = newFiles.filter((file) => !validTypes.some((type) => file.type.includes(type)))

    if (invalidFiles.length > 0) {
      setUploadError(`Invalid file type(s). Please upload ${validTypes.join(", ")} files.`)
      return
    }

    setUploadError(null)
    
    // Simulate upload progress for each file
    const filesWithProgress: {[key: string]: number} = {}
    newFiles.forEach((file) => {
      filesWithProgress[`${file.name}-${Date.now()}`] = 0
    })
    setUploadProgress({...uploadProgress, ...filesWithProgress})

    // Simulate upload progress animation
    const fileKeys = Object.keys(filesWithProgress)
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const updated = {...prev}
        let allComplete = true
        
        fileKeys.forEach(key => {
          if (updated[key] < 100) {
            updated[key] = Math.min(updated[key] + Math.random() * 20, 100)
            allComplete = false
          }
        })
        
        if (allComplete) {
          clearInterval(interval)
        }
        
        return updated
      })
    }, 300)

    // Add files to state
    setFiles(prev => [...prev, ...newFiles])
  }

  const getValidFileTypes = (category: string) => {
    // Support all print and design format files regardless of category
    return [
      // Document formats
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "application/rtf",
      "application/vnd.oasis.opendocument.text",
      
      // Image formats
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/tiff",
      "image/bmp",
      "image/svg+xml",
      "image/webp",
      
      // Design formats
      "application/postscript",
      "application/illustrator",
      "application/x-photoshop",
      "image/vnd.adobe.photoshop",
      "application/vnd.ms-publisher",
      "application/x-indesign",
      "application/vnd.adobe.indesign-idml-package",
      
      // Presentation formats
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      
      // Spreadsheet formats (which might include design layouts)
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ]
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleContinue = () => {
    if (files.length === 0) {
      setUploadError("Please upload at least one file to continue.")
      return
    }

    // For the demo, we'll just navigate to the next step
    router.push("/print/options")
  }

  const getCategoryTitle = () => {
    const titles: { [key: string]: string } = {
      documents: "Document Printing",
      photos: "Photo Printing",
      "business-cards": "Business Card Printing",
      posters: "Poster Printing",
      booklets: "Booklet Printing",
      custom: "Custom Printing",
    }
    return titles[category] || "Document Printing"
  }

  const getCategoryIcon = () => {
    const icons: { [key: string]: React.ReactNode } = {
      documents: <File className="h-5 w-5" />,
      photos: <File className="h-5 w-5" />,
      "business-cards": <File className="h-5 w-5" />,
      posters: <File className="h-5 w-5" />,
      booklets: <File className="h-5 w-5" />,
      custom: <File className="h-5 w-5" />,
    }
    return icons[category] || <File className="h-5 w-5" />
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <div className="flex items-center">
          <Badge variant="outline" className="mb-2 px-3 py-1 text-xs text-muted-foreground">
            Step 1 of 3: Upload Document
          </Badge>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">Upload Your Document</h1>
        <p className="mt-1.5 max-w-2xl text-sm md:text-base text-muted-foreground">
          Upload files for printing or select from our template library
        </p>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-6">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <FileUp className="h-4 w-4" />
            <span>Upload Files</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <LayoutTemplate className="h-4 w-4" />
            <span>Use Templates</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="mt-0">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardContent className="p-6">
                <div
                  className={cn(
                    "flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors",
                    isDragging ? "border-primary/50 bg-primary/5" : "border-muted-foreground/25",
                    files.length > 0 ? "h-auto" : "h-48 md:h-64"
                  )}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {files.length === 0 ? (
                    <>
                      <FileUp className="mb-3 h-12 w-12 text-muted-foreground" />
                      <h3 className="mb-1 text-lg font-medium">Drop files here or click to upload</h3>
                      <p className="mb-4 text-sm text-center text-muted-foreground">
                        Supports all print and design formats including PDF, DOC, DOCX, JPG, PNG, AI, PSD, INDD, TIFF, and more
                      </p>
                      <Button onClick={() => document.getElementById("file-upload")?.click()}>
                        Choose Files
                      </Button>
                      <input
                        type="file"
                        id="file-upload"
                        multiple
                        onChange={handleFileInput}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.tiff,.tif,.bmp,.svg,.webp,.ai,.psd,.eps,.pub,.indd,.idml,.ppt,.pptx,.xls,.xlsx,.rtf,.odt"
                      />
                    </>
                  ) : (
                    <div className="w-full space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Uploaded Files</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setFiles([])}
                          className="text-destructive hover:text-destructive/90"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Clear All
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        {files.map((file, index) => (
                          <div 
                            key={index} 
                            className="flex items-center justify-between rounded-md border px-4 py-3"
                          >
                            <div className="flex items-center gap-3">
                              <File className="h-8 w-8 text-primary/80" />
                              <div>
                                <p className="font-medium">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              {uploadProgress[file.name] !== undefined && (
                                <div className="flex w-24 items-center gap-2">
                                  <Progress 
                                    value={uploadProgress[file.name]} 
                                    className="h-1.5"
                                  />
                                  <span className="text-xs">{uploadProgress[file.name]}%</span>
                                </div>
                              )}
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => {
                                  const newFiles = [...files]
                                  newFiles.splice(index, 1)
                                  setFiles(newFiles)
                                }}
                                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        onClick={() => document.getElementById("file-upload")?.click()}
                        className="w-full"
                      >
                        <FileUp className="mr-2 h-4 w-4" />
                        Add More Files
                      </Button>
                    </div>
                  )}
                </div>
                
                {uploadError && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{uploadError}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
              
              <CardFooter className="flex items-center justify-between bg-muted/50 px-6 py-4">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <InfoIcon className="h-3.5 w-3.5" />
                  <span>Max file size: 50MB</span>
                </div>
                
                <Button 
                  onClick={() => router.push(`/print/options?category=${category}`)}
                  disabled={files.length === 0}
                  className="gap-2"
                >
                  Continue to Options
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-xl font-medium">Selected Category</h3>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    {getCategoryIcon()}
                    <div>
                      <p className="font-medium">{getCategoryTitle()}</p>
                      <p className="text-sm text-muted-foreground">
                        {/* Add category description here */}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="mb-3 text-xl font-medium">Upload Guidelines</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-green-600" />
                      <span className="text-sm">Use high-resolution images for best print quality</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-green-600" />
                      <span className="text-sm">Ensure documents have correct margins (min 0.5 inch)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-green-600" />
                      <span className="text-sm">For multi-page documents, use PDF format</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-green-600" />
                      <span className="text-sm">Design files (AI, PSD, INDD) will maintain layers and quality</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 text-green-600" />
                      <span className="text-sm">Verify document orientation before uploading</span>
                    </li>
                  </ul>
                </div>
                
                <div className="mt-6">
                  <h3 className="mb-3 text-xl font-medium">Need Help?</h3>
                  <div className="rounded-lg border-2 border-dashed p-4">
                    <div className="flex items-start gap-2">
                      <HelpCircle className="mt-0.5 h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Support Available</p>
                        <p className="text-sm text-muted-foreground">
                          Contact our team at{" "}
                          <a href="mailto:support@pixelpress.ink" className="text-primary hover:underline">
                            support@pixelpress.ink
                          </a>{" "}
                          for assistance
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="templates" className="mt-0">
          <Card>
            <CardContent className="min-h-[50vh] flex flex-col items-center justify-center p-6">
              <LayoutTemplate className="mb-4 h-16 w-16 text-muted-foreground" />
              <h3 className="mb-2 text-xl font-medium">Template Library Coming Soon</h3>
              <p className="mb-6 max-w-md text-center text-muted-foreground">
                Our template library is currently under development. Check back soon for a variety of professional templates!
              </p>
              <Button variant="outline" onClick={() => {
                const uploadTab = document.querySelector('[data-value="upload"]') as HTMLElement
                if (uploadTab) uploadTab.click()
              }}>
                Switch to File Upload
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

