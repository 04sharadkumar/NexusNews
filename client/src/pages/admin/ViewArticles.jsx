import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import { FaTrash, FaEye, FaSpinner } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";

const ViewArticles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // GET Request: fetch all articles
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/admin/showNews")
      .then((res) => {
        setArticles(res.data.news.reverse()); // Show newest first
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setError("Failed to load news articles. Please try again later.");
        setLoading(false);
      });
  }, []);

  // DELETE Request: delete article
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this article?");
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:5000/api/admin/deleteNews/${id}`);
      setArticles((prevArticles) => prevArticles.filter((article) => article._id !== id));
    } catch (err) {
      console.error("Error deleting article:", err);
      alert("Failed to delete the article. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Articles</h2>

      {error && (
        <div className="flex items-center bg-red-50 p-3 rounded-md mb-6">
          <FiAlertCircle className="text-red-500 mr-2" />
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <FaSpinner className="animate-spin text-blue-500 text-2xl" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 text-sm font-medium text-gray-500 uppercase tracking-wider">No.</th>
                <th className="text-left p-3 text-sm font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="text-left p-3 text-sm font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="text-left p-3 text-sm font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="text-left p-3 text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {articles.length > 0 ? (
                articles.map((article, index) => (
                  <tr key={article._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 text-gray-700">{index + 1}</td>
                    <td className="p-3 text-gray-800 font-medium">{article.title}</td>
                    <td className="p-3 text-gray-600">{article.author}</td>
                    <td className="p-3 text-gray-600">
                      {format(new Date(article.date), "dd MMM yyyy")}
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-3">
                        <button 
                          className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded hover:bg-blue-50"
                          title="View"
                        >
                          <FaEye size={18} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 transition-colors p-1 rounded hover:bg-red-50"
                          onClick={() => handleDelete(article._id)}
                          disabled={deletingId === article._id}
                          title="Delete"
                        >
                          {deletingId === article._id ? (
                            <FaSpinner className="animate-spin" size={18} />
                          ) : (
                            <FaTrash size={18} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No articles found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewArticles;