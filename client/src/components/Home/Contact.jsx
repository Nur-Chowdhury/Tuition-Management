import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md"; 

const Contact = () => {
  return (
    <section id="contact" className="contact_body py-16">
      <div className=" flex justify-center mx-auto">
        <div className=" md:w-4/5 contact bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md flex flex-wrap">
          {/* Left Side */}
          <div className="left-side w-full md:w-1/5 p-4">
            <div className="flex flex-col items-center justify-center address details mb-6">
              <FaLocationDot className="fas fa-map-marker-alt text-blue-500 text-xl mb-2" />
              <div className="topic text-lg font-semibold">Address</div>
              <div className="text-one text-gray-600 dark:text-gray-300">CUET, Pahartali</div>
              <div className="text-two text-gray-600 dark:text-gray-300">Raozan, Chattagram</div>
            </div>
            <div className=" flex flex-col items-center justify-center phone details mb-6">
                <FaPhone className="fas fa-map-marker-alt text-blue-500 text-xl mb-2" />
              <div className="topic text-lg font-semibold">Phone</div>
              <div className="text-one text-gray-600 dark:text-gray-300">+880 1875 623062</div>
              <div className="text-two text-gray-600 dark:text-gray-300">+880 1623 243386</div>
            </div>
            <div className=" flex flex-col items-center justify-center email details">
              <MdEmail className="fas fa-envelope text-blue-500 text-xl mb-2"/>
              <div className="topic text-lg font-semibold">Email</div>
              <div className="text-one text-gray-600 dark:text-gray-300">edubridge.cuet@gmail.com</div>
              <div className="text-two text-gray-600 dark:text-gray-300">info.edubridge@gmail.com</div>
            </div>
          </div>

          {/* Right Side */}
          <div className="right-side w-full md:w-4/5 p-4">
            <div className="topic-text text-2xl font-semibold mb-4">Send us a message</div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              If you have any inquiries or require assistance regarding our services, please feel free to send us a message here. We are committed to providing you with the highest level of professionalism and support to address your needs effectively. Your satisfaction is our priority, and we look forward to assisting you in any way we can.
            </p>
            <form action="#">
              <div className="input-box mb-4">
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-bgDark dark:text-bgLight"
                />
              </div>
              <div className="input-box mb-4">
                <input
                  type="number"
                  placeholder="Enter your email"
                  className="dark:bg-bgDark dark:text-bgLight w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="input-box message-box mb-4">
                <textarea
                  placeholder="Enter your message"
                  className="dark:bg-bgDark dark:text-bgLight w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                ></textarea>
              </div>
              <div className="button">
                <input
                  type="submit"
                  value="Send Now"
                  className="w-full bg-blue-500 text-white py-2 rounded-md cursor-pointer hover:bg-blue-600"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
