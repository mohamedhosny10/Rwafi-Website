import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";
import { Link } from 'wouter';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { getAllFAQ } from '../services/FAQ'; // Adjust path as needed

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data = await getAllFAQ();
        setFaqs(data);
      } catch (error) {
        console.error("Failed to fetch FAQs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container-modern max-w-3xl mx-auto">
          {/* Back to Home Button */}
          <Link href="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-8">
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gradient">Frequently Asked Questions</h1>

          {loading ? (
            <p className="text-center text-muted-foreground">Loading FAQs...</p>
          ) : faqs.length === 0 ? (
            <p className="text-center text-muted-foreground">No FAQs available.</p>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="rounded-lg border border-primary/20">
                  <AccordionTrigger className="px-6 text-base text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 text-muted-foreground bg-primary/5">
                    {/* Render HTML safely */}
                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </main>
    </div>
  );
};

export default FAQ;
