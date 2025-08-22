// FAQSection.jsx
import React from "react";
import Accordion from "../HelperComponents/Accordion";

const FAQSection = () => {
  const faqData = [
    {
      question: "What kind of digital solutions does Iconiq provide?",
      answer: (
        <div className="space-y-4">
          <p>
            At Iconiq, we offer a wide range of digital services tailored to
            meet modern business needs. Our core offerings include website
            design and development, digital marketing, branding and identity,
            custom web applications, and ongoing technical support.
          </p>
          <p>
            Whether you're a startup building your online presence or an
            established business looking to scale, we help you create meaningful
            digital experiences that connect with your customers and drive
            results.
          </p>
        </div>
      ),
    },
    {
      question: "How does Iconiq stand out from other IT solution providers?",
      answer: (
        <div className="space-y-4">
          <p>
            What makes Iconiq different is our focus on both creativity and
            technical excellence. We combine beautiful design with strong
            functionality, ensuring the digital products we deliver are
            user-friendly, fast, and aligned with your business goals.
          </p>
          <p>
            We work closely with clients, focusing on real-world challenges, and
            tailor each project with care rather than using a one-size-fits-all
            approach.
          </p>
        </div>
      ),
    },
    {
      question:
        "Can Iconiq handle projects for clients based in other countries?",
      answer: (
        <div className="space-y-4">
          <p>
            Yes, absolutely. We work with clients from different countries and
            time zones with ease. Our team is experienced in handling remote
            projects through collaborative tools, organized communication, and
            flexible work hours.
          </p>
          <p>
            Whether you’re in Asia, Europe, or the U.S., we ensure timely
            updates and maintain a transparent workflow to keep you involved at
            every stage.
          </p>
        </div>
      ),
    },
    {
      question: "What is the cost of developing a website or app with Iconiq?",
      answer: (
        <div className="space-y-4">
          <p>
            The cost of a project depends on the type, features, and complexity.
            We offer flexible pricing models — from fixed-cost packages for
            basic websites to custom quotes for advanced applications or
            long-term collaborations.
          </p>
          <p>
            After an initial discussion, we provide a detailed proposal
            outlining timelines, costs, and deliverables so you can make an
            informed decision.
          </p>
        </div>
      ),
    },
    {
      question: "Does Iconiq work with startups and small businesses?",
      answer: (
        <div className="space-y-4">
          <p>
            Yes! We love working with startups and small businesses. Iconiq
            provides end-to-end support — from branding and digital presence
            setup to product design and marketing.
          </p>
          <p>
            We understand tight budgets and fast-moving timelines, and we’re
            happy to adapt our services to fit your needs while still delivering
            high-quality results.
          </p>
        </div>
      ),
    },

    {
      question: "Do you work with startups?",
      answer: (
        <div className="space-y-4">
          <p>
            Absolutely! We have extensive experience working with startups at
            various stages, from early-stage companies defining their MVP to
            growth-stage startups scaling their products.
          </p>
          <p>
            We understand the unique challenges startups face and can adapt our
            processes to work within startup timelines and budgets. Our team has
            helped numerous startups successfully launch and scale their
            products.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen text-gray-900 xt-white">
      <div className="container mx-auto px-6 py-20">
        <div className="mb-16  text-center flex items-center justify-center flex-col gap-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Frequently Asked Questions (
            <span className="bg-gradient-to-r from-[#C848C1] to-[#54A6F9] bg-clip-text text-transparent">
              FAQ
            </span>
            )❓
          </h1>
          <p className="text-center text-lg md:text-xl max-w-3xl">
            Got questions about how Iconiq can support your business? Here are
            some common queries from our clients to help you better understand
            our digital services, process, and what to expect when working with
            us.
          </p>
        </div>
        <Accordion items={faqData} />
      </div>
    </div>
  );
};

export default FAQSection;
