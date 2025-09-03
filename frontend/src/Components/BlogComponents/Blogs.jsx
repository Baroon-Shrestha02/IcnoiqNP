import React, { useState, useEffect } from "react";
import {
  Calendar,
  User,
  ArrowRight,
  Tag,
  Search,
  TrendingUp,
  Clock,
  BookOpen,
  Trash2,
  Eye,
  EyeOff,
  MoreVertical,
  Edit,
  Filter,
  SortAsc,
  SortDesc,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import api from "../Utils/api";
import { useAuth } from "../Context/useAuth";

const categories = [
  "All",
  "Web Development",
  "Graphic Design",
  "Digital Marketing",
  "Video Production",
  "educational styling",
];

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [categories, setCategories] = useState(["All"]);
  const [sortBy, setSortBy] = useState("newest");
  const [searchBy, setSearchBy] = useState("title");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(9);
  const navigate = useNavigate();
  const { admin } = useAuth();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const endpoint = admin ? "/all-blogs" : "/blogs";
        const res = await api.get(endpoint, { withCredentials: true });
        const allBlogs = res.data.blogs || [];

        setBlogs(allBlogs);
        setFilteredBlogs(allBlogs);
        setFeaturedBlogs(allBlogs.filter((b) => b.isFeatured));
        setRecentBlogs(allBlogs.filter((b) => !b.isFeatured));
      } catch (err) {
        console.error("Error fetching blogs:", err.message);
      }
    };

    const fetchFeaturedBlogs = async () => {
      try {
        const res = await api.get("/featured", { withCredentials: true });
        setFeaturedBlogs(res.data.blogs || res.data.featuredBlogs || []);
      } catch (err) {
        console.error("Error fetching featured blogs:", err.message);
        setFeaturedBlogs([]);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories", {
          withCredentials: true,
        });
        setCategories(["All", ...(res.data.categories || [])]);
      } catch (err) {
        console.error("Error fetching categories:", err.message);
      }
    };

    fetchBlogs();
    fetchFeaturedBlogs();
    fetchCategories();
  }, [admin]);

  useEffect(() => {
    let filtered = blogs;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((blog) =>
        blog.categories.includes(selectedCategory)
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((blog) => {
        switch (searchBy) {
          case "title":
            return blog.title.toLowerCase().includes(searchTerm.toLowerCase());
          case "description":
            return blog.shortDescription
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase());
          case "content":
            return blog.content
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase());
          case "all":
            return (
              blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              blog.shortDescription
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              blog.content?.toLowerCase().includes(searchTerm.toLowerCase())
            );
          default:
            return blog.title.toLowerCase().includes(searchTerm.toLowerCase());
        }
      });
    }

    // Sort filtered results
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "title":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    // setFilteredBlogs(filtered);
    // setRecentBlogs(filtered);

    // Reset to first page when filters change
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, blogs, sortBy, searchBy]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (blogId, e) => {
    e.stopPropagation();
    setDropdownOpen(dropdownOpen === blogId ? null : blogId);
  };

  const handleTogglePublish = async (blogId, currentStatus, e) => {
    e.stopPropagation();
    setDropdownOpen(null);
    try {
      await api.patch(
        `/update-status/${blogId}`,
        { isPublished: !currentStatus },
        { withCredentials: true }
      );

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === blogId ? { ...blog, isPublished: !currentStatus } : blog
        )
      );
    } catch (err) {
      console.error("Error updating publish status:", err.message);
    }
  };

  const handleToggleFeatured = async (blogId, currentStatus, e) => {
    e.stopPropagation();
    setDropdownOpen(null);
    try {
      await api.patch(
        `/featured-status/${blogId}`,
        { isFeatured: !currentStatus },
        { withCredentials: true }
      );

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === blogId ? { ...blog, isFeatured: !currentStatus } : blog
        )
      );
    } catch (err) {
      console.error("Error updating publish status:", err.message);
    }
  };

  const handleEdit = (blogId, e) => {
    e.stopPropagation();
    setDropdownOpen(null);
    navigate(`/update/${blogId}`);
  };

  const handleDelete = async (blogId, e) => {
    e.stopPropagation();
    setDropdownOpen(null);

    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await api.delete(`/delete/${blogId}`, {
          withCredentials: true,
        });

        setBlogs((prevBlogs) =>
          prevBlogs.filter((blog) => blog._id !== blogId)
        );
      } catch (err) {
        console.error("Error deleting blog:", err.message);
      }
    }
  };

  const getShortPreview = (text, wordLimit = 25) => {
    if (!text) return "";
    const words = text.trim().split(/\s+/).slice(0, wordLimit);
    return words.join(" ") + (words.length >= wordLimit ? "..." : "");
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy("newest");
    setSearchBy("title");
  };

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = recentBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(recentBlogs.length / blogsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Check if there are any blogs to show
  const hasBlogs = blogs.length > 0;
  const hasActiveFilters =
    searchTerm || selectedCategory !== "All" || sortBy !== "newest";

  const getReadTime = (content) => {
    if (!content) return "3 min read";
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const AdminDropdown = ({ post, e }) =>
    admin && (
      <div className="dropdown-container relative">
        <button
          onClick={(e) => toggleDropdown(post._id, e)}
          className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full shadow-md transition-colors"
          title="More actions"
        >
          <MoreVertical className="w-4 h-4" />
        </button>

        {dropdownOpen === post._id && (
          <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-20">
            <button
              onClick={(e) =>
                handleTogglePublish(post._id, post.isPublished, e)
              }
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
            >
              {post.isPublished ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Unpublish
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Publish
                </>
              )}
            </button>

            <button
              onClick={(e) =>
                handleToggleFeatured(post._id, post.isFeatured, e)
              }
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
            >
              {post.isFeatured ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Unfeature
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Feature
                </>
              )}
            </button>

            <button
              onClick={(e) => handleEdit(post._id, e)}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>

            <button
              onClick={(e) => handleDelete(post._id, e)}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-600 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        )}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover{" "}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Amazing
            </span>{" "}
            Stories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore insights, tutorials, and industry trends from our experts.
            Stay updated with the latest in technology, design, and digital
            innovation.
          </p>
        </div>

        {admin && (
          <div className="mb-8 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {filteredBlogs.length !== blogs.length && (
                <span className="ml-2">
                  • Showing:{" "}
                  <span className="font-semibold">{filteredBlogs.length}</span>
                </span>
              )}
            </div>
            <button
              onClick={() => navigate("/add")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              + Add New Blog
            </button>
          </div>
        )}

        {/* Enhanced Search and Filter Bar */}
        {hasBlogs && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={`Search by ${
                    searchBy === "all"
                      ? "title, description, or content"
                      : searchBy
                  }...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 placeholder-gray-400 bg-gray-50 hover:bg-white transition-colors duration-200"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-6 py-4 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  showFilters || hasActiveFilters
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Filter className="w-5 h-5" />
                Filters
                {hasActiveFilters && (
                  <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                    Active
                  </span>
                )}
              </button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Search By */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search In:
                    </label>
                    <select
                      value={searchBy}
                      onChange={(e) => setSearchBy(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    >
                      <option value="title">Title</option>
                      <option value="description">Description</option>
                      <option value="content">Content</option>
                      <option value="all">All Fields</option>
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category:
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sort By:
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="title">Title A-Z</option>
                      <option value="title-desc">Title Z-A</option>
                    </select>
                  </div>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={clearSearch}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <BookOpen className="w-32 h-32 text-gray-300 mx-auto mb-8" />
              <h3 className="text-3xl font-semibold text-gray-600 mb-4">
                {searchTerm || selectedCategory !== "All"
                  ? "No Results Found"
                  : "No Blogs Available"}
              </h3>
              <p className="text-gray-500 text-lg mb-6">
                {searchTerm || selectedCategory !== "All"
                  ? "Try adjusting your search criteria or filters to find what you're looking for."
                  : "New blogs will be available soon. Stay tuned for exciting content!"}
              </p>
              {(searchTerm || selectedCategory !== "All") && (
                <button
                  onClick={clearSearch}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Featured Posts Section */}
            {featuredBlogs.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Other featured posts
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Featured Post */}
                  <div className="lg:col-span-2">
                    {featuredBlogs[0] && (
                      <div
                        onClick={() =>
                          navigate(`/blog/${featuredBlogs[0]._id}`)
                        }
                        className="cursor-pointer group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
                      >
                        <div className="relative h-96">
                          <img
                            src={featuredBlogs[0].heroImage?.url}
                            alt={featuredBlogs[0].title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                          {/* Category Badge */}
                          <div className="absolute top-6 left-6">
                            <span className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg backdrop-blur-sm">
                              {featuredBlogs[0].categories?.[0] || "Business"}
                            </span>
                          </div>

                          {admin && (
                            <div className="absolute top-6 right-6">
                              <span
                                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm ${
                                  featuredBlogs[0].isPublished
                                    ? "bg-green-100/90 text-green-700"
                                    : "bg-yellow-100/90 text-yellow-700"
                                }`}
                              >
                                {featuredBlogs[0].isPublished
                                  ? "Published"
                                  : "Draft"}
                              </span>
                            </div>
                          )}

                          {/* Content Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-8">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                              {featuredBlogs[0].title}
                            </h3>
                            {/* <p className="text-gray-200 text-lg mb-4 leading-relaxed">
                              {getShortPreview(
                                featuredBlogs[0].shortDescription,
                                30
                              )}
                            </p> */}
                            <div className="flex items-center gap-4 text-white/80 text-sm">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>Admin</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {new Date(
                                    featuredBlogs[0].createdAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>
                                  {getReadTime(featuredBlogs[0].content)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {admin && (
                          <div className="absolute bottom-6 right-6">
                            <AdminDropdown post={featuredBlogs[0]} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Side Featured Posts */}
                  <div className="space-y-6">
                    {featuredBlogs.slice(1, 4).map((post) => (
                      <div
                        key={post._id}
                        onClick={() => navigate(`/blog/${post._id}`)}
                        className="cursor-pointer group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hiden transform hover:-translate-y-1"
                      >
                        <div className="flex gap-4 p-4">
                          <img
                            src={post.heroImage?.url}
                            alt={post.title}
                            className="w-24 h-24 object-cover rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2 mb-2 text-lg">
                              {post.title}
                            </h4>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                              {getShortPreview(post.shortDescription, 15)}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                <span>Admin</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{getReadTime(post.content)}</span>
                              </div>
                            </div>
                          </div>

                          {admin && (
                            <div className="flex-shrink-0">
                              <AdminDropdown post={post} />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Recent Posts Section */}
            {recentBlogs.length > 0 && (
              <div>
                <div className="flex items-center justify-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Recent Posts
                  </h2>
                </div>

                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {currentBlogs.map((post) => (
                    <div
                      key={post._id}
                      onClick={() => navigate(`/blog/${post._id}`)}
                      className="cursor-pointer group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
                    >
                      <div className="relative">
                        <img
                          src={post.heroImage?.url}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {admin && (
                          <div className="absolute top-4 right-4">
                            <span
                              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm ${
                                post.isPublished
                                  ? "bg-green-100/90 text-green-700"
                                  : "bg-yellow-100/90 text-yellow-700"
                              }`}
                            >
                              {post.isPublished ? "Published" : "Draft"}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                          {getShortPreview(post.shortDescription, 20)}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>Admin</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{getReadTime(post.content)}</span>
                            </div>
                          </div>

                          {admin && <AdminDropdown post={post} />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-12 gap-2">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-lg transition-colors ${
                        currentPage === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => paginate(pageNumber)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            currentPage === pageNumber
                              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-lg transition-colors ${
                        currentPage === totalPages
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
