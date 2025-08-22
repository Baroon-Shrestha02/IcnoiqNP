import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Link, WebcamIcon, X } from "lucide-react";

const projectsData = [
  {
    image: "Uploads/momiji2.jpg",
    title: "Momiji International Academy",
    link: "https://momiji.edu.np/",
    subtitle: "Japan-Focused Educational Consultancy",
    description:
      "We designed a dedicated platform for Momiji International Academy, a reputed Japanese language institute. The website features course information, an intuitive enrollment system, student resources, and a mobile-friendly design to help students prepare for study and work opportunities in Japan.",
    tags: ["Poster and Motion Graphics", "Mobile Responsive Application"],
    year: "2025",
    height: 400,
    category: ["Websites", "Branding"],
    longDescription:
      "Momiji International Academy is a specialized educational consultancy dedicated exclusively to helping Nepali students and job seekers build a future in Japan. With a core focus on Japanese language training, higher education consulting, and career support through the Specified Skilled Worker (SSW) program, Momiji offers a holistic pathway for individuals who aspire to study, live, and work in Japan. Their dedicated team of language experts, cultural advisors, and placement specialists ensure that students are equipped with not just linguistic knowledge but also real-world preparedness to succeed in a foreign environment. Whether you're preparing for JLPT levels or gearing up for interviews under Japan’s SSW framework, Momiji’s support system is robust, practical, and deeply personalized. With a track record of guiding hundreds of students and professionals through this life-changing transition, Momiji stands out as a trustworthy and experienced institution for Japan-bound aspirants.",
    longDescription1:
      "When Momiji approached us at IconiqNP, they had a clear vision: to amplify their digital footprint and make their educational offerings more accessible and interactive. Our collaboration began with a deep understanding of their mission and the unique audience they serve. From there, we conceptualized and built a fully customized, modern, and mobile-responsive website tailored to both desktop and mobile users. The website features essential components such as multilingual course pages, an intuitive inquiry system, and easy-to-navigate resources that cater to prospective students and their guardians. We also incorporated event announcements, language class structures, and a clear pathway for users to explore Japan's study and SSW opportunities. To complement their digital presence, we designed engaging poster and motion graphics for Momiji’s seasonal events, class announcements, and cultural festivals, ensuring consistent visual branding across both print and digital platforms.",
    longDescription2:
      "By choosing to partner with IconiqNP, Momiji International Academy witnessed a transformative uplift in both brand visibility and user engagement. Their website now serves as a streamlined hub for course inquiries, student guidance, and institutional branding. Students can explore opportunities, learn about schedules and fees, and even participate in upcoming events—all from the convenience of their mobile devices. The visual identity across posters and marketing collateral has also become more unified and professional, reinforcing Momiji’s reputation as a credible and student-centric consultancy. Ultimately, our collaboration empowered Momiji to better connect with its community and expand its reach to more aspiring candidates seeking a future in Japan.",
    challenge:
      "Momiji International Academy lacked a scalable and modern digital presence.",
    solution:
      "We developed a responsive platform with a focus on user experience, performance, and accessibility for Momiji International Academy.",
    result:
      "Momiji International Academy experienced improved user interaction, higher engagement, and greater online visibility.",
    mediaAssets: [
      "Uploads/works/momiji/img1.jpg",
      "Uploads/works/momiji/img2.jpg",
      "Uploads/works/momiji/img3.jpg",
      "Uploads/works/momiji/img4.jpg",
      "Uploads/works/momiji/img5.jpg",
      "Uploads/works/momiji/img6.jpg",
      "Uploads/works/momiji/img7.jpg",
      "Uploads/works/momiji/img8.jpg",
      "Uploads/works/momiji/img9.jpg",
    ],
  },
  {
    image: "Uploads/kansai2.jpg",
    title: "Kansai International Japanese Language Center",
    link: "https://kansaiinternational.com/",
    subtitle: "Japanese Language Center",
    description:
      "We partnered with Kansai International Japanese Language Center to transform their digital presence and simplify the student journey. The new website offers streamlined access to course details, application forms, and study materials—supporting both local and international learners. With a clean, minimalist UI, the platform is tailored for students preparing for programs like JLPT and SSW, aligning Kansai’s academic excellence with a modern, user-friendly experience that boosts engagement and admissions.",
    tags: ["UX/UI Design", "Poster Design", "Mobile Responsive Application"],
    year: "2025",
    height: 500,
    category: "Websites",
    longDescription:
      "Kansai International Japanese Language Center is a respected educational institution committed to preparing students for academic and professional opportunities in Japan. Known for its strong focus on Japanese language education, Kansai caters to both local and international learners pursuing programs such as JLPT (Japanese Language Proficiency Test) and SSW (Specified Skilled Worker). The center offers culturally immersive instruction and structured language courses designed to align with Japan’s linguistic standards and workforce demands. With a mission to bridge global learners with Japanese education, Kansai needed a digital platform that could reflect its academic credibility and make essential resources more accessible to prospective students.",
    longDescription1:
      "To meet Kansai’s evolving needs, we developed a fully responsive and mobile-optimized website tailored specifically for language learners. Our design process emphasized simplicity, clarity, and accessibility—making it easy for students to find detailed course information, download application forms, and access visa guidance. We used calming visuals inspired by Japanese aesthetics and implemented intuitive navigation to enhance usability. Key call-to-action elements were strategically placed to drive inquiries and student engagement, while a dynamic backend allows the Kansai team to manage content updates, announcements, and schedules without technical assistance.",
    longDescription2:
      "Since the launch of the platform, Kansai International Japanese Language Center has witnessed significant improvement in its digital engagement and lead generation. Students now find it easier to discover and apply for relevant programs from any device, and administrators have reported increased efficiency in managing inquiries and updates. The intuitive design and mobile-first approach have resulted in longer session durations and higher click-through rates. Kansai has also seen growing interest from international applicants, particularly from countries targeting Japanese language certification and work-study pathways. Overall, the project has enabled Kansai to project a modern, accessible, and student-focused digital identity aligned with its academic goals.",
    challenge:
      "Kansai International Japanese Language Center lacked a scalable and modern digital presence.",
    solution:
      "We developed a responsive platform with a focus on user experience, performance, and accessibility for Kansai International Japanese Language Center.",
    result:
      "Kansai International Japanese Language Center experienced improved user interaction, higher engagement, and greater online visibility.",
    mediaAssets: [
      "Uploads/works/ns/img1.jpg",
      "Uploads/works/ns/img2.jpg",
      "Uploads/works/ns/img3.jpg",
    ],
  },
  {
    image: "Uploads/kings.png",
    title: "King Motors Pvt. Ltd",
    link: "https://kingsmotorcomp.com/",
    subtitle: "Premium Car Dealership & Inventory System",
    description:
      "We developed a feature-rich digital platform for King Motors Pvt. Ltd to showcase their reconditioned and premium car listings with real-time updates, full vehicle specs, and lead capture tools. The site includes an intuitive search and filter system, enhancing the browsing and buying experience for customers.",
    tags: ["Inventory Management System", "E-commerce", "Poster Design"],
    year: "2025",
    height: 350,
    category: "Websites",
    longDescription:
      "King Motors Pvt. Ltd is a rising name in Nepal’s automotive retail sector, known for offering a curated selection of premium and reconditioned vehicles. With a commitment to delivering quality and trust, the brand focuses on modernizing the car-buying experience for Nepali customers. Prior to our collaboration, King Motors had limited digital presence and lacked a structured system to manage their growing inventory. The dealership wanted a solution that could streamline vehicle listing, simplify customer interaction, and position them as a credible player in the competitive automobile market.",
    longDescription1:
      "To meet King Motors’ operational and customer engagement goals, we designed a responsive, mobile-first website tailored to the auto industry. We built a robust inventory management system that enables real-time updates on car listings—complete with images, specs (engine, fuel type, mileage, etc.), and pricing. Each listing page was optimized for conversions with quick inquiry options and mobile-friendly layouts. Advanced search and filter functionalities were implemented so users could browse by brand, price, fuel type, or transmission. A minimalist UI with strong branding helped reinforce the dealership’s trust factor. Additionally, we focused on backend efficiency, allowing the internal team to manage inventory without technical bottlenecks. Performance optimization, fast loading times, and an SEO-friendly structure were also key elements of the solution.",
    longDescription2:
      "Since the launch, King Motors has experienced a significant uptick in lead generation and organic web traffic. Users are spending more time browsing listings, and inquiries via the website have increased substantially. The filtering options and clean layout have improved customer satisfaction by making it easier to find the right vehicle. On the administrative side, the internal team now enjoys a smooth workflow when adding or updating listings. The digital transformation has not only enhanced customer engagement but also positioned King Motors as a digitally mature and customer-centric dealership in Nepal's evolving auto market.",
    challenge:
      "King Motors Pvt. Ltd lacked a scalable and modern digital presence.",
    solution:
      "We developed a responsive platform with a focus on user experience, performance, and accessibility for King Motors Pvt. Ltd.",
    result:
      "King Motors Pvt. Ltd experienced improved user interaction, higher engagement, and greater online visibility.",
    mediaAssets: [
      "Uploads/works/kings/img1.jpg",
      "Uploads/works/kings/img2.jpg",
    ],
  },
  {
    image: "Uploads/ns.jpg",
    title: "NS Automobile Pvt. Ltd",
    subtitle: "Certified Auto Dealership – New & Pre-Owned",
    description:
      "For NS Automobile Pvt. Ltd, a trusted name in reconditioned and new vehicles, we crafted a powerful visual and digital branding strategy. Our solutions included digital marketing, posters, motion graphics, and a cohesive brand identity—positioning the dealership competitively in Nepal’s evolving automotive market.",
    tags: ["Poster Design", "Digital Marketing", "Motion Graphics", "Branding"],
    year: "2025",
    height: 350,
    category: ["Branding"],
    longDescription:
      "NS Automobile Pvt. Ltd is a rapidly growing auto dealership in Nepal, offering a range of certified reconditioned and brand-new vehicles. While their physical operations had gained credibility through excellent customer service and vehicle quality, their brand identity lacked the digital polish and consistency to match. NS was facing increasing competition in an industry where digital presence, online engagement, and visual storytelling were becoming vital to customer trust and lead generation. They needed to evolve from being just another car dealer to a recognizable, credible, and emotionally engaging automotive brand. That's when our team was brought in—to align their brand experience with their market ambition.",
    longDescription1:
      "We began by conducting a brand audit and market positioning analysis, which shaped our creative direction for NS Automobile. Our team designed a visually strong and emotionally engaging brand identity, built on professionalism and customer trust. This included a consistent set of branding elements—posters, motion graphics, social media templates, and digital banners—each created with attention to modern aesthetic trends and local customer preferences. We also planned and executed seasonal campaigns, story-driven video ads, and offline marketing materials that carried the same look and tone. Additionally, we delivered a mobile-optimized microsite where users could browse listings, book appointments, or contact sales—all tailored to drive measurable interaction. Every deliverable aimed to connect with digital-first buyers and elevate the dealership’s public image.",
    longDescription2:
      "After launching our campaigns and visuals, NS Automobile quickly saw improvements in brand recognition, social engagement, and customer interest. Their social media posts began attracting significantly more views and shares, while footfall at their physical showroom increased due to well-targeted campaigns. The dealership’s new identity stood out both online and offline—whether on digital feeds, printed flyers, or large-format visuals. Customers praised the professional yet friendly brand image, and the mobile-optimized microsite made inquiries more seamless. Overall, the branding transformation empowered NS to compete with more established dealerships and gain the digital trust of modern car buyers.",
    challenge:
      "NS Automobile Pvt. Ltd had strong offline credibility but lacked cohesive branding and digital visibility.",
    solution:
      "We delivered a full branding and digital activation strategy—poster design, motion graphics, marketing assets, and a responsive digital platform—to elevate their brand identity.",
    result:
      "NS Automobile Pvt. Ltd saw increased engagement, improved brand recognition, and higher customer trust across all digital and physical touchpoints.",
    mediaAssets: [
      "Uploads/works/ns/img1.jpg",
      "Uploads/works/ns/img2.jpg",
      "Uploads/works/ns/img3.jpg",
    ],
  },
  // {
  //   image: "Uploads/doller.jpg",
  //   title: "Doller Sewa",
  //   subtitle: "Digital Subscription & Services Marketplace",
  //   description:
  //     "Doller Sewa is an emerging digital platform that offers affordable subscription-based services like Netflix, Canva, ChatGPT, and more. Aimed at digital consumers and resellers in Nepal, it simplifies access to premium digital tools by offering local payment support, fast delivery, and reliable service. We were brought in to build a centralized, mobile-optimized ordering system to streamline product discovery, ordering, and account delivery.",
  //   tags: ["Digital Marketplace", "Subscription Services", "E-commerce"],
  //   year: "2025",
  //   height: 450,
  //   category: "Websites",
  //   longDescription:
  //     "Doller Sewa is a Nepal-based platform that makes global digital subscriptions more accessible to local users. From entertainment (Netflix, YouTube Premium) and design tools (Canva, Adobe) to productivity software (ChatGPT Plus, Grammarly Premium), the platform bridges the gap between international services and local demand. Prior to our collaboration, the service was operated manually through social media, lacking a structured, scalable, and secure system. Customers had no self-service portal to browse subscriptions, place orders, or receive account credentials efficiently.",
  //   longDescription1:
  //     "To transform Doller Sewa into a full-scale digital service marketplace, we developed a responsive, mobile-friendly e-commerce platform. Users can now explore categorized digital services, view package details, and purchase subscriptions directly from the website. We integrated secure payment options (including local gateways), automated confirmation systems, and a delivery workflow that connects customers with their digital accounts seamlessly. The UI is clean, fast, and tailored for both individual buyers and resellers. Additionally, we included tools for customer support and bulk orders to support business growth.",
  //   longDescription2:
  //     "After launch, Doller Sewa saw increased order volume, better user retention, and a reduction in manual operations. Customers appreciated the convenience of instant access to popular subscriptions at affordable rates, all within a secure, intuitive environment. The streamlined interface and backend automation allowed Doller Sewa to scale operations while maintaining excellent customer service. Today, it stands as a reliable gateway for Nepali users to access international digital tools with local simplicity.",
  //   challenge:
  //     "Doller Sewa lacked a modern, automated platform to scale subscription-based digital services.",
  //   solution:
  //     "We developed a fast, secure, and user-focused digital platform that automates the ordering and delivery of subscription services.",
  //   result:
  //     "Doller Sewa gained efficiency, improved order management, and significantly enhanced customer satisfaction and growth.",
  //   mediaAssets: [
  //     "Uploads/doller_1.jpg",
  //     "Uploads/doller_2.png",
  //     "Uploads/doller_demo.mp4",
  //   ],
  // },
  {
    image: "Uploads/omni2.png",
    title: "Omni Global International Educational Consultancy",
    link: "https://omniglobaledu.com/",
    subtitle:
      "Your Gateway to Global Education – Japan, Cyprus, Finland & Korea",
    description:
      "Omni Global is a trusted education consultancy specializing in study abroad programs for Japan, Cyprus, Finland, and South Korea. We designed their digital platform to streamline university selection, visa processing, application tracking, and document submission. The system includes a dynamic CMS and mobile-first design for effortless access.",
    tags: ["Mobile Responsive Application"],
    year: "2025",
    height: 380,
    category: "Websites",
    longDescription:
      "Omni Global International Educational Consultancy is a trusted name among Nepali students aspiring to study abroad. With a multi-country focus—Japan, Cyprus, Finland, and South Korea—Omni Global provides complete educational counseling, from university selection to visa and document support. Their advisors bring deep regional expertise and a student-first philosophy, helping candidates navigate every phase of their academic journey. Whether it's preparing for Japanese language exams or choosing the right European university, Omni Global ensures that students are guided with precision, ethics, and a global outlook. Their expanding portfolio and positive student success stories are a testament to their credibility and impact in Nepal's study abroad ecosystem.",
    longDescription1:
      "Our collaboration with Omni Global started with the goal of creating a centralized platform that enhances their service delivery. We designed and built a fully mobile-responsive website that caters to students, parents, and consultants alike. The platform includes step-by-step program overviews, destination-specific service pages, intuitive inquiry forms, and dynamic resources to guide students through eligibility, application, and departure processes. Additionally, we developed a custom content management dashboard, enabling Omni Global's team to update courses, announcements, blogs, and intake deadlines without technical dependencies. Visual elements and UX were strategically designed to align with student behavior and information-seeking patterns.",
    longDescription2:
      "Since launching the platform, Omni Global has experienced a tangible uplift in lead generation, streamlined inquiry handling, and better follow-up rates. Students can now access information 24/7, submit pre-application forms online, and receive destination-specific guidance with ease. For administrators, the CMS has reduced content update friction, improving time-to-market for new announcements and services. As a result, Omni Global is now positioned as a tech-enabled education consultancy, delivering fast, transparent, and modern support for international student mobility.",
    challenge:
      "Omni Global lacked a centralized digital platform for guiding students through the consultation and application process.",
    solution:
      "We delivered a mobile-optimized website with user-friendly content management and step-by-step guidance workflows.",
    result:
      "Omni Global observed improved inquiry rates and better engagement across all student touchpoints.",
    mediaAssets: [
      "Uploads/omni_1.jpg",
      "Uploads/omni_2.png",
      "Uploads/omni_demo.mp4",
    ],
  },
  {
    image: "Uploads/ghar.jpg",
    title: "Ghar Sansar Pvt. Ltd",
    subtitle: "Hardware & Home Essentials Supplier",
    description:
      "For Ghar Sansar Pvt. Ltd, we built a sleek e-commerce website for showcasing their home improvement products. The platform includes a social-commerce-ready catalog, custom UI/UX for easier ordering, and responsive design for customers browsing on mobile devices.",
    tags: ["UX/UI Design", "Social Commerce", "Mobile Responsive Application"],
    year: "2025",
    height: 380,
    category: ["Designing", "Websites"],
    longDescription:
      "Ghar Sansar Pvt. Ltd is a trusted supplier of hardware, home improvement tools, and essential household products in Nepal. Despite having a wide selection of quality goods—from tiles and plumbing fixtures to paint and kitchen hardware—their operations were limited to traditional in-store sales. As consumer behavior shifted rapidly toward online shopping, Ghar Sansar recognized the need for a modern digital platform to remain competitive. They approached us with a clear vision: to establish an online presence that would not only showcase their products beautifully but also allow customers to browse and order seamlessly from any device.",
    longDescription1:
      "To address Ghar Sansar’s goals, we designed and developed a mobile-first e-commerce website tailored for the hardware and home essentials market. The platform features clean UI/UX, category-based filtering, and a simplified ordering process. Products are smartly organized into intuitive categories, enabling users to quickly explore offerings like bathroom accessories, plumbing tools, tiles, lighting, and more. We also implemented a scalable architecture that supports social commerce integration with platforms like Facebook and Instagram. Every page was built with performance, responsiveness, and usability in mind—ensuring smooth navigation for both individual customers and B2B clients placing bulk orders. Our design emphasized clarity and ease-of-use, reflecting the brand’s professionalism and approachability.",
    longDescription2:
      "Following the launch of the new platform, Ghar Sansar witnessed an immediate shift in engagement and ordering behavior. Customers across Nepal began exploring their catalog online, placing direct orders, and making product inquiries without visiting the physical store. The digital storefront helped reduce reliance on foot traffic, improved operational efficiency, and expanded their market reach. With faster service response and a user-friendly digital interface, the business gained a competitive edge in the home improvement sector. Ghar Sansar is now well-positioned for future digital growth, with a scalable foundation to support marketing campaigns, loyalty programs, and social selling.",
    challenge:
      "Ghar Sansar faced limitations selling their products without a proper e-commerce presence.",
    solution:
      "We developed a responsive e-commerce site with product filtering, easy ordering, and mobile-first design.",
    result:
      "Ghar Sansar experienced growth in online orders and reduced dependency on physical foot traffic.",
    mediaAssets: ["Uploads/works/ghar/img1.jpg", "Uploads/works/ghar/img2.jpg"],
  },
  {
    image: "Uploads/nisani.jpg",
    title: "Nisani Educational Consultancy Pvt. Ltd",
    subtitle: "Japan-Focused Educational Consultancy",
    description:
      "Nisani Educational Consultancy specializes in helping students navigate the Japanese education system. Our team created a clean, accessible platform showcasing available language programs, university guidance, document checklists, and a contact system for one-on-one counseling support.",
    tags: ["Poster and Motion Graphics", "Mobile Responsive Application"],
    year: "2025",
    height: 380,
    category: "Designing",
    longDescription:
      "Nisani Educational Consultancy Pvt. Ltd is a specialized education advisory firm focused on guiding students toward academic opportunities in Japan. With expertise in Japanese language programs, university pathways, and visa documentation, Nisani plays a vital role in bridging the gap between Nepali students and institutions in Japan. However, they lacked a comprehensive and accessible digital platform to communicate their services effectively. Their growing student base and increasing inquiry volume demanded a solution that was mobile-friendly, information-rich, and easy to navigate. Our mission was to help them build a professional, functional, and engaging online presence that could serve both as an information hub and a communication channel.",
    longDescription1:
      "To meet Nisani's needs, we designed and developed a clean, mobile-responsive website tailored to students interested in Japanese education. The platform features well-organized sections on language programs, university guidance, downloadable forms, and document checklists, along with clearly structured application steps. A major focus was creating a smooth user journey—whether someone wanted to explore available courses, learn about studying in Japan, or get in touch with a counselor. We integrated a dedicated contact system that enables students to book one-on-one counseling or submit inquiries quickly. Additionally, we supported the brand with visually engaging poster and motion graphic content, enhancing both online and offline promotional campaigns. The design language emphasizes trust, clarity, and simplicity—aligning perfectly with the values of an educational consultant.",
    longDescription2:
      "The launch of the new platform brought immediate value to Nisani Educational Consultancy. With improved structure and mobile compatibility, student registrations increased, and inquiries became more streamlined and easier to manage. Students could now access all essential resources—like course details, forms, and guidance—without confusion or delays. The consultancy team reported that the site helped reduce repetitive questions, allowing them to focus more on personalized support. Most importantly, the platform helped position Nisani as a credible and reliable brand in the Japan-focused education space, strengthening their reputation among students and partner institutions alike.",
    challenge:
      "They lacked a comprehensive website to communicate their services and application processes clearly.",
    solution:
      "We delivered a responsive, easily navigable platform with downloadable forms, language program details, and contact options.",
    result:
      "Nisani experienced increased student registrations and more streamlined inquiries.",
    mediaAssets: [
      "Uploads/works/nisani/img1.jpg",
      "Uploads/works/nisani/img2.jpg",
      "Uploads/works/nisani/img3.jpg",
      "Uploads/works/nisani/img4.jpg",
      "Uploads/works/nisani/img5.jpg",
      "Uploads/works/nisani/img6.jpg",
      "Uploads/works/nisani/img7.jpg",
      "Uploads/works/nisani/img9.jpg",
      "Uploads/works/nisani/img10.jpg",
      "Uploads/works/nisani/img11.jpg",
      "Uploads/works/nisani/img12.jpg",
      "Uploads/works/nisani/img13.jpg",
      "Uploads/works/nisani/img14.jpg",
    ],
  },
  {
    image: "Uploads/sanskar.jpg",
    title: "Sanskar Academy",
    subtitle: "Vastu Training & Educational Institute",
    description:
      "Sanskar Academy offers professional Vastu-related training programs focused on ancient principles of space, energy, and balance. We supported their educational mission by creating a cohesive visual identity through posters, graphics, and motion-based content that enhanced their promotional reach and brand engagement.",
    tags: ["Poster and Graphics Design", "Ads and Motion Graphics"],
    year: "2025",
    height: 380,
    category: "Designing",
    longDescription:
      "Sanskar Academy is a specialized institute committed to educating individuals in the field of Vastu Shastra—an ancient Indian science focused on harmonizing environments through spatial alignment and energy flow. With growing demand for structured Vastu education, Sanskar Academy aimed to extend its reach by establishing a professional and consistent visual identity. However, their previous branding lacked visual impact and emotional resonance with modern learners. They needed compelling visual content to reflect the depth of their subject matter and attract a broader audience through digital and print campaigns. That’s where our team came in—to build a strong, culturally grounded visual presence using impactful design and motion storytelling.",
    longDescription1:
      "Our creative approach focused on combining traditional aesthetics with modern visual trends to capture the essence of Vastu education. We developed a wide range of poster templates, course banners, and motion graphics tailored to Sanskar Academy’s training offerings, including certification programs, workshops, and awareness sessions. The visual system utilized earth-tone palettes, geometric symbolism, and calm typographic layouts to convey clarity, balance, and professionalism. Animated explainer videos were also designed to communicate Vastu concepts in a simplified, engaging format—ideal for use in ads, reels, and educational intros. All assets were optimized for both print and digital platforms, ensuring consistency across marketing channels.",
    longDescription2:
      "Following the branding rollout, Sanskar Academy reported higher visibility in both online and offline campaigns. The motion-driven visuals attracted strong attention on social platforms, while the poster series gave their seminars and workshops a polished, professional appearance. Students and instructors responded positively to the new visual identity, noting its alignment with the cultural roots and scientific depth of Vastu Shastra. With a stronger brand recall and a clearer way to communicate their offerings, Sanskar Academy has become more recognizable and respected within Nepal’s growing alternative education and spiritual wellness landscape.",
    challenge:
      "Sanskar Academy lacked a modern visual identity that aligned with the depth and cultural relevance of Vastu education.",
    solution:
      "We delivered a cohesive branding package with print-ready posters, animated promotional content, and a visually grounded design system.",
    result:
      "Sanskar Academy gained stronger brand visibility, improved outreach, and higher engagement across digital and offline channels.",
    mediaAssets: [
      "Uploads/works/sarkar/img1.jpg",
      "Uploads/works/sarkar/img2.jpg",
      "Uploads/works/sarkar/img3.jpg",
      "Uploads/works/sarkar/img4.jpg",
      "Uploads/works/sarkar/img5.jpg",
      "Uploads/works/sarkar/img6.jpg",
      "Uploads/works/sarkar/img7.jpg",
      "Uploads/works/sarkar/img8.jpg",
      "Uploads/works/sarkar/vid1.mp4",
    ],
  },
  {
    image: "Uploads/namodebi.jpg",
    title: "Navadebi Jewellers",
    subtitle: "Jewelry Retailer",
    description:
      "Navadebi Jewellers needed a stylish yet functional site to showcase their traditional and modern collections. We designed a responsive product gallery, added inquiry and appointment booking features, and optimized it for mobile shoppers with clean UI and bold visuals.",
    tags: ["UX/UI Design", "Mobile Responsive Application"],
    year: "2025",
    height: 380,
    category: "Websites",
    longDescription:
      "Navadebi Jewellers, a trusted name in traditional and contemporary jewelry retail, approached us with a vision to establish a refined and immersive digital presence. Known for their intricate gold and diamond pieces, they wanted a platform that could reflect the elegance of their craftsmanship while appealing to modern, digitally active customers—especially younger buyers accustomed to browsing and shopping on mobile devices. Their existing digital footprint lacked the sophistication and functionality necessary to compete with other premium jewelry brands online. Our goal was to transform their digital storefront into a visually luxurious and user-friendly experience that would attract attention, drive engagement, and encourage showroom visits.",
    longDescription1:
      "We designed and developed a gallery-first, mobile-optimized website that puts the spotlight on Navadebi's rich product collection. The platform features a clean, minimalist UI to let the beauty of the jewelry shine, while also incorporating user-friendly navigation for easy exploration. High-resolution visuals, subtle animations, and intuitive product categorization ensure that visitors can engage with the pieces in a seamless and aesthetically pleasing way. In addition to the product showcase, we built custom inquiry and appointment booking forms, allowing potential customers to request details or book showroom visits directly from the site. With performance optimization for mobile devices and a design language inspired by luxury retail, the website now mirrors the sophistication of the Navadebi brand while providing practical tools for customer interaction.",

    longDescription2:
      "The new digital experience resulted in a significant uptick in customer engagement, particularly among mobile users. Navadebi Jewellers reported a clear increase in both online product inquiries and walk-in appointments, directly attributable to the new site’s booking functionality and mobile responsiveness. Customers found the product browsing experience smoother, more organized, and visually appealing—creating a stronger emotional connection with the brand. The site also allowed Navadebi to build trust and brand value digitally, positioning them competitively alongside established jewelry retailers in the online space. Ultimately, the project gave Navadebi Jewellers not just a website, but a powerful marketing and engagement platform tailored for the modern shopper.",
    challenge:
      "They lacked a compelling platform to attract younger digital-native buyers.",
    solution:
      "We crafted a modern gallery-first website with booking forms, inquiry options, and performance optimization for mobile.",
    result:
      "Navadebi Jewellers saw a noticeable rise in product inquiries and client walk-ins through online appointments.",
    mediaAssets: [
      "Uploads/navadebi_1.jpg",
      "Uploads/navadebi_2.png",
      "Uploads/navadebi_demo.mp4",
    ],
  },
  {
    image: "Uploads/works/gsr/gsr.png",
    title: "GSR Educational Consultancy",
    subtitle: "Study Abroad Consultancy",
    description:
      "GSR Educational Consultancy specializes in guiding students who want to pursue higher education in Japan and Korea. We designed and developed a responsive website that highlights their services, programs, and application process, helping them connect with aspiring students more effectively.",
    tags: ["Web Design", "Responsive Website", "Education & Consultancy"],
    year: "2025",
    height: 380,
    category: "Websites",
    longDescription:
      "GSR Educational Consultancy is dedicated to supporting students in achieving their dreams of studying abroad, with a strong focus on opportunities in Japan and Korea. Their team provides personalized guidance for admissions, language preparation, and cultural orientation. However, before working with us, they lacked a modern digital presence to communicate their services and engage with a larger student audience online. Our goal was to build a professional, mobile-friendly website that would act as both an informational hub and a first point of contact for prospective students.",
    longDescription1:
      "We designed and developed a responsive website that clearly outlines GSR’s study abroad programs, admission support, and language training services. The platform was built with user-friendly navigation to help students quickly find details about studying in Japan or Korea, while also including inquiry and contact forms to simplify communication. With a clean and professional look, the site builds trust while being accessible on all devices—ensuring students and parents can easily access information anytime, anywhere.",
    longDescription2:
      "The new website has allowed GSR Educational Consultancy to establish a stronger digital identity and expand their reach among students seeking opportunities abroad. By making program information clear and easily accessible online, the consultancy has seen increased inquiries and engagement. The responsive design also ensures that students browsing from mobile devices—often the primary medium for younger audiences—have a seamless experience. Overall, the website became a valuable tool for GSR to promote their expertise in Japan and Korea study programs, attract more students, and build credibility in the competitive consultancy space.",
    challenge:
      "They lacked an online presence to effectively communicate their study abroad programs and services.",
    solution:
      "We created a responsive, user-friendly website that showcases their Japan and Korea study opportunities while making it easy for students to reach out.",
    result:
      "GSR Educational Consultancy now engages with more students online, receiving higher inquiries and building trust through a modern digital presence.",
    mediaAssets: [
      "Uploads/gsr_1.jpg",
      "Uploads/gsr_2.png",
      "Uploads/gsr_demo.mp4",
    ],
  },
  {
    image: "Uploads/works/sherpa/sherpa.png",
    title: "Hotel Sherpa Soul",
    subtitle: "Home Stay",
    description:
      "Hotel Sherpa Soul, a warm and welcoming homestay in the heart of Thamel, wanted a digital presence that could reach both local Nepali travelers and international tourists. We created a professional website highlighting their services and integrated booking features, helping them connect with a wider audience through their personal site as well as platforms like Booking.com.",
    tags: ["Web Design", "Travel & Hospitality", "Booking Integration"],
    year: "2025",
    height: 380,
    category: "Websites",
    longDescription:
      "Hotel Sherpa Soul, located in the vibrant neighborhood of Thamel, Kathmandu, is a family-run homestay that welcomes both Nepali guests and international travelers. Known for its authentic hospitality, cultural warmth, and convenient location, the guest house provides not only comfortable accommodations but also guidance for tours, treks, and local exploration. While the hotel was well-regarded offline, it lacked a strong digital presence to showcase its unique offerings and reach global travelers searching online. Our objective was to build a modern, functional website and connect them to trusted booking platforms, ensuring they could expand their market and increase direct reservations.",
    longDescription1:
      "We designed and developed a clean, mobile-optimized website that highlights the charm of Hotel Sherpa Soul while making it easy for guests to learn about facilities, services, and local experiences. The website integrates essential features such as photo galleries, room details, and contact information, alongside direct inquiry and booking options. To enhance visibility, we also connected the guest house to international booking platforms like Booking.com, ensuring seamless accessibility for global travelers. The design emphasizes simplicity, trust, and usability, creating an inviting online presence that mirrors the warmth of the hotel’s hospitality.",
    longDescription2:
      "The new digital presence helped Hotel Sherpa Soul significantly expand its reach. By combining a professional website with Booking.com integration, the homestay began attracting more inquiries from both domestic and international travelers. Guests appreciated the ease of browsing accommodations, viewing facilities, and making bookings online, which streamlined the entire customer journey. Beyond just generating reservations, the platform also strengthened the hotel’s reputation, giving it a credible and competitive edge in the crowded Thamel hospitality market.",
    challenge:
      "They needed an online presence to attract both local and international guests and compete in Thamel’s hospitality market.",
    solution:
      "We built a professional website with booking functionality and integrated their listing with Booking.com to increase visibility.",
    result:
      "Hotel Sherpa Soul now connects with a global audience, receiving more bookings and inquiries directly through their website and international platforms.",
    mediaAssets: [
      "Uploads/hotel_sherpa_1.jpg",
      "Uploads/hotel_sherpa_2.png",
      "Uploads/hotel_sherpa_demo.mp4",
    ],
  },
];

