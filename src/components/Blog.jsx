import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiHandler from "../api/api_handler";
import { API_BASE_URL } from "../config";

const Blog = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [blogPosts, setBlogPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handlePostClick = (slug) => {
		navigate(`/blog/${slug}`);
		// console.log(`Navigate to: /blog/${slug}`);
	};

	// Fetch blog posts on component mount
	useEffect(() => {
		fetchBlogPosts();
	}, []);

	const fetchBlogPosts = async () => {
		try {
			setLoading(true);
			setError(null);

			const posts = await apiHandler.blog.getPublished();
			console.log(posts);
			setBlogPosts(posts.blogs);
		} catch (err) {
			console.error("Failed to fetch blog posts:", err);
			setError("Failed to load blog posts. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	const filteredBlogPosts = Array.isArray(blogPosts)
		? blogPosts.filter(
				(post) =>
					post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					post.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					post.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
					post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: [];

	const formatDate = (dateString) => {
		if (!dateString) return "Unknown date";
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const truncateText = (text, maxLength = 150) => {
		if (!text || text.length <= maxLength) return text;
		return text.substring(0, maxLength).trim() + "...";
	};

	if (loading) {
		return (
			<div className="py-4">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
					<div>
						<h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent gradient-text">
							Blog
						</h2>
						<p className="text-gray-300 mt-1">Insights, tutorials and thoughts on development</p>
					</div>
				</div>
				<div className="flex items-center justify-center py-12">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-400"></div>
					<p className="ml-4 text-gray-300">Loading blog posts...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="py-4">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
					<div>
						<h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent gradient-text">
							Blog
						</h2>
						<p className="text-gray-300 mt-1">Insights, tutorials and thoughts on development</p>
					</div>
				</div>
				<div className="text-center py-12">
					<div className="text-red-400 mb-4">
						<svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1}
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.866-.833-2.598 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
							/>
						</svg>
					</div>
					<h3 className="text-xl font-semibold text-gray-300 mb-2">Error Loading Posts</h3>
					<p className="text-gray-400 mb-4">{error}</p>
					<button onClick={fetchBlogPosts} className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors">
						Try Again
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="py-4">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
				<div>
					<h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent gradient-text">
						Blog
					</h2>
					<p className="text-gray-300 mt-1">Insights, tutorials and thoughts on development</p>
				</div>
				<div className="w-full md:w-auto mt-4 md:mt-0">
					<div className="relative">
						<input
							type="text"
							placeholder="Search posts..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="bg-slate-800/50 border border-violet-600/30 rounded-lg px-4 py-2 pl-10 w-full md:w-64 text-white focus:outline-none focus:ring-2 focus:ring-violet-600/50"
						/>
						<svg
							className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
					</div>
				</div>
			</div>

			{filteredBlogPosts.length === 0 ? (
				<div className="text-center py-12">
					<svg
						className="w-16 h-16 text-gray-600 mx-auto mb-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1}
							d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<h3 className="text-xl font-semibold text-gray-300">{searchTerm ? "No posts found" : "No blog posts available"}</h3>
					<p className="text-gray-400 mt-2">{searchTerm ? "Try adjusting your search query" : "Check back later for new content"}</p>
				</div>
			) : (
				<div className="space-y-6">
					{filteredBlogPosts.map((post) => (
						<div
							key={post.id || post.slug}
							className="flex flex-col md:flex-row bg-slate-800/30 rounded-lg overflow-hidden border border-violet-600/20 hover:border-violet-600/40 transition-colors duration-200 cursor-pointer"
							onClick={() => handlePostClick(post.slug)}
						>
							<div className="md:w-1/3 h-48 md:h-auto">
								{post.image ? (
									<img
										src={post.image.startsWith("http") ? post.image : `${API_BASE_URL}${post.image}`}
										alt={post.title}
										className="w-full h-full object-cover"
									/>
								) : (
									<div className="w-full h-full bg-slate-700/50 flex items-center justify-center">
										<svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={1}
												d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
											/>
										</svg>
									</div>
								)}
							</div>
							<div className="p-4 md:p-6 flex flex-col flex-grow md:w-2/3">
								<div className="flex flex-wrap gap-2 mb-2">
									{post.category && (
										<span className="bg-violet-700/30 text-violet-300 text-xs px-2 py-1 rounded">{post.category}</span>
									)}
									<span className="bg-slate-700/50 text-gray-300 text-xs px-2 py-1 rounded">
										{formatDate(post.publishedAt || post.createdAt)}
									</span>
									<span className="bg-blue-700/30 text-blue-300 text-xs px-2 py-1 rounded">{post.status}</span>
								</div>
								<h3 className="text-xl font-semibold text-white mb-2 hover:text-violet-300 transition-colors">{post.title}</h3>
								<p className="text-gray-300 mb-4 flex-grow">{truncateText(post.excerpt)}</p>
								<div className="mt-auto">
									{post.tags && post.tags.length > 0 && (
										<div className="flex flex-wrap gap-2 mb-4">
											{post.tags.map((tag, index) => (
												<span key={index} className="bg-blue-800/20 text-blue-300 text-xs px-2 py-1 rounded">
													{tag}
												</span>
											))}
										</div>
									)}
									<div className="inline-flex items-center text-violet-400 hover:text-violet-300 transition-colors">
										Read More
										<svg
											className="w-4 h-4 ml-1"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
										</svg>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Blog;
