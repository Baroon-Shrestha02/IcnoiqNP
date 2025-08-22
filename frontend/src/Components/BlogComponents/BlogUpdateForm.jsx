import React, { useState, useEffect } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import { useAuth } from "../Context/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Eye,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import api from "../Utils/api";

export default function BlogUpdateForm() {
  const { blogId } = useParams();
  const { admin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    content: "",
    categories: [],
    isPublished: false,
    isFeatured: false,
  });

  const [originalData, setOriginalData] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [heroImage, setHeroImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Fetch blog data for editing
  useEffect(() => {
    if (!blogId) {
      setMessage("No blog ID provided");
      setLoading(false);
      return;
    }

    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/blog/${blogId}`);
        const blog = res.data.blog;

        console.log(res.data.blog);

        const blogData = {
          title: blog.title || "",
          shortDescription: blog.shortDescription || "",
          content: blog.content || "",
          categories: blog.categories || [],
          isPublished: blog.isPublished || false,
          isFeatured: blog.isFeatured || false,
        };

        setFormData(blogData);
        setOriginalData(blogData);
        setCurrentImage(blog.heroImage?.url || null);
        setMessage("");
      } catch (err) {
        console.error("Error fetching blog:", err);
        setMessage(
          "Failed to load blog details. Please check if the blog exists."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  console.log(formData);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories", { withCredentials: true });
        const categoryOptions = res.data.categories.map((cat) => ({
          value: cat,
          label: cat,
        }));
        setAllCategories(categoryOptions);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Check for changes
  useEffect(() => {
    if (!originalData) return;

    const hasFormChanges =
      formData.title !== originalData.title ||
      formData.shortDescription !== originalData.shortDescription ||
      formData.content !== originalData.content ||
      JSON.stringify(formData.categories) !==
        JSON.stringify(originalData.categories) ||
      formData.isPublished !== originalData.isPublished ||
      formData.isFeatured !== originalData.isFeatured ||
      heroImage !== null;

    setHasChanges(hasFormChanges);
  }, [formData, originalData, heroImage]);

  const handleEditorChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCategoryChange = (selectedOptions) => {
    const values = selectedOptions.map((opt) => opt.value);
    setFormData((prev) => ({
      ...prev,
      categories: values,
    }));
  };

  const handleImageChange = (e) => {
    setHeroImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!admin) {
      setMessage("You must be logged in as admin to update blogs.");
      return;
    }

    if (!hasChanges) {
      setMessage("No changes detected to save.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const form = new FormData();

      // Append form data
      Object.keys(formData).forEach((key) => {
        if (key === "categories") {
          formData[key].forEach((cat) => form.append("categories", cat));
        } else {
          form.append(key, formData[key]);
        }
      });

      // Append new image if selected
      if (heroImage) {
        form.append("heroImage", heroImage);
      }

      const res = await api.put(`/update/${blogId}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      setMessage("Blog updated successfully!");
      setOriginalData({ ...formData });
      setHeroImage(null);

      // Update current image if new one was uploaded
      if (heroImage && res.data.blog?.heroImage?.url) {
        setCurrentImage(res.data.blog.heroImage.url);
      }

      // Optional: Navigate back to blog list after successful update
      setTimeout(() => {
        navigate("/blog");
      }, 2000);
    } catch (err) {
      console.error("Error updating blog:", err);
      setMessage(
        err.response?.data?.message ||
          "Failed to update blog. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (
        window.confirm(
          "You have unsaved changes. Are you sure you want to leave?"
        )
      ) {
        navigate("/blog");
      }
    } else {
      navigate("/blog");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading blog data...</p>
        </div>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            You need admin privileges to update blogs.
          </p>
          <button
            onClick={() => navigate("/blogs")}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={handleCancel}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Update Blog Post
            </h1>
            <p className="text-gray-600">Make changes to your blog post</p>
          </div>
          {hasChanges && (
            <div className="text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                Unsaved changes
              </span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Basic Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter your blog title..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description
                  </label>
                  <textarea
                    name="shortDescription"
                    placeholder="Brief description (max 300 characters)..."
                    maxLength={300}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                    value={formData.shortDescription}
                    onChange={handleChange}
                  />
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {formData.shortDescription.length}/300
                  </div>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Categories
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select or Add Categories
                </label>
                <CreatableSelect
                  isMulti
                  components={makeAnimated()}
                  options={allCategories}
                  onChange={handleCategoryChange}
                  value={formData.categories.map((cat) => ({
                    label: cat,
                    value: cat,
                  }))}
                  placeholder="Start typing to select or add..."
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Type to search or add a new category.
                </p>
              </div>
            </div>

            {/* Hero Image */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Featured Image
              </h2>

              {/* Current Image Preview */}
              {currentImage && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Image
                  </label>
                  <div className="relative inline-block">
                    <img
                      src={currentImage}
                      alt="Current featured image"
                      className="w-64 h-40 object-cover rounded-lg border border-gray-300"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {currentImage
                    ? "Update Featured Image"
                    : "Upload Featured Image"}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {currentImage
                    ? "Select a new image to replace the current one"
                    : "Recommended size: 1200x630 pixels (JPG, PNG)"}
                </p>

                {/* New Image Preview */}
                {heroImage && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Image Preview
                    </label>
                    <img
                      src={URL.createObjectURL(heroImage)}
                      alt="New featured image preview"
                      className="w-64 h-40 object-cover rounded-lg border border-gray-300"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Content
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Description
                </label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <Editor
                    apiKey="ydtp0lw09fpf7s9xyyrq1mykcs7go1xp994sjtypxghsx8d9"
                    value={formData.content}
                    init={{
                      height: 400,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image charmap preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | bold italic underline | " +
                        "alignleft aligncenter alignright alignjustify | " +
                        "bullist numlist outdent indent | removeformat | help",
                      block_formats:
                        "Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6",
                    }}
                    onEditorChange={handleEditorChange}
                  />
                </div>
              </div>
            </div>

            {/* Publishing Options */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Publishing Options
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isPublished"
                      checked={formData.isPublished}
                      onChange={handleChange}
                      className="w-5 h-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700">
                      Published
                    </span>
                  </label>
                  <span className="ml-4 text-xs text-gray-500">
                    {formData.isPublished ? "Blog is live" : "Blog is in draft"}
                  </span>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={formData.isFeatured}
                      onChange={handleChange}
                      className="w-5 h-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700">
                      Featured
                    </span>
                  </label>
                  <span className="ml-4 text-xs text-gray-500">
                    Featured blogs appear in special sections
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(`/blog/${blogId}`)}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>

                  <button
                    type="submit"
                    disabled={saving || !hasChanges}
                    className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                      saving || !hasChanges
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 transform hover:scale-105"
                    }`}
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Update Blog
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mt-6 p-4 rounded-lg ${
              message.includes("Failed") ||
              message.includes("denied") ||
              message.includes("must be logged") ||
              message.includes("No changes")
                ? "bg-red-50 border border-red-200 text-red-700"
                : "bg-green-50 border border-green-200 text-green-700"
            }`}
          >
            <div className="flex items-center">
              {message.includes("Failed") ||
              message.includes("denied") ||
              message.includes("must be logged") ||
              message.includes("No changes") ? (
                <AlertCircle className="w-5 h-5 mr-3" />
              ) : (
                <CheckCircle className="w-5 h-5 mr-3" />
              )}
              {message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
