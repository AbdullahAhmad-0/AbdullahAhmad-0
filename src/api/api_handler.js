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

	blog: {
		// Get all blog posts
		async getAll() {
			return apiHandler.request("/blog");
		},

		// Get a single blog post by slug
		async getBySlug(slug) {
			return apiHandler.request(`/blog/${slug}`);
		},

		// Get published blog posts (public endpoint)
		async getPublished() {
			return apiHandler.request("/blog/published");
		},
	},

	async sendMessage(data) {
		return this.request("/msg/send", {
			method: "POST",
			body: data,
		});
	},
};

export default apiHandler;
