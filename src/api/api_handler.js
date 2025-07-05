import { API_BASE_URL } from "../config";

// API service with real backend calls
const apiHandler = {
	async request(endpoint, options = {}) {
		const token = localStorage.getItem("token");
		const config = {
			headers: {
				"Content-Type": "application/json",
				...(token && { Authorization: `Bearer ${token}` }),
			},
			...options,
		};

		if (config.body && typeof config.body === "object") {
			config.body = JSON.stringify(config.body);
		}

		try {
			const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Request failed");
			}

			return response.json();
		} catch (error) {
			console.error("API Error:", error);
			throw error;
		}
	},

	async getAbout() {
		return this.request("/about");
	},

	async getInfo() {
		return this.request("/info");
	},

	async getPortfolio() {
		return this.request("/portfolio");
	},

	async getProjects() {
		return this.request("/projects");
	},

	async getContact() {
		return this.request("/contact");
	},

	async getIcon() {
		return this.request("/icon");
	},
};

export default apiHandler;