//racing, arkob

function Cursor({ isVisible, position, text }) {
  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-30 bg-black text-white px-4 py-2 text-sm font-medium"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
    >
      {text}
    </motion.div>
  );
}

function ProjectCard({ project, index, onHover, onLeave, onClick }) {
  return (
    <motion.div
      className="group relative flex flex-col break-inside-avoid mb-12 group"
      layoutId={`card-container-${project.title}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <motion.div
        className="relative overflow-hidden shadow-lg cursor-none rounded-xl"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={onClick}
        layoutId={`card-image-${project.title}`}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
          style={{ height: project.height }}
          layoutId={`image-${project.title}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
          <div className="flex flex-wrap gap-1 mb-2">
            {project.tags.slice(0, 2).map((tag, tagIndex) => (
              <div className="absolute bottom-2 left-6 right-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tags &&
                    project.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-black/70 backdrop-blur-sm text-xs rounded-full text-white"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
                {/* Description */}
                <p className="text-white text-md font-light leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <div className="mt-4 px-2">
        <motion.h3
          className="text-lg md:text-xl font-semibold text-gray-900 line-clamp-2"
          layoutId={`title-${project.title}`}
        >
          {project.title}
        </motion.h3>
        <div className="w-8 h-1 bg-black/40 rounded-full mt-2 transition-all duration-500 ease-in-out group-hover:w-16 group-hover:bg-black"></div>
      </div>
    </motion.div>
  );
}

export default function AllProjects() {
  const [cursorState, setCursorState] = useState({
    isVisible: false,
    position: { x: 0, y: 0 },
    text: "View Project",
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [activeCategory, setActiveCategory] = useState("All");

  // Calculate categories with counts
  const categories = useMemo(() => {
    const categoryCount = projectsData.reduce((acc, project) => {
      const categories = Array.isArray(project.category)
        ? project.category
        : [project.category];

      categories.forEach((cat) => {
        acc[cat] = (acc[cat] || 0) + 1;
      });

      return acc;
    }, {});

    return [
      { name: "All", count: projectsData.length },
      ...Object.entries(categoryCount).map(([name, count]) => ({
        name,
        count,
      })),
    ];
  }, []);

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projectsData;
    }
    return projectsData.filter((project) => {
      const categories = Array.isArray(project.category)
        ? project.category
        : [project.category];
      return categories.includes(activeCategory);
    });
  }, [activeCategory]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorState((prev) => ({
        ...prev,
        position: { x: e.clientX, y: e.clientY },
      }));
    };

    if (cursorState.isVisible) {
      document.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [cursorState.isVisible]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const handleMouseEnter = () => {
    setCursorState((prev) => ({ ...prev, isVisible: true }));
    document.body.style.cursor = "none";
  };

  const handleMouseLeave = () => {
    setCursorState((prev) => ({ ...prev, isVisible: false }));
    document.body.style.cursor = "auto";
  };

  const handleProjectClick = (project, index) => {
    setSelectedProject(project);
    setSelectedIndex(index);
    document.body.style.cursor = "auto";
    setCursorState((prev) => ({ ...prev, isVisible: false }));
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setSelectedIndex(null);
  };

  const handleCategoryChange = (categoryName) => {
    setActiveCategory(categoryName);
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    if (selectedProject) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [selectedProject]);

  function SmallerCategories() {
    return <></>;
  }
  return (
    <div className="container mx-auto px-6 py-20 min-h-screen relative">
      <div className="mb-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="flex-1">
          <div className="text-4xl md:text-6xl text-gray-900 mb-4">
            Our{" "}
            <span className="logo bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold">
              Works
            </span>
          </div>
          <div className="max-w-2xl text-lg md:text-xl font-extralight text-gray-600">
            Showcasing our collection of ideas that we've brought to life —
            crafted with strategy, creativity, and purpose.
          </div>
        </div>

        {/* Categories */}
        <div className="lg:ml-8">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.name}
                onClick={() => handleCategoryChange(category.name)}
                className={`flex items-center justify-between w-full text-left transition-all duration-300 group ${
                  activeCategory === category.name
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text"
                    : "text-gray-700 hover:text-gray-900"
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-medium">{category.name}</span>
                <motion.span
                  className={`ml-20 px-2 py-1 rounded-full  text-md font-semibold minw-[24px] text-center ${
                    activeCategory === category.name
                      ? "bg-white/20"
                      : "text-gray-600"
                  }`}
                  layout
                >
                  {category.count}
                </motion.span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      {windowWidth >= 768 && (
        <AnimatePresence>
          <Cursor
            isVisible={cursorState.isVisible}
            position={cursorState.position}
            text={cursorState.text}
          />
        </AnimatePresence>
      )}

      {/* Masonry Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-0"
          style={{ columnFill: "balance" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={`${project.title}-${activeCategory}`}
              project={project}
              index={index}
              onHover={handleMouseEnter}
              onLeave={handleMouseLeave}
              onClick={() => handleProjectClick(project, index)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Modal */}
      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Modal Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[9998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleCloseModal}
            />

            {/* Modal Content */}
            <motion.div
              className="fixed inset-0 z-[9999] overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close button */}
              <motion.button
                className="fixed top-6 right-6 z-[10000] text-white hover:text-gray-300 transition-colors p-2 rounded-full bg-white/10 backdrop-blur-sm"
                onClick={handleCloseModal}
                initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 180 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>

              <div className="min-h-screen flex flex-col">
                {/* Hero Section */}
                <div className="flex-1 flex items-center justify-center p-6 md:p-8">
                  <div className="max-w-7xl w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                      {/* Image */}
                      <motion.div
                        className="relative overflow-hidden rounded-2xl shadow-2xl"
                        layoutId={`card-image-${selectedProject.title}`}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        <motion.img
                          src={selectedProject.image}
                          alt={selectedProject.title}
                          className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
                          layoutId={`image-${selectedProject.title}`}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </motion.div>

                      {/* Content */}
                      <div className="text-white space-y-6">
                        <motion.div
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3, duration: 0.6 }}
                        >
                          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                            <span className="bg-white/10 px-2 py-1 rounded">
                              {selectedProject.year}
                            </span>
                            <span>•</span>
                            <span>{selectedProject.title}</span>
                          </div>

                          <motion.h1
                            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                            layoutId={`title-${selectedProject.title}`}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                          >
                            {selectedProject.title}
                          </motion.h1>

                          <motion.p
                            className="text-lg md:text-xl font-extralight text-gray-300 mb-6"
                            layoutId={`subtitle-${selectedProject.title}`}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                          >
                            {selectedProject.subtitle}
                          </motion.p>
                          {selectedProject.link && (
                            <motion.p
                              className="text-lg md:text-xl font-extralight flex items-center gap-2 text-gray-300 mb-6"
                              layoutId={`subtitle-${selectedProject.title}`}
                              transition={{ duration: 0.6, ease: "easeInOut" }}
                            >
                              <a
                                href={selectedProject.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:text-white transition-colors"
                              >
                                <Globe size={20} />
                                {selectedProject.title}
                              </a>
                            </motion.p>
                          )}
                        </motion.div>

                        {/* Short Description */}
                        <motion.p
                          className="text-base md:text-lg text-gray-200 leading-relaxed"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.6 }}
                        >
                          {selectedProject.description}
                        </motion.p>

                        {/* Tags */}
                        <motion.div
                          className="flex flex-col"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7, duration: 0.6 }}
                        >
                          {/* <div className="mb-3">What we did:</div> */}
                          <div className="flex items-center gap-2 flex-wrap">
                            {selectedProject.tags.map((tag, tagIndex) => (
                              <motion.span
                                key={tagIndex}
                                className="px-3 py-1 bg-white/10 text-white rounded-full text-sm backdrop-blur-sm border border-white/20"
                                whileHover={{
                                  scale: 1.05,
                                  backgroundColor: "rgba(255,255,255,0.2)",
                                }}
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Challenge / Solution / Result */}
                <motion.div
                  className="bg-white/5 backdrop-blur-sm p-6 md:p-8 border-t border-white/10"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                >
                  <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-white">
                      {["challenge", "solution", "result"].map(
                        (key, i) =>
                          selectedProject[key] && (
                            <motion.div
                              key={key}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: 1.3 + i * 0.1,
                                duration: 0.6,
                              }}
                            >
                              <h3
                                className={`text-lg font-semibold mb-3 ${
                                  key === "challenge"
                                    ? "text-purple-400"
                                    : key === "solution"
                                    ? "text-blue-400"
                                    : "text-green-400"
                                }`}
                              >
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                              </h3>
                              <p className="text-gray-300 text-sm md:text-base">
                                {selectedProject[key]}
                              </p>
                            </motion.div>
                          )
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Media Assets Section */}
                {selectedProject.mediaAssets?.length > 0 && (
                  <motion.div
                    className="bg-white/5 backdrop-blur-sm py-10 px-6 md:px-10 border-t border-white/10"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.7, duration: 0.6 }}
                  >
                    <motion.div
                      className="container mx-auto flex flex-col gap-6 mb-12"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55, duration: 0.6 }}
                    >
                      {selectedProject.longDescription && (
                        <motion.div
                          className="space-y-6 container mx-auto px-4 md:px-6 py-8 bg-black/40 backdrop-blur rounded-2xl shadow-lg"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.6 }}
                        >
                          {/* Main Heading */}
                          <motion.h2
                            className="text-2xl md:text-3xl font-bold text-white"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                          >
                            Works for {selectedProject.title}
                          </motion.h2>

                          {/* Section 1: About the Client */}
                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                          >
                            <h3 className="text-lg md:text-xl font-bold text-gray-300">
                              About {selectedProject.title}
                            </h3>
                            <p className="text-base md:text-lg text-gray-200 leading-relaxed text-justify">
                              {selectedProject.longDescription}
                            </p>
                          </motion.div>

                          {/* Section 2: What We Did */}
                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                          >
                            <h3 className="text-lg md:text-xl font-bold text-gray-300">
                              Our Approach & Solution
                            </h3>
                            <p className="text-base md:text-lg text-gray-200 leading-relaxed text-justify">
                              {selectedProject.longDescription1}
                            </p>
                          </motion.div>

                          {/* Section 3: Outcome */}
                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                          >
                            <h3 className="text-lg md:text-xl font-bold text-gray-300">
                              Results & Impact
                            </h3>
                            <p className="text-base md:text-lg text-gray-200 leading-relaxed text-justify">
                              {selectedProject.longDescription2}
                            </p>
                          </motion.div>
                        </motion.div>
                      )}

                      {/* Tags */}
                      <motion.div
                        className="flex flex-col"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                      >
                        <div className="mb-3 text-lg md:text-xl mt-4 font-bold text-white">
                          What we did:
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          {selectedProject.tags.map((tag, tagIndex) => (
                            <motion.span
                              key={tagIndex}
                              className="px-3 py-1 bg-white/10 text-white rounded-full text-sm backdrop-blur-sm border border-white/20"
                              whileHover={{
                                scale: 1.05,
                                backgroundColor: "rgba(255,255,255,0.2)",
                              }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                    <div className="max-w-7xl mx-auto">
                      <h2 className="text-white text-2xl md:text-3xl  font-bold mb-6">
                        Project Visuals & Media
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {selectedProject.mediaAssets.map((media, i) =>
                          media.endsWith(".mp4") ? (
                            <video
                              key={i}
                              src={media}
                              autoPlay
                              muted
                              loop
                              playsInline
                              className="rounded-lg w-full h-auto max-h-[300px] object-cover"
                            />
                          ) : (
                            <img
                              key={i}
                              src={media}
                              alt={`media-${i}`}
                              className="rounded-lg w-full h-auto max-h-[300px] object-cover"
                            />
                          )
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
