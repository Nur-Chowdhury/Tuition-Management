const Footer = () => {

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
    <footer className="footer-48201 bg-gray-100 dark:bg-gray-900 py-12 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-6 lg:px-12">
        <div className=" flex flex-col sm:flex-row sm:gap-16">
            {/* Logo & Description */}
            <div className="w-1/2 md:col-span-1">
                <a href="#home" className="footer-site-logo text-2xl font-bold mb-4 block text-blue-700">
                EduBridge
                </a>
                <p className="">
                Welcome to EduBridge - your personalized learning hub! We offer one-on-one tutoring in various subjects, tailored to your unique needs.
                With expert tutors and a user-friendly platform, excel at your own pace from home. Join EduBridge and unlock your full potential today!
                </p>
            </div>
            <div className=" w-1/2 flex flex-row">
                <div className=" w-1/2">
                    <ul className="list-unstyled nav-links space-y-2">
                        <li>
                            <a href="#home" className="hover:text-blue-700 transition">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#contact" onClick={(e) => handleSmoothScroll(e, "#contact")} className="hover:text-blue-700 transition">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
                <div className=" w-1/2">
                    <ul className="list-unstyled nav-links space-y-2">
                        <li>
                            <a href="#" className="hover:text-blue-700 transition">
                            Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-700 transition">
                            Terms &amp; Conditions
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-700 transition">
                            Partners
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        

        {/* Footer Copyright */}
        <div className="mt-8 border-t border-gray-900 dark:border-gray-100 pt-6 text-center">
            <p className="">
                <small>&copy; EduBridge - 2024 All Rights Reserved.</small>
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
