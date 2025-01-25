const AboutUs = () => {

  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
};

  return (
    <section id="about" className="about-us py-16">
      <div className="about w-4/5 bg-blue-50 dark:bg-gray-900 mx-auto flex flex-col-reverse md:flex-row items-center gap-8 rounded-xl shadow-md p-4 justify-center">
        {/* Optional Image Placeholder */}
        {/* Uncomment and replace `src` if needed */}
        {/* <img src="/assets/girl.png" alt="About Us" className="w-full md:w-1/2 object-cover" /> */}
        <div className="text md:w-2/3 space-y-6 text-center">
          <h2 className="text-4xl font-bold text-blue-700">About Us</h2>
          <h5 className="text-xl font-medium text-gray-800 dark:text-gray-100">
            <span className="text-blue-700 font-semibold">EduBridge:</span> Elevating Education in Bangladesh with Personalized Tutoring Solutions.
          </h5>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            At EduBridge, our mission is to revolutionize education in Bangladesh by offering tailored learning experiences that empower students to excel academically.
            Committed to providing high-quality tutoring services and innovative learning solutions, we strive to address the unique needs of Bangladeshi learners of all ages and backgrounds.
            Our team of dedicated educators and professionals works tirelessly to create a supportive and engaging environment where students can thrive.
            Whether you're preparing for exams, seeking academic enrichment, or needing remedial support, EduBridge is here to guide you on your educational journey.
            Join us today and discover the difference personalized learning can make!
          </p>
          <div className="data">
            <a href="#contact" onClick={(e) => handleSmoothScroll(e, "#contact")} className="hire bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-800 transition-all">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
