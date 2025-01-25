const Footer = () => {
    return (
      <footer className="footer bg-gray-200 border-t-[1px] border-t-gray-900 dark:border-t-gray-200 dark:bg-gray-900 py-4 text-gray-900 dark:text-gray-100 text-center fixed bottom-0 left-0 w-full">
        <p className="text-sm">
            &copy; {new Date().getFullYear()} by{" "}
            <span className="font-semibold text-purple-400">
                EduBridge
            </span>{" "}
            All rights reserved!
        </p>
      </footer>
    );
};

export default Footer;
