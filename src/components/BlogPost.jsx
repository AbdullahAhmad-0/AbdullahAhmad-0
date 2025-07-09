import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiHandler from "../api/api_handler";
import { API_BASE_URL } from "../config";
import "../blog.css";

const BlogPost = ({ slug: propSlug }) => {
	const { slug } = useParams();
	const navigate = useNavigate();

	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (slug) {
			fetchPost();
		}
	}, [slug]);

	const fetchPost = async () => {
		try {
			setLoading(true);
			setError(null);

			const postData = await apiHandler.blog.getBySlug(slug);
			setPost(postData);
		} catch (err) {
			console.error("Failed to fetch blog post:", err);
			setError("Failed to load blog post. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	const updateMediaSrcWithBaseUrl = (html, baseUrl) => {
		if (!html) return "";

		const div = document.createElement("div");
		div.innerHTML = html;

		// Update <img> tags
		const images = div.querySelectorAll("img");
		images.forEach((img) => {
			const src = img.getAttribute("src");
			if (src && !src.startsWith("http")) {
				img.setAttribute("src", `${baseUrl}${src}`);
			}
		});

		// Update <iframe> tags
		const iframes = div.querySelectorAll("iframe");
		iframes.forEach((iframe) => {
			const src = iframe.getAttribute("src");
			if (src && !src.startsWith("http")) {
				iframe.setAttribute("src", `${baseUrl}${src}`);
			}
		});

		// Update <video> tags
		const videos = div.querySelectorAll("video");
		videos.forEach((video) => {
			const src = video.getAttribute("src");
			if (src && !src.startsWith("http")) {
				video.setAttribute("src", `${baseUrl}${src}`);
			}
		});

		return div.innerHTML;
	};

	const formatDate = (dateString) => {
		if (!dateString) return "Unknown date";
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const goBack = () => {
		navigate("/blog");
	};

	if (loading) {
		return (
			<div className="max-w-4xl mx-auto py-8">
				<div className="flex items-center justify-center py-12">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-400"></div>
					<p className="ml-4 text-gray-300">Loading post...</p>
				</div>
			</div>
		);
	}

	if (error || !post) {
		return (
			<div className="max-w-4xl mx-auto py-8">
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
					<h3 className="text-xl font-semibold text-gray-300 mb-2">Post Not Found</h3>
					<p className="text-gray-400 mb-4">{error || "The blog post you're looking for doesn't exist."}</p>
					<button onClick={goBack} className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors">
						Back to Blog
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto py-8">
			{/* Back Button */}
			<button onClick={goBack} className="flex items-center text-violet-400 hover:text-violet-300 transition-colors mb-6">
				<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
				</svg>
				Back to Blog
			</button>

			<article className="bg-slate-800/30 rounded-lg overflow-hidden border border-violet-600/20">
				{/* Cover Image */}
				{post.image && (
					<div className="w-full h-64 md:h-80 overflow-hidden">
						<img
							src={post.image.startsWith("http") ? post.image : `${API_BASE_URL}${post.image}`}
							alt={post.title}
							className="w-full h-full object-cover"
						/>
					</div>
				)}

				<div className="p-6 md:p-8">
					{/* Meta Information */}
					<div className="flex flex-wrap gap-2 mb-4">
						{post.category && <span className="bg-violet-700/30 text-violet-300 text-sm px-3 py-1 rounded">{post.category}</span>}
						<span className="bg-slate-700/50 text-gray-300 text-sm px-3 py-1 rounded">
							{formatDate(post.publishedAt || post.createdAt)}
						</span>
						<span className="bg-blue-700/30 text-blue-300 text-sm px-3 py-1 rounded">{post.status}</span>
					</div>

					{/* Title */}
					<h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{post.title}</h1>

					{/* Author */}
					{post.author && (
						<div className="flex items-center mb-6">
							<img
								src={post.author.avatar || "/api/placeholder/40/40"}
								alt={post.author.name}
								className="w-10 h-10 rounded-full mr-3"
							/>
							<div>
								<p className="text-gray-300 font-medium">{post.author.name}</p>
								<p className="text-gray-500 text-sm">{formatDate(post.publishedAt || post.createdAt)}</p>
							</div>
						</div>
					)}

					{/* Excerpt */}
					{post.excerpt && (
						<div className="bg-slate-700/30 rounded-lg p-4 mb-6 border-l-4 border-violet-600">
							<p className="text-gray-300 italic text-lg leading-relaxed">{post.excerpt}</p>
						</div>
					)}

					{/* Tags */}
					{post.tags && post.tags.length > 0 && (
						<div className="flex flex-wrap gap-2 mb-8">
							{post.tags.map((tag, index) => (
								<span key={index} className="bg-blue-800/20 text-blue-300 text-sm px-3 py-1 rounded">
									#{tag}
								</span>
							))}
						</div>
					)}

					{/* Content */}
					<div className="prose prose-invert prose-violet max-w-none">
						<div
							className="blog-post text-gray-300 leading-relaxed"
							dangerouslySetInnerHTML={{ __html: updateMediaSrcWithBaseUrl(post.content, API_BASE_URL) }}
							style={{
								fontSize: "1.1rem",
								lineHeight: "1.7",
							}}
						/>
					</div>
				</div>
			</article>

			{/* Related Posts or Comments section could go here */}
			<div className="mt-8 p-6 bg-slate-800/30 rounded-lg border border-violet-600/20">
				<h3 className="text-xl font-semibold text-white mb-4">Share this post</h3>
				<div className="flex gap-4">
					<button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
						</svg>
						Twitter
					</button>
					<button className="flex items-center gap-2 px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg transition-colors">
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
						</svg>
						LinkedIn
					</button>
				</div>
			</div>
		</div>
	);
};

export default BlogPost;
