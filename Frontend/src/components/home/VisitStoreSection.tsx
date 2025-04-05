
import { MapPin, Clock, Store } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function VisitStoreSection() {
  return (
    <section className="section-padding bg-cream">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Visit Our Store</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Experience our collection in person and get personalized assistance from our design consultants.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Store className="h-6 w-6" />
              </div>
              <CardTitle>AV CREATION - Wholesale</CardTitle>
              <CardDescription>Jaipur</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-2 text-muted-foreground mb-3">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <p>Main Office:- Shri Niketan Opp Ganesh Vihar Colony, Keshav Vidhya Peeth, Jamdoli, Jaipur-302031 (Raj.)</p>
              </div>
              <div className="flex items-start space-x-2 text-muted-foreground">
                <Clock className="h-5 w-5 shrink-0 mt-0.5" />
                <p>Monday - Sunday: 9:00 AM - 9:00 PM</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Store className="h-6 w-6" />
              </div>
              <CardTitle>AV CREATION - Retail</CardTitle>
              <CardDescription>Jaipur</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-2 text-muted-foreground mb-3">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <p>Branch Office:- Near Dayal Hospital, Purana Ghaat Khaniya, Cheq Post, Agra Road, Jaipur-302003 (Raj.)</p>
              </div>
              <div className="flex items-start space-x-2 text-muted-foreground">
                <Clock className="h-5 w-5 shrink-0 mt-0.5" />
                <p>Monday - Sunday: 9:00 AM - 9:00 PM</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Store className="h-6 w-6" />
              </div>
              <CardTitle>AV CREATION - Retail</CardTitle> 
              <CardDescription>Jaipur</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-2 text-muted-foreground mb-3">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <p>Branch Office:- Purana Post Office, Near Bida Ji Mandir, Bassi, Jaipur - 303301 (Raj.)</p>
              </div>
              <div className="flex items-start space-x-2 text-muted-foreground">
                <Clock className="h-5 w-5 shrink-0 mt-0.5" />
                <p>Monday - Sunday: 9:00 AM - 9:00 PM</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link to="/stores">Find All Locations</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
