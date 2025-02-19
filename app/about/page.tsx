import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";


export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white text-black flex flex-col">
            <Header />
            <main className="flex-grow">
                <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-8 text-green-600">About Us</h1>
                    <Card className="bg-white shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold text-green-600">Digits Finance Tracker</CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-700 space-y-4">
                            <p>
                                At Digits Finance Tracker, we believe that financial freedom starts with understanding where your money
                                goes. Founded in 2024, our mission is to empower individuals with simple, intuitive, and powerful tools to
                                take control of their personal finances.
                            </p>
                            <p>
                                Managing money shouldn't be complicated. That's why we built Digits, a smart finance tracker that helps you
                                budget wisely, track expenses effortlessly, and achieve your financial goals with confidence. Whether you're
                                saving for your dream vacation, paying off debt, or simply looking for a better way to manage your daily
                                spending, we've got you covered.
                            </p>
                            <p>
                                Our team of finance enthusiasts, tech experts, and problem-solvers is dedicated to making money management
                                accessible to everyone. With an easy-to-use interface and insightful analytics, Digits gives you a clear
                                picture of your finances—anytime, anywhere.
                            </p>
                            <p>
                                At Digits, we value transparency, security, and innovation. Your financial data is protected with
                                state-of-the-art encryption, ensuring that your information remains private and secure.
                            </p>
                            <p>
                                Join us and take the first step toward a smarter, stress-free financial future. Start tracking, start
                                saving, and start growing with Digits Finance Tracker.
                            </p>
                        </CardContent>
                    </Card>
                </section>
                <section className="bg-green-600 py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">Ready to Take Control of Your Finances?</h2>
                        <p className="text-white text-lg mb-8">
                            Start your journey to financial freedom today with Digits Finance Tracker.
                        </p>
                        <div className="space-x-4">
                            <Button variant="secondary" size="lg">
                                Sign Up for Free
                            </Button>

                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

