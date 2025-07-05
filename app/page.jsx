"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Mail, PieChart, Users, Star, ArrowRight, Sparkles, UserPlus, Settings, Share2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const howItWorksRef = useRef(null)
  const reviewsRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const reviews = [
    {
      name: "Sarah Chen",
      role: "College Student",
      content: "SplitPal saved my friendships! No more awkward conversations about who owes what.",
      rating: 5,
      avatar: "SC",
    },
    {
      name: "Mike Rodriguez",
      role: "Software Engineer",
      content: "Finally, an app that makes splitting bills actually enjoyable. The email reports are amazing!",
      rating: 5,
      avatar: "MR",
    },
    {
      name: "Emma Thompson",
      role: "Marketing Manager",
      content: "Our roommate group loves SplitPal. It's so simple to use and keeps everyone accountable.",
      rating: 5,
      avatar: "ET",
    },
    {
      name: "David Park",
      role: "Freelancer",
      content: "Best expense splitting app I've used. Clean interface and smart features.",
      rating: 5,
      avatar: "DP",
    },
    {
      name: "Lisa Wang",
      role: "Travel Blogger",
      content: "Perfect for group trips! SplitPal handled our Europe trip expenses flawlessly.",
      rating: 5,
      avatar: "LW",
    },
    {
      name: "Alex Johnson",
      role: "Graduate Student",
      content: "Love how SplitPal sends detailed reports. I can finally track where my money goes.",
      rating: 5,
      avatar: "AJ",
    },
  ]

  const steps = [
    {
      number: "01",
      title: "Create Your Group",
      description: "Add friends, roommates, or travel companions to your expense group. Invite them via email or share a simple link.",
      icon: UserPlus,
      color: "sky",
    },
    {
      number: "02", 
      title: "Add Your Expenses",
      description: "Snap photos of receipts or manually enter expenses. SplitPal automatically calculates who owes what.",
      icon: Calculator,
      color: "purple",
    },
    {
      number: "03",
      title: "Settle Up & Track",
      description: "Send payment reminders, track settlements, and get detailed reports. Keep everyone accountable effortlessly.",
      icon: Share2,
      color: "blue",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden pt-16">
      {/* Hero Section with 3D Effects */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-gradient-to-br from-sky-900/30 via-blue-900/20 to-purple-900/30"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
          {/* Floating Elements */}
          <div
            className="absolute top-20 left-10 w-32 h-32 bg-sky-500/20 rounded-full blur-xl"
            style={{
              transform: `translate(${scrollY * 0.3}px, ${scrollY * 0.2}px) rotate(${scrollY * 0.1}deg)`,
            }}
          />
          <div
            className="absolute top-40 right-20 w-48 h-48 bg-purple-500/20 rounded-full blur-xl"
            style={{
              transform: `translate(${-scrollY * 0.2}px, ${scrollY * 0.3}px) rotate(${-scrollY * 0.1}deg)`,
            }}
          />
          <div
            className="absolute bottom-20 left-1/3 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"
            style={{
              transform: `translate(${scrollY * 0.4}px, ${-scrollY * 0.1}px) rotate(${scrollY * 0.2}deg)`,
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div
            className="space-y-8 max-w-4xl mx-auto"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          >
            <div className="inline-flex items-center gap-2 bg-sky-500/20 backdrop-blur-sm border border-sky-500/30 text-sky-300 px-6 py-3 rounded-full text-sm font-medium animate-pulse-glow mt-12">
              <Sparkles className="h-4 w-4" />
              Trusted by 10,000+ users worldwide
            </div>

            <h1 className="text-6xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-white via-sky-200 to-blue-400 bg-clip-text text-transparent animate-float">
              Split Bills
              <span className="block bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
                Effortlessly
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              The smartest way to manage shared expenses. Split bills, track spending, and get detailed reports—all in
              one beautiful app.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-lg px-10 py-6 rounded-2xl shadow-2xl hover:shadow-sky-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  Start Free Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-6 rounded-2xl border-2 border-sky-500/50 hover:bg-sky-500/10 bg-transparent backdrop-blur-sm text-sky-300 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                <Link href="#how-it-works">
                See How It Works
                </Link>
              </Button>
            </div>
          </div>

          {/* 3D Hero Image */}
          <div
            className="mt-20 relative max-w-5xl mx-auto perspective-1000"
            style={{
              transform: `translateY(${scrollY * 0.2}px) rotateX(${scrollY * 0.02}deg)`,
            }}
          >
            <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl border border-gray-800 overflow-hidden transform-gpu hover:scale-105 transition-transform duration-700">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-purple-500/20 opacity-50" />
              <Image
                src="/heroimage.png"
                alt="SplitPal Dashboard"
                width={1000}
                height={600}
                className="w-full h-auto relative z-10"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with 3D Cards */}
      <section id="features" ref={featuresRef} className="py-32 pb-48 relative">
        <div
          className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />

        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Everything you need
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Powerful features designed to make expense sharing simple and stress-free
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto mb-20">
            {[
              {
                icon: Calculator,
                title: "Smart Splitting",
                desc: "Automatically calculate splits with intelligent algorithms. Handle tips, taxes, and unequal shares.",
                color: "sky",
              },
              {
                icon: PieChart,
                title: "Expense Tracking",
                desc: "Track all expenses in one place. Add photos, categorize spending, and monitor budgets in real-time.",
                color: "blue",
              },
              {
                icon: Mail,
                title: "Email Reports",
                desc: "Get detailed reports delivered to your inbox. Weekly summaries and custom breakdowns on demand.",
                color: "purple",
              },
              {
                icon: Users,
                title: "Group Management",
                desc: "Create groups for trips, roommates, or dinners. Invite friends and manage multiple groups seamlessly.",
                color: "orange",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group border-0 bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-sky-500/20 rounded-2xl overflow-hidden"
                style={{
                  transform: `translateY(${scrollY * 0.05 * (index + 1)}px)`,
                }}
              >
                <CardHeader className="text-center p-8 relative">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-${feature.color}-500/50 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6`}
                  >
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white mb-4 group-hover:text-sky-300 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {feature.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section id="how-it-works" ref={howItWorksRef} className="py-32 pb-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900" />

        {/* Floating background elements */}
        <div
          className="absolute top-32 right-10 w-40 h-40 bg-sky-500/10 rounded-full blur-2xl"
          style={{
            transform: `translate(${-scrollY * 0.1}px, ${scrollY * 0.15}px)`,
          }}
        />
        <div
          className="absolute bottom-32 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"
          style={{
            transform: `translate(${scrollY * 0.1}px, ${-scrollY * 0.1}px)`,
          }}
        />

        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get started with SplitPal in just three simple steps
            </p>
          </div>

          {/* Horizontal Steps Layout */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-20">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative"
                  style={{
                    transform: `translateY(${scrollY * 0.03 * (index + 1)}px)`,
                  }}
                >
                  <div className="text-center">
                    {/* Step Number and Icon */}
                    <div className="flex flex-col items-center mb-8">
                      <div className="relative mb-6">
                        <span className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
                          {step.number}
                        </span>
                      </div>
                      <div
                        className={`w-20 h-20 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-2xl flex items-center justify-center shadow-lg mb-6 transform hover:scale-110 hover:rotate-6 transition-all duration-300`}
                      >
                        <step.icon className="h-10 w-10 text-white" />
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="space-y-6">
                      <h3 className="text-2xl lg:text-3xl font-bold text-white">{step.title}</h3>
                      <p className="text-lg text-gray-400 leading-relaxed">{step.description}</p>
                    </div>

                    {/* Step Visual */}
                    <div className="mt-8">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                        <Card className="relative border-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl overflow-hidden transform group-hover:scale-105 transition-all duration-500">
                          <CardHeader className="p-6">
                            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl flex items-center justify-center">
                              <Image
                                src={`/placeholder.svg?height=200&width=300&text=Step ${step.number}`}
                                alt={`Step ${step.number}: ${step.title}`}
                                width={300}
                                height={200}
                                className="w-full h-full object-cover rounded-2xl opacity-80"
                              />
                            </div>
                          </CardHeader>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section with Moving 3D Cards */}
      <section ref={reviewsRef} className="pt-20 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900" />

        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Loved by thousands
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">See what our users are saying about SplitPal</p>
          </div>

          {/* 3D Moving Reviews Carousel */}
          <div className="relative max-w-6xl mx-auto">
            <div className="overflow-hidden">
              <div className="flex animate-scroll-3d gap-8">
                {/* First set of reviews */}
                {reviews.map((review, index) => (
                  <Card
                    key={`first-${index}`}
                    className="min-w-[320px] border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 flex-shrink-0 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 rounded-2xl shadow-2xl hover:shadow-sky-500/20"
                  >
                    <CardHeader className="p-6">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <CardDescription className="text-gray-300 text-base leading-relaxed mb-6">
                        "{review.content}"
                      </CardDescription>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          {review.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-white text-base">{review.name}</div>
                          <div className="text-sm text-gray-400">{review.role}</div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
                {/* Duplicate set for seamless loop */}
                {reviews.map((review, index) => (
                  <Card
                    key={`second-${index}`}
                    className="min-w-[320px] border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 flex-shrink-0 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 rounded-2xl shadow-2xl hover:shadow-sky-500/20"
                  >
                    <CardHeader className="p-6">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <CardDescription className="text-gray-300 text-base leading-relaxed mb-6">
                        "{review.content}"
                      </CardDescription>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          {review.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-white text-base">{review.name}</div>
                          <div className="text-sm text-gray-400">{review.role}</div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Enhanced Gradient overlays */}
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* CTA Section with 3D Effects */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900 via-blue-900 to-purple-900" />
        <div
          className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-purple-500/20"
          style={{
            transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.02}deg)`,
          }}
        />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-10">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent">
              Ready to split smarter?
            </h2>
            <p className="text-xl text-sky-100 leading-relaxed max-w-2xl mx-auto">
              Join thousands of users who trust SplitPal to manage their shared expenses. Start your free account
              today—no credit card required.
            </p>
            <Link href="/dashboard">
              <Button
              size="lg"
              className="bg-gradient-to-r from-white to-sky-100 text-sky-900 hover:from-sky-50 hover:to-white text-xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 font-semibold"
            >
              Get Started Free
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-8 border-t border-gray-800 bg-black">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            Made with ❤️ by{" "}
            <a
              href="https://github.com/BhaumikReddy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 transition-colors duration-200 font-medium"
            >
              BhaumikReddy
            </a>
          </p>
        </div>
      </footer>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(14, 165, 233, 0.3); }
          50% { box-shadow: 0 0 30px rgba(14, 165, 233, 0.6); }
        }
        
        @keyframes scroll-3d {
          0% { transform: translateX(0) rotateY(0deg); }
          100% { transform: translateX(-50%) rotateY(-5deg); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .animate-scroll-3d {
          animation: scroll-3d 20s linear infinite;
        }

        .animate-scroll-3d:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
