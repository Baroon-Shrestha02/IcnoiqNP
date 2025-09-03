import React, { useEffect, useState, useCallback } from "react";
import { Calendar, Tag, ArrowLeft, Clock, Eye, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Utils/api";

const API_ENDPOINTS = {
  getBlog: (id) => `/blog/${id}`,
  getBlogs: () => "/blogs",
};

export default function BlogDescription() {
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readingTime, setReadingTime] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();

  const calculateReadingTime = useCallback((content) => {
    if (!content) return 0;
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        totalHeight > 0 ? (window.pageYOffset / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchBlog = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const blogRes = await api.get(API_ENDPOINTS.getBlog(id));
      const blogsRes = await api.get(API_ENDPOINTS.getBlogs());

      const fetchedBlog = blogRes.data.blog;
      setBlog(fetchedBlog);
      setReadingTime(calculateReadingTime(fetchedBlog.content));

      const otherBlogs = blogsRes.data.blogs.filter((b) => b._id !== id);
      setBlogs(otherBlogs.slice(0, 3));
    } catch (err) {
      setError(err.message || "Failed to load article");
      setBlog(null);
    } finally {
      setLoading(false);
    }
  }, [id, calculateReadingTime]);

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id, fetchBlog]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            Loading Article
          </h2>
          <p className="text-slate-600">Preparing your reading experience...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 bg-red-500 rounded-full"></div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all transform hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Reading Progress Bar */}
      {/* <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div> */}

      {/* Navigation Header */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-all duration-200 font-medium group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Back to articles</span>
            <span className="sm:hidden">Back</span>
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative mb-12">
          {/* Featured Image */}
          {blog.heroImage?.url && (
            <div className="relative h-[50vh] sm:h-[60vh] rounded-2xl overflow-hidden mb-8 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
              <img
                src={blog.heroImage.url}
                alt={blog.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20">
                <div className="max-w-4xl">
                  {blog.categories && blog.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.categories.slice(0, 3).map((category, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-white bg-black/20 backdrop-blur-sm rounded-full border border-white/30"
                        >
                          <Tag className="w-3 h-3" />
                          {category}
                        </span>
                      ))}
                    </div>
                  )}
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight capitalize">
                    {blog.title}
                  </h1>
                  {/* <p className="text-white font-bolder text-base md:text-lg max-w-4xl">
                    {blog.shortDescription}
                  </p> */}
                </div>
              </div>
            </div>
          )}

          {/* Title without hero image */}
          {!blog.heroImage?.url && (
            <div className="text-center mb-8">
              {blog.categories && blog.categories.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {blog.categories.slice(0, 3).map((category, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-full border border-blue-200"
                    >
                      <Tag className="w-3 h-3" />
                      {category}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                {blog.title}
              </h1>
            </div>
          )}

          {/* Meta Information Card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50">
            <div className="flex flex-wrap items-center gap-6 text-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">
                    Published
                  </p>
                  <time className="font-semibold">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">
                    Reading Time
                  </p>
                  <span className="font-semibold">{readingTime} min read</span>
                </div>
              </div>

              {blog.author && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Author</p>
                    <span className="font-semibold">{blog.author}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12 border border-slate-200/50">
              {/* <article
                className="prose lg:prose-lg max-w-none leading-relaxed tracking-wide prose-headings:mt-10 prose-headings:mb-6 prose-h1:tracking-tight prose-h2:tracking-tight prose-p:my-6 prose-li:my-3 [&_h1_strong]:text-4xl [&_h2_strong]:text-3xl"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              /> */}
              <article
                className="prose lg:prose-lg max-w-none [&_h1_strong]:text-4xl [&_h1]:text-4xl [&_h1]:py-4 [&_h1]:font-extrabold  [&_h2]:font-extrabold [&_h2]:text-3xl [&_h2]:py-4 [&_h3]:text-2xl [&_h3]:py-4 [&_h3]:font-extrabold [&_h2_strong]:text-3xl [&_p]:tracking-wider"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>

          {/* Sidebar - Related Articles */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200/50">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
                  You might also like
                </h2>

                <div className="space-y-4">
                  {blogs.map((b, index) => (
                    <div
                      key={b._id}
                      onClick={() => navigate(`/blog/${b._id}`)}
                      className="group bg-gradient-to-br from-slate-50 to-white rounded-xl p-4 border border-slate-200 hover:border-blue-300 cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                    >
                      {/* Article Image Placeholder or Thumbnail */}
                      {b.heroImage?.url ? (
                        <img
                          src={b.heroImage.url}
                          alt={b.title}
                          className="w-full h-32 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-3 flex items-center justify-center group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
                          <div className="text-4xl font-bold text-blue-400 opacity-50">
                            {index + 1}
                          </div>
                        </div>
                      )}

                      <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {b.title}
                      </h3>

                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <span>
                          {new Date(b.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {blogs.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Tag className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-500">No related articles found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
