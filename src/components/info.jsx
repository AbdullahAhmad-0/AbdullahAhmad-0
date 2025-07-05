import image from "../assets/image2.png";
import { useState, useEffect } from "react";
import apiHandler from "../api/api_handler";
import INFO_TEMPLATE from "../models/info";
import { defaultIconMap } from "../config/default";

const Info = () => {
	const [copied, setCopied] = useState(null);
	const [personalInfo, setPersonalInfo] = useState(INFO_TEMPLATE);
	const [availableIcons, setAvailableIcons] = useState([]);

	useEffect(() => {
		const fetchPersonalInfo = async () => {
			setPersonalInfo(await apiHandler.getInfo());
			console.log(personalInfo);
		};
		fetchPersonalInfo();
    loadAvailableIcons();
	}, []);

	const copyToClipboard = (text, type) => {
		navigator.clipboard.writeText(text);
		setCopied(type);
		setTimeout(() => setCopied(null), 2000);
	};

	const loadAvailableIcons = async () => {
		try {
			const icons = await apiHandler.getIcon();
      console.log(icons);
      console.log("===============================");
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
		<div className="flex flex-col h-full">
			{/* Profile section */}
			<div className="text-center mb-6">
				<div className="relative w-32 h-32 mx-auto mb-4">
					<div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 animate-pulse"></div>
					<img src={image} alt={personalInfo.name} className="w-28 h-28 object-cover rounded-full absolute inset-0 m-auto" />
				</div>
				<h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">{personalInfo.name}</h1>
				<p className="text-gray-300 text-sm mt-1">{personalInfo.designation}</p>
			</div>

			{/* Contact info */}
			<div className="mb-6">
				<h2 className="text-lg font-semibold mb-3 border-b border-violet-600/30 pb-1">Contact Information</h2>
				<div className="space-y-3">
					<div className="flex items-center justify-between group">
						<div className="flex items-center gap-2">
							<span className="text-violet-400">
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
							</span>
							<span className="text-sm">{personalInfo.email}</span>
						</div>
						<button
							onClick={() => copyToClipboard(personalInfo.email, "email")}
							className="opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2 py-1 bg-violet-700/30 hover:bg-violet-700/50 rounded"
						>
							{copied === "email" ? "Copied!" : "Copy"}
						</button>
					</div>

					<div className="flex items-center justify-between group">
						<div className="flex items-center gap-2">
							<span className="text-violet-400">
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
									/>
								</svg>
							</span>
							<span className="text-sm">{personalInfo.phone}</span>
						</div>
						<button
							onClick={() => copyToClipboard(personalInfo.phone, "phone")}
							className="opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2 py-1 bg-violet-700/30 hover:bg-violet-700/50 rounded"
						>
							{copied === "phone" ? "Copied!" : "Copy"}
						</button>
					</div>

					<div className="flex items-center justify-between group">
						<div className="flex items-center gap-2">
							<span className="text-violet-400">
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
								</svg>
							</span>
							<span className="text-sm">{personalInfo.whatsapp}</span>
						</div>
						<button
							onClick={() => copyToClipboard(personalInfo.whatsapp, "whatsapp")}
							className="opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2 py-1 bg-violet-700/30 hover:bg-violet-700/50 rounded"
						>
							{copied === "whatsapp" ? "Copied!" : "Copy"}
						</button>
					</div>

					<div className="flex items-center justify-between group">
						<div className="flex items-center gap-2">
							<span className="text-violet-400">
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
								</svg>
							</span>
							<span className="text-sm">{personalInfo.discord}</span>
						</div>
						<button
							onClick={() => copyToClipboard(personalInfo.discord, "discord")}
							className="opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2 py-1 bg-violet-700/30 hover:bg-violet-700/50 rounded"
						>
							{copied === "discord" ? "Copied!" : "Copy"}
						</button>
					</div>
				</div>
			</div>

			{/* Social media links */}
			<div className="mt-auto">
				<h2 className="text-lg font-semibold mb-3 border-b border-violet-600/30 pb-1">Connect With Me</h2>
				<div className="flex flex-wrap gap-3 justify-center">
					{personalInfo.socialLinks.map((link) => (
						<a
							key={link.name}
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							className="bg-slate-800 hover:bg-slate-700 p-3 rounded-lg transition-colors duration-200"
							title={link.name}
						>
							<SocialIcon name={link.icon} />
						</a>
					))}
				</div>
			</div>
		</div>
	);
};

export default Info;
