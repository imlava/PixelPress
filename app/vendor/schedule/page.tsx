"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  Printer,
  Package,
  FileText,
  Users,
} from "lucide-react"

export default function SchedulePage() {
  const [currentView, setCurrentView] = useState("week")
  const [currentDate, setCurrentDate] = useState(new Date())
  
  // Mock data for demonstration
  const scheduledJobs = [
    {
      id: "PP-7654321",
      customer: "Rahul Sharma",
      document: "Project_Report.pdf",
      scheduledStart: "2023-11-05T10:00:00",
      scheduledEnd: "2023-11-05T11:30:00",
      status: "In Progress",
      assignedTo: "Operator 1",
      machine: "HP Color LaserJet Pro M479fdw",
    },
    {
      id: "PP-7654322",
      customer: "Priya Patel",
      document: "Wedding_Invitations.pdf",
      scheduledStart: "2023-11-05T12:00:00",
      scheduledEnd: "2023-11-05T15:00:00",
      status: "Scheduled",
      assignedTo: "Operator 2",
      machine: "Canon imagePRESS C710",
    },
    {
      id: "PP-7654323",
      customer: "Amit Singh",
      document: "Corporate_Brochures.pdf",
      scheduledStart: "2023-11-05T15:30:00",
      scheduledEnd: "2023-11-05T17:30:00",
      status: "Scheduled",
      assignedTo: "Operator 1",
      machine: "HP DesignJet T730",
    },
    {
      id: "PP-7654324",
      customer: "John Doe",
      type: "Printing",
      time: "10:00 AM",
      duration: "1 hour",
      status: "confirmed",
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
    },
    {
      id: "PP-7654325",
      customer: "Jane Smith",
      type: "Binding",
      time: "2:00 PM",
      duration: "30 minutes",
      status: "confirmed",
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
    },
    {
      id: "PP-7654326",
      customer: "Mike Johnson",
      type: "Consultation",
      time: "11:30 AM",
      duration: "45 minutes",
      status: "pending",
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1)
    }
  ]
  
  // Helper functions for date manipulation
  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' })
  }
  
  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long' })
  }
  
  // Generate week days for the current week view
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(currentDate)
    day.setDate(currentDate.getDate() - currentDate.getDay() + i)
    return day
  })
  
  // Simple time slots for the week view
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ]
  
  // Filter events for a specific time slot and day
  const getEventsForTimeSlot = (day: Date, time: string) => {
    return scheduledJobs.filter(job => 
      job.date && 
      job.date.getDate() === day.getDate() && 
      job.date.getMonth() === day.getMonth() && 
      job.time === time
    );
  }
  
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Schedule</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your printing service appointments and deadlines
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue={currentView} onValueChange={(value) => setCurrentView(value)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2 pt-3 px-4">
          <div className="flex items-center justify-between">
            <CardTitle>Calendar View</CardTitle>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                {currentView === "day" 
                  ? currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                  : currentView === "week"
                    ? `${getMonthName(weekDays[0])} ${weekDays[0].getDate()} - ${getMonthName(weekDays[6])} ${weekDays[6].getDate()}, ${weekDays[0].getFullYear()}`
                    : getMonthName(currentDate) + " " + currentDate.getFullYear()
                }
              </span>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="h-8">
                Today
              </Button>
            </div>
          </div>
          <CardDescription>
            View and manage printing appointments and deadlines
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="week" value={currentView} onValueChange={setCurrentView}>
            <div className="px-4 pt-1 pb-2 border-b">
              <TabsList className="gap-3">
                <TabsTrigger value="day" className="text-xs sm:text-sm">Day</TabsTrigger>
                <TabsTrigger value="week" className="text-xs sm:text-sm">Week</TabsTrigger>
                <TabsTrigger value="month" className="text-xs sm:text-sm">Month</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="week" className="m-0">
              <div className="border-b grid grid-cols-8 divide-x">
                <div className="py-2 px-3"></div>
                {weekDays.map((day, i) => (
                  <div key={i} className={`py-2 px-3 text-center ${day.getDate() === new Date().getDate() ? 'bg-primary/5' : ''}`}>
                    <div className="text-sm font-medium">{getDayName(day)}</div>
                    <div className={`text-xl mt-1 ${day.getDate() === new Date().getDate() ? 'font-bold text-primary' : ''}`}>
                      {day.getDate()}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="divide-y">
                {timeSlots.map((time, timeIndex) => (
                  <div key={timeIndex} className="grid grid-cols-8 divide-x">
                    <div className="py-6 px-3 text-muted-foreground text-sm">
                      {time}
                    </div>
                    {weekDays.map((day, dayIndex) => {
                      const eventsAtThisTime = getEventsForTimeSlot(day, time);
                      
                      return (
                        <div key={dayIndex} className="py-1 px-2 min-h-[70px] relative">
                          {eventsAtThisTime.map((event, eventIndex) => (
                            <div 
                              key={eventIndex}
                              className="text-xs p-1.5 rounded mb-1 bg-primary/10 border-l-2 border-primary"
                            >
                              <div className="font-medium truncate">{event.customer}</div>
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{event.time} - {event.duration}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="day" className="m-0">
              <div className="py-6 text-center border-b">
                <h3 className="text-xl font-bold">
                  {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h3>
              </div>
              <div className="divide-y">
                {timeSlots.map((time, index) => {
                  const eventsAtThisTime = getEventsForTimeSlot(currentDate, time);
                  
                  return (
                    <div key={index} className="flex">
                      <div className="py-4 px-3 w-24 text-muted-foreground text-sm">
                        {time}
                      </div>
                      <div className="flex-1 py-2 px-4 min-h-[70px]">
                        {eventsAtThisTime.map((event, eventIndex) => (
                          <div 
                            key={eventIndex}
                            className="text-sm p-2 rounded mb-1 bg-primary/10 border-l-2 border-primary"
                          >
                            <div className="font-medium">{event.customer}</div>
                            <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {event.time} - {event.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Printer className="h-3.5 w-3.5" />
                                {event.type}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="month" className="m-0 p-4">
              <div className="text-center p-6">
                <Calendar className="mx-auto h-20 w-20 text-primary opacity-80 mb-4" />
                <h3 className="text-lg text-muted-foreground">Monthly view coming soon...</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  We're working on building a comprehensive monthly view for your scheduling needs
                </p>
                <Button variant="outline" className="mt-4" onClick={() => setCurrentView("week")}>
                  Switch to Week View
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-3">
              {scheduledJobs.map((job, index) => (
                <div key={index} className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50">
                  <div className={`mt-0.5 p-2 rounded-md ${job.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {job.type === 'Printing' ? <Printer className="h-4 w-4" /> :
                     job.type === 'Binding' ? <Package className="h-4 w-4" /> :
                     job.type === 'Consultation' ? <Users className="h-4 w-4" /> :
                     <FileText className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{job.customer}</p>
                      {job.date && (
                        <p className="text-xs text-muted-foreground">
                          {job.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{job.type}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs">{job.time} ({job.duration})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle>Staff Schedule</CardTitle>
            <CardDescription>Today's shifts</CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-3">
              <div className="p-2 rounded-md hover:bg-muted/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">AS</div>
                    <p className="font-medium">Arun Singh</p>
                  </div>
                  <div className="text-sm text-muted-foreground">9:00 AM - 5:00 PM</div>
                </div>
                <div className="mt-1 text-sm text-muted-foreground ml-10">Printing Specialist</div>
              </div>
              
              <div className="p-2 rounded-md hover:bg-muted/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">PK</div>
                    <p className="font-medium">Priya Kumar</p>
                  </div>
                  <div className="text-sm text-muted-foreground">10:00 AM - 6:00 PM</div>
                </div>
                <div className="mt-1 text-sm text-muted-foreground ml-10">Binding Specialist</div>
              </div>
              
              <div className="p-2 rounded-md hover:bg-muted/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">RJ</div>
                    <p className="font-medium">Rahul Joshi</p>
                  </div>
                  <div className="text-sm text-muted-foreground">12:00 PM - 8:00 PM</div>
                </div>
                <div className="mt-1 text-sm text-muted-foreground ml-10">Customer Service</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 