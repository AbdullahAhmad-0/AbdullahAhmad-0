import { useState, useEffect } from "react";
import apiHandler from "../api/api_handler";
import CONTACT_TEMPLATE from "../models/contact";
import { defaultIconMap } from "../config/default";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    submitting: false,
    error: null
  });

    const [contactInfo, setContactInfo] = useState(CONTACT_TEMPLATE);
    const [availableIcons, setAvailableIcons] = useState([]);
  
    useEffect(() => {
      const fetchContactInfo = async () => {
        setContactInfo(await apiHandler.getInfo());
        console.log(contactInfo);
      };
      fetchContactInfo();
      loadAvailableIcons();
    }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ submitted: false, submitting: true, error: null });
    
    // Simulate form submission
    setTimeout(() => {
      if (formData.email && formData.name && formData.message) {
        setFormStatus({ submitted: true, submitting: false, error: null });
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setFormStatus({ 
          submitted: false, 
          submitting: false, 
          error: "Please fill out all required fields." 
        });
      }
    }, 1500);
  };

	const loadAvailableIcons = async () => {
		try {
			const icons = await apiHandler.getIcon();
			setAvailableIcons(icons || []);
		} catch (error) {
			console.error("Failed to load icons:", error);
			setAvailableIcons([]);
		}
	};

	const SocialIcon = ({name}) => {
		// First check custom icons
		const customIcon = availableIcons.find((icon) => icon.name.toLowerCase() === name.toLowerCase());
		if (customIcon) {
			return <div dangerouslySetInnerHTML={{ __html: customIcon.svg }} className="w-5 h-5" />;
		}

		// Then check default icons
		const defaultIcon = defaultIconMap[name.toLowerCase()];
		if (defaultIcon) {
			return defaultIcon;
		}

		// Fallback to generic icon
		return (
			<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
			</svg>
		);
	};

  return (
    <div className="py-4">
      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent gradient-text mb-6">
        Contact Me
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="bg-slate-800/30 p-6 rounded-lg border border-violet-600/20">
          <h3 className="text-xl font-semibold mb-4 text-white">Get In Touch</h3>
          <p className="text-gray-300 mb-6">
            Feel free to reach out if you have any questions, project ideas, or
            just want to say hello. I'm always open to discussing new projects,
            creative ideas or opportunities to be part of your vision.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-violet-700/30 p-3 rounded-lg text-violet-400">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-gray-200 font-medium">Email</h4>
                <a
                  href={contactInfo.email_url}
                  className="text-violet-400 hover:underline"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-violet-700/30 p-3 rounded-lg text-violet-400">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-gray-200 font-medium">Phone</h4>
                <a
                  href={contactInfo.phone_url}
                  className="text-violet-400 hover:underline"
                >
                  {contactInfo.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-violet-700/30 p-3 rounded-lg text-violet-400">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-gray-200 font-medium">Location</h4>
                <p className="text-gray-300">{contactInfo.address}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-gray-200 font-medium mb-3">Connect With Me</h4>
            <div className="flex gap-3">
              {contactInfo.socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-full transition-colors duration-200"
                  title={link.name}
                >
                  <SocialIcon name={link.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-slate-800/30 p-6 rounded-lg border border-violet-600/20">
          <h3 className="text-xl font-semibold mb-4 text-white">Send Message</h3>
          
          {formStatus.submitted ? (
            <div className="bg-green-800/30 border border-green-500/30 text-green-300 p-4 rounded-lg mb-4">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Thank you! Your message has been sent.</span>
              </div>
            </div>
          ) : null}

          {formStatus.error ? (
            <div className="bg-red-800/30 border border-red-500/30 text-red-300 p-4 rounded-lg mb-4">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{formStatus.error}</span>
              </div>
            </div>
          ) : null}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-300 mb-2">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-900/70 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-600/50"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-900/70 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-600/50"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="subject" className="block text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-slate-900/70 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-600/50"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-300 mb-2">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full bg-slate-900/70 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-600/50"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={formStatus.submitting}
              className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 flex justify-center items-center"
            >
              {formStatus.submitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;