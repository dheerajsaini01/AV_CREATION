
import { CheckCircle2, Clock, Package, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered';

interface OrderTrackerProps {
  status: OrderStatus;
  estimatedDelivery?: string;
  currentLocation?: string;
}

const steps = [
  { key: 'pending', title: 'Order Placed', icon: Clock },
  { key: 'processing', title: 'Processing', icon: Package },
  { key: 'shipped', title: 'Shipped', icon: Truck },
  { key: 'delivered', title: 'Delivered', icon: CheckCircle2 },
];

const statusToStepIndex = {
  pending: 0,
  processing: 1,
  shipped: 2,
  delivered: 3,
};

export function OrderTracker({ status, estimatedDelivery, currentLocation }: OrderTrackerProps) {
  const currentStepIndex = statusToStepIndex[status];
  
  return (
    <div className="w-full">
      {/* Mobile view tracking */}
      <div className="md:hidden space-y-6 px-2">
        {steps.map((step, index) => {
          const isCompleted = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const StepIcon = step.icon;
          
          return (
            <div key={step.key} className="flex items-start gap-4">
              <div className="relative flex flex-col items-center">
                <div 
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}
                >
                  <StepIcon className="h-4 w-4" />
                </div>
                {index < steps.length - 1 && (
                  <div 
                    className={cn(
                      "absolute top-8 w-0.5 h-12",
                      index < currentStepIndex ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
              <div className={index < currentStepIndex ? "" : "opacity-70"}>
                <h3 className="font-medium">
                  {step.title} 
                  {isCurrent && (
                    <span className="ml-2 text-sm font-normal text-muted-foreground">(Current)</span>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isCurrent && step.key === 'shipped' && currentLocation && (
                    <>Last location: {currentLocation}</>
                  )}
                  {isCurrent && step.key === 'processing' && (
                    <>Your order is being prepared</>
                  )}
                  {isCurrent && step.key === 'pending' && (
                    <>Your order is confirmed</>
                  )}
                  {isCurrent && step.key === 'delivered' && (
                    <>Your order has been delivered</>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop view tracking */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Connector line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted">
            {/* Colored progress */}
            <div 
              className="h-full bg-primary transition-all" 
              style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
            />
          </div>
          
          {/* Steps */}
          <div className="flex justify-between">
            {steps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const StepIcon = step.icon;
              
              return (
                <div key={step.key} className="relative flex flex-col items-center">
                  <div 
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center z-10",
                      isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}
                  >
                    <StepIcon className="h-5 w-5" />
                  </div>
                  <div className="mt-3 text-center">
                    <h3 className={`font-medium ${isCurrent ? "text-primary" : ""}`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-[120px] text-center">
                      {isCurrent && step.key === 'shipped' && currentLocation && (
                        <>Last location: {currentLocation}</>
                      )}
                      {isCurrent && step.key === 'processing' && (
                        <>Your order is being prepared</>
                      )}
                      {isCurrent && step.key === 'pending' && (
                        <>Your order is confirmed</>
                      )}
                      {isCurrent && step.key === 'delivered' && (
                        <>Your order has been delivered</>
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Estimated delivery */}
      {estimatedDelivery && status !== 'delivered' && (
        <div className="mt-8 p-4 bg-muted/30 rounded-lg">
          <h3 className="font-medium">Estimated Delivery</h3>
          <p className="text-lg font-medium text-primary">{estimatedDelivery}</p>
        </div>
      )}
    </div>
  );
}
