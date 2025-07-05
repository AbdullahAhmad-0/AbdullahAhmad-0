import { useState } from "react";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Sample blog data - you can replace this with your actual data
  const blogPosts = [
    {
      id: 1,
      title: "Building Responsive Web Apps with React",
      excerpt: "Learn how to create fully responsive web applications using React and modern CSS frameworks.",
      date: "May 10, 2025",
      category: "Web Development",
      image: "/api/placeholder/800/600",
      tags: ["React", "CSS", "Responsive Design"],
      link: "#"
    },
    {
      id: 2,
      title: "Getting Started with Next.js",
      excerpt: "Explore the powerful features of Next.js framework and how it can improve your React projects.",
      date: "April 25, 2025",
      category: "Web Development",
      image: "/api/placeholder/800/600",
      tags: ["Next.js", "React", "JavaScript"],
      link: "#"
    },
    {
      id: 3,
      title: "Mobile App Development with React Native",
      excerpt: "A comprehensive guide to building cross-platform mobile applications using React Native.",
      date: "April 15, 2025",
      category: "App Development",
      image: "/api/placeholder/800/600",
      tags: ["React Native", "Mobile", "Cross-platform"],
      link: "#"
    },
    {
      id: 4,
      title: "Mastering TypeScript for Modern Applications",
      excerpt: "Dive deep into TypeScript and learn how to leverage its features for building robust applications.",
      date: "March 30, 2025",
      category: "Software Development",
      image: "/api/placeholder/800/600",
      tags: ["TypeScript", "JavaScript", "Development"],
      link: "#"
    },
    {
      id: 5,
      title: "Introduction to GraphQL API Development",
      excerpt: "Learn how to build efficient APIs using GraphQL and integrate them with your frontend applications.",
      date: "March 15, 2025",
      category: "Web Development",
      image: "/api/placeholder/800/600",
      tags: ["GraphQL", "API", "Backend"],
      link: "#"
    }
  ];

  const filteredBlogPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="py-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent gradient-text">
            Blog
          </h2>
          <p className="text-gray-300 mt-1">
            Insights, tutorials and thoughts on development
          </p>
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
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
          <h3 className="text-xl font-semibold text-gray-300">No blog posts found</h3>
          <p className="text-gray-400 mt-2">Try adjusting your search query</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredBlogPosts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col md:flex-row bg-slate-800/30 rounded-lg overflow-hidden border border-violet-600/20 hover:border-violet-600/40 transition-colors duration-200"
            >
              <div className="md:w-1/3 h-48 md:h-auto">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 md:p-6 flex flex-col flex-grow md:w-2/3">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="bg-violet-700/30 text-violet-300 text-xs px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <span className="bg-slate-700/50 text-gray-300 text-xs px-2 py-1 rounded">
                    {post.date}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-300 mb-4 flex-grow">{post.excerpt}</p>
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-800/20 text-blue-300 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={post.link}
                    className="inline-flex items-center text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
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
