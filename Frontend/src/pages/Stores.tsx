
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MapPin, Phone, Clock } from "lucide-react";

const Stores = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample store locations
  const stores = [
    {
      id: 1,
      name: "AV CREATION -Jamdoli",
      address: "Main Office:- Shri Niketan Opp Ganesh Vihar Colony, Keshav Vidhya Peeth, Jamdoli, Jaipur-302031 (Raj.)",
      phone: "+91 9314205211, +91 9529505211, +91 8949475741",
      hours: "Monday - Sunday: 9:00 AM - 9:00 PM",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      mapsLink: "https://maps.app.goo.gl/b3Lto4FouAcBTioXA"
    },
    {
      id: 2,
      name: "AV CREATION -Khaniya",
      address: "Branch Office:- Near Dayal Hospital, Purana Ghaat Khaniya, Cheq Post, Agra Road, Jaipur-302003 (Raj.)",
      phone: "+91 9314205211, +91 9529505211, +91 8949475741",
      hours: "Monday - Sunday: 9:00 AM - 9:00 PM",
      image: "https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      mapsLink: "https://maps.app.goo.gl/scV7JVjHVYaEhXUM6"
    },
    {
      id: 3,
      name: "AV CREATION - Bassi",
      address: "Branch Office:- Purana Post Office, Near Bida Ji Mandir, Bassi, Jaipur - 303301 (Raj.)",
      phone: "+91 9314205211, +91 9529505211, +91 8949475741",
      hours: "Monday - Sunday: 9:00 AM - 9:00 PM",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      mapsLink: "https://maps.app.goo.gl/JSvPdzhJC3WsoYMSA"
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">Our Stores</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Visit us at one of our elegant showrooms to experience our exquisite collections in person
              and receive personalized styling assistance from our expert consultants.
            </p>
          </div>

          <div className="space-y-16">
            {stores.map((store) => (
              <div key={store.id} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="h-64 md:h-96 relative rounded-lg overflow-hidden">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-6">
                  <h2 className="font-display text-2xl font-semibold">{store.name}</h2>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-cream p-3 rounded-full">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Address</h3>
                        <p className="text-muted-foreground">{store.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-cream p-3 rounded-full">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Contact</h3>
                        <p className="text-muted-foreground">{store.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-cream p-3 rounded-full">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Opening Hours</h3>
                        <p className="text-muted-foreground">{store.hours}</p>
                      </div>
                    </div>
                  </div>

                  
                    <div  className="pt-4">
                      <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors">
                        <a href={store.mapsLink} target="_blank" rel="noopener noreferrer">
                          Get Directions
                        </a>
                      </button>
                    </div>
                  
                </div>
              </div>
            ))}
          </div>

          { /*<div className="mt-16 pt-8 border-t border-border">
            <h2 className="font-display text-2xl font-semibold text-center mb-8">Visit Us</h2>
            <div className="bg-cream p-8 rounded-lg text-center">
              <p className="text-lg mb-4">
                Prefer a more personalized shopping experience? Book an appointment with our styling consultants.
              </p>
              <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors">
                Book an Appointment
              </button>
            </div>
          </div>*/}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Stores;
