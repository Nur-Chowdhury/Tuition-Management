import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import as from "../../assets/as.png";

const faqs = [
  {
    question: "How does EduBridge select its tutors?",
    answer:
      "EduBridge carefully vets tutors based on their qualifications, teaching experience, and expertise in specific subjects. We ensure that each tutor possesses the necessary skills to provide effective one-on-one instruction.",
  },
  {
    question: "Can I choose the tutor I want to work with?",
    answer:
      "Absolutely! At EduBridge, we believe in empowering students to find the best match for their learning needs. You have the freedom to browse through our database of tutors and select the one you feel most comfortable working with.",
  },
  {
    question: "Is EduBridge suitable for students of all ages and grade levels?",
    answer:
      "Yes, EduBridge caters to students of all ages and grade levels, from elementary school to college and beyond. Whether you're a struggling student in need of extra support or an advanced learner seeking enrichment opportunities, EduBridge is here to help.",
  },
  {
    question: "How does EduBridge ensure the quality of its tutoring services?",
    answer:
      "EduBridge is committed to maintaining high standards of quality and excellence in our tutoring services. We regularly monitor and evaluate tutor performance, solicit feedback from students, and update our resources to ensure that every tutoring session is effective and impactful.",
  },
  {
    question: "What sets EduBridge apart from other tutoring platforms?",
    answer:
      "EduBridge stands out for its personalized approach to learning, matching students with tutors who meet their individual needs and preferences. Our commitment to excellence, convenience, and flexibility makes us the premier choice for online tutoring.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section id="faq" className="faq py-16  flex justify-center items-center">
        <div className=" md:w-3/5 items-center md:px-6 bg-blue-100 dark:bg-gray-800 dark:text-white py-8 rounded-3xl">
                <h2 className="text-3xl font-bold text-center mb-8">FAQ</h2>
            <div className=" flex gap-2 items-center accordion-text">
                <div className=" w-2/5 flex justify-center items-center">
                    <img
                        src={as}
                        alt="Accordion Illustration"
                        className="h-48 w-48"
                    />
                </div>
                <div className=" w-3/5 h-96 overflow-y-auto scrollbar-hide rounded-lg p-4">
                    <ul className="faq-text space-y-4">
                    {faqs.map((faq, index) => (
                        <li key={index} className="border-b border-gray-300 pb-4">
                        <div
                            className="question-arrow flex justify-between items-center cursor-pointer"
                            onClick={() => toggleFAQ(index)}
                        >
                            <span className="question font-medium text-lg text-gray-700 dark:text-gray-200">
                            {faq.question}
                            </span>
                            <span>
                            <FaCaretDown
                                className={`transition-all duration-200 ${
                                activeIndex === index ? "rotate-180" : ""
                                }`}
                            />
                            </span>
                        </div>
                        {activeIndex === index && (
                            <p className="mt-2 text-gray-600 dark:text-gray-100">{faq.answer}</p>
                        )}
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
        </div>
    </section>
  );
};

export default FAQ;
