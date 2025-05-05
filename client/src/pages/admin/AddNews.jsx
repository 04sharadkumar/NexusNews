import { useState, useRef } from 'react';
import axios from 'axios';
import { FiUpload, FiCheckCircle, FiAlertCircle, FiImage } from 'react-icons/fi';
import { Loader } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

const AddNews = () => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: '',
    date: '',
    image: null, // Changed to store File object
    isBreaking: false,
    isTrending: false,
    author: '',
    readTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Store the file in formData
    setFormData(prev => ({ ...prev, image: file }));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Create FormData object to send both files and regular data
      const dataToSend = new FormData();
      
      // Append all form fields to FormData
      dataToSend.append('title', formData.title);
      dataToSend.append('excerpt', formData.excerpt);
      dataToSend.append('category', formData.category);
      dataToSend.append('date', formData.date);
      dataToSend.append('isBreaking', formData.isBreaking);
      dataToSend.append('isTrending', formData.isTrending);
      dataToSend.append('author', formData.author);
      dataToSend.append('readTime', formData.readTime);
      
      // Append the image file if it exists
      if (formData.image) {
        dataToSend.append('image', formData.image);
      }

      // Send the FormData to your backend
      await axios.post('http://localhost:5000/api/admin/addNews', dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSubmitSuccess(true);
      toast.success('🎉 Article created successfully!');
      // Reset form
      setFormData({
        title: '',
        excerpt: '',
        category: '',
        date: '',
        image: null,
        isBreaking: false,
        isTrending: false,
        author: '',
        readTime: ''
      });
      setImagePreview(null);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      console.error('Error posting news', err);
      setError(err.response?.data?.message || err.message || 'Failed to add news. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create New Article</h2>
          <p className="mt-2 text-lg text-gray-600">
            Share the latest news with your audience
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {submitSuccess && (
            <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200">
              <FiCheckCircle className="text-green-500 mr-2 text-xl" />
              <span className="text-green-700 font-medium">Article published successfully!</span>
            </div>
          )}

          {error && (
            <div className="flex items-center p-4 bg-red-50 rounded-lg border border-red-200">
              <FiAlertCircle className="text-red-500 mr-2 text-xl" />
              <span className="text-red-700 font-medium">{error}</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Title */}
              <div className="sm:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Article Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter article title"
                />
              </div>

              {/* Excerpt */}
              <div className="sm:col-span-2">
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="excerpt"
                  id="excerpt"
                  rows={3}
                  value={formData.excerpt}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Write a brief summary of the article"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">Select category</option>
                  <option value="technology">Technology</option>
                  <option value="politics">Politics</option>
                  <option value="business">Business</option>
                  <option value="sports">Sports</option>
                  <option value="entertainment">Entertainment</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Publish Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Image Upload */}
              <div className="sm:col-span-2">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Featured Image
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <div 
                  onClick={triggerFileInput}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
                >
                  {imagePreview ? (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="mx-auto max-h-48 rounded-md object-cover"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <FiImage className="mx-auto text-gray-400 text-3xl" />
                      <p className="text-sm text-gray-500">
                        Click to upload an image or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Author */}
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                  Author <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="author"
                  id="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Author name"
                />
              </div>

              {/* Read Time */}
              <div>
                <label htmlFor="readTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Read Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="readTime"
                  id="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="e.g. 5 min read"
                />
              </div>

              {/* Checkboxes */}
              <div className="sm:col-span-2 flex flex-wrap gap-4 pt-2">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    id="isBreaking"
                    name="isBreaking"
                    type="checkbox"
                    checked={formData.isBreaking}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-700">Breaking News</span>
                </label>

                <label className="inline-flex items-center cursor-pointer">
                  <input
                    id="isTrending"
                    name="isTrending"
                    type="checkbox"
                    checked={formData.isTrending}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-700">Trending News</span>
                </label>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin mr-2 h-4 w-4" />
                  Publishing...
                </>
              ) : (
                'Publish Article'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNews;
