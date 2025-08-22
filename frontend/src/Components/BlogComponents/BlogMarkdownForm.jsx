import React, { useState, useEffect } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import { useAuth } from "../Context/useAuth";
import api from "../Utils/api";
import { useNavigate } from "react-router-dom";

export default function BlogForm() {
  const { admin } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    content: "",
    categories: [],
    isPublished: false,
    isFeatured: false,
  });
  const navigate = useNavigate();

  const [allCategories, setAllCategories] = useState([]);
  const [heroImage, setHeroImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleEditorChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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
    const form = new FormData();
    for (let key in formData) {
      if (key === "categories") {
        formData[key].forEach((cat) => form.append("categories", cat));
      } else {
        form.append(key, formData[key]);
      }
    }
    form.append("heroImage", heroImage);

    if (!admin) {
      return setMessage("You must be logged in as admin to submit a blog.");
    }

    try {
      const res = await api.post("/post-blog", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      setMessage(res.data.message || "Blog submitted.");
      navigate("/blog");
    } catch (err) {
      setMessage(err.response?.data?.message || "Submission failed.");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Blog Post
          </h1>
          <p className="text-gray-600">Share your thoughts with the world</p>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Featured Image *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recommended size: 1200x630 pixels (JPG, PNG)
                </p>
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
                    initialValue=""
                    value={formData.content}
                    init={{
                      height: 500,
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

            <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Publishing Options
            </h2>
            {/* Publishing */}
            <div className="flex flex-col gap-y-4 sm:flex-row sm:items-start sm:gap-x-10">
              {/* Publish Immediately */}
              <div className="flex-1">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleChange}
                    className="w-5 h-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Publish immediately
                  </span>
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Uncheck to save as draft.
                </p>
              </div>

              {/* Mark as Featured */}
              <div className="flex-1">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="w-5 h-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Mark as Featured
                  </span>
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Featured blogs will be shown in a special section.
                </p>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium rounded-lg hover:from-purple-700 hover:to-purple-800 focus:ring-4 focus:ring-purple-200 transition-all duration-200 transform hover:scale-105"
                >
                  {formData.isPublished ? "Publish Blog" : "Save as Draft"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mt-6 p-4 rounded-lg ${
              message.includes("failed") || message.includes("must be logged")
                ? "bg-red-50 border border-red-200 text-red-700"
                : "bg-green-50 border border-green-200 text-green-700"
            }`}
          >
            <div className="flex items-center">
              <div
                className={`w-2 h-2 rounded-full mr-3 ${
                  message.includes("failed") ||
                  message.includes("must be logged")
                    ? "bg-red-500"
                    : "bg-green-500"
                }`}
              ></div>
              {message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
