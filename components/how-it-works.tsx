import { UploadCloud, Sliders, Truck, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    id: 1,
    title: "Upload Your Files",
    description: "Upload your documents, photos, or designs that you want to print.",
    icon: UploadCloud,
  },
  {
    id: 2,
    title: "Choose Print Options",
    description: "Select paper type, size, color options, and binding preferences.",
    icon: Sliders,
  },
  {
    id: 3,
    title: "We Handle Delivery",
    description: "A nearby vendor will print your order and deliver it to your location.",
    icon: Truck,
  },
  {
    id: 4,
    title: "Enjoy Quality Prints",
    description: "Receive professional quality prints for your personal or business needs.",
    icon: Check,
  },
]

export default function HowItWorks() {
  return (
    <section className="mb-16 py-6">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <div className="mb-2 inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            Simple Process
          </div>
          <h2 className="text-3xl font-semibold tracking-tight">How It Works</h2>
          <p className="mt-2 text-muted-foreground">
            Get your prints in four easy steps
          </p>
        </div>
      </div>

      <div className="relative mt-12">
        {/* Connecting Line */}
        <div className="absolute left-8 top-0 h-full w-0.5 bg-border md:left-1/2 md:-ml-0.5"></div>

        <div className="space-y-12 md:space-y-24">
          {steps.map((step, index) => (
            <div key={step.id} className={cn(
              "relative",
              index % 2 === 0 ? "md:text-right" : ""
            )}>
              {/* Mobile view (always left-aligned) */}
              <div className="flex items-start gap-6 md:hidden">
                <div className="flex-none">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <step.icon className="h-6 w-6" />
                    <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-background text-xs font-bold text-primary ring-2 ring-primary">
                      {step.id}
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-1 text-muted-foreground">{step.description}</p>
                </div>
              </div>

              {/* Desktop view (alternating) */}
              <div className="hidden md:block">
                <div className={cn(
                  "md:flex",
                  index % 2 === 0 
                    ? "md:flex-row-reverse" 
                    : "md:flex-row"
                )}>
                  {/* Content */}
                  <div className={cn(
                    "md:w-1/2",
                    index % 2 === 0 
                      ? "md:pr-16" 
                      : "md:pl-16"
                  )}>
                    <div className={cn(
                      "rounded-lg bg-card p-6 shadow-md transition-all hover:shadow-lg",
                      index % 2 === 0
                        ? "mr-8 text-right"
                        : "ml-8 text-left"
                    )}>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                      <p className="mt-2 text-muted-foreground">{step.description}</p>
                    </div>
                  </div>

                  {/* Icon - centered on the line */}
                  <div className="absolute left-1/2 top-6 -ml-8 flex h-16 w-16 -translate-x-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <step.icon className="h-6 w-6" />
                    <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-background text-xs font-bold text-primary ring-2 ring-primary">
                      {step.id}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

