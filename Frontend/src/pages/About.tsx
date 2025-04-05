
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail, Phone, Instagram, Facebook } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const teamMembers = [
  {
    name: "Dheeraj Saini",
    role: "Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
  },
  {
    name: "Shuham Khumar",
    role: "Design Head",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
  },
  {
    name: "Shiva Arjun",
    role: "Production Manager",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
  },
  {
    name: "Aman Yadav",
    role: "Customer Experience",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1887&auto=format&fit=crop",
  },
];

export default function About() {
  const [isVisible, setIsVisible] = useState({
    story: false,
    team: false,
    mission: false,
    contact: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["story", "team", "mission", "contact"];

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight - 100 && rect.bottom >= 0;

          setIsVisible((prev) => ({
            ...prev,
            [section]: isInView,
          }));
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        {/* Hero section */}
        <div className="container mx-auto px-4 mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="heading-lg mb-6">About AV Creation</h1>
            <p className="text-lg text-muted-foreground">
              Crafting timeless Indian ethnic wear since 2008. We blend traditional
              craftsmanship with contemporary design to create pieces that celebrate
              the rich heritage of Indian textiles and embroidery.
            </p> 
          </div>
        </div>

        {/* Our Story */}
        <section
          id="story"
          className={`py-(2) bg-cream transition-opacity duration-700 ${isVisible.story ? "opacity-100" : "opacity-0"
            }`}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
              <div>
                <h2 className="heading-md mb-6">Our Story</h2>
                <p className="mb-4">
                  AV Creation began as a small family business in Jaipur, founded by Nand Lal Saini
                  with a vision to preserve traditional Indian craftsmanship while creating
                  contemporary designs for the modern woman.
                </p>
                <p className="mb-4">
                  What started as a modest workshop with five artisans has grown into a
                  recognized brand with over 100 skilled craftspeople, each bringing their
                  unique expertise in embroidery, textile design, and garment construction.
                </p>
                <p>
                  Today, we continue to work directly with artisans across India, ensuring
                  fair wages and preserving age-old techniques while creating stunning
                  pieces for our global clientele.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden aspect-square">
                <img
                  src="/assets/AV_logo.png"
                  alt="AV Creation workshop"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section
          id="team"
          className={`py-16 transition-opacity duration-700 ${isVisible.team ? "opacity-100" : "opacity-0"
            }`}
        >
          <div className="container mx-auto px-4">
            <h2 className="heading-md mb-8 text-center">Meet Our Team</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto w-40 h-40 rounded-full overflow-hidden mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section
          id="mission"
          className={`py-16 bg-cream transition-opacity duration-700 ${isVisible.mission ? "opacity-100" : "opacity-0"
            }`}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-md mb-6">Our Mission</h2>
              <p className="text-lg mb-8">
                At AV Creation, our mission is to celebrate and preserve the rich textile
                heritage of India through thoughtfully designed garments that honor
                traditional craftsmanship while embracing modern aesthetics.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-2">Craftsmanship</h3>
                    <p>Supporting artisans and preserving traditional techniques</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                    <p>Ethical production and responsible material sourcing</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-2">Inclusivity</h3>
                    <p>Creating designs that celebrate women of all backgrounds</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className={`py-16 transition-opacity duration-700 ${isVisible.contact ? "opacity-100" : "opacity-0"
            }`}
        >
          <div className="container mx-auto px-4">
            <h2 className="heading-md mb-8 text-center">Visit Us</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="bg-muted/30 p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-semibold mb-4">Contact Information</h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 mr-3 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">AV CREATION</p>
                        <p className="text-muted-foreground">Av Creation - Best Lehenga Odhani Lugadi Shop in jaipur
                          Shri Niketan, Keshav Vidyapeeth Rd, opposite Ganesh Vihar Colony, Jamdoli, Jaipur, Rajasthan 302031</p>
                        <p className="text-muted-foreground"></p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-3 text-primary" />
                      <p>+91 9314205211,  +91 9529505211,  +91 8949475741</p>

                    </div>

                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-3 text-primary" />
                      <p>contact@avcreation.com</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Opening Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Sunday</span>
                      <span>9:00 AM - 9:00 PM</span>
                    </div>

                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">


                      <a href="https://www.instagram.com/jaipuri_odhni" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors">
                        <Instagram className="w-5 h-5" />
                      </a>
                      <a href="https://www.facebook.com/profile.php?id=61561262172120&sk" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors">
                        <Facebook className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-200 rounded-lg overflow-hidden aspect-square w-full">
                <iframe
                  className="w-full h-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDb474MftAm79xv1ukyQozFyWDPtm8kGUY&q=AV creation Jamdoli, Jaipur, India">
                </iframe>
              </div>


            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
