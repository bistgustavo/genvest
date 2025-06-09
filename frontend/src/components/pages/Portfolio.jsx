import React, { useState, useEffect } from "react";
import { PageTransition } from "../animations/AnimationWrapper";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Portfolio = () => {
  const { user, isAuthenticated, navigate } = useAppContext();
  const [holdings, setHoldings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSector, setSelectedSector] = useState("All");
  const [sectors] = useState([
    "Banking",
    "Hydropower",
    "Insurance",
    "Manufacturing",
    "Hotels",
    "Others",
  ]);
  const [newHolding, setNewHolding] = useState({
    sector: "",
    companyName: "",
    symbol: "",
    quantity: "",
  });
  const [isAddingHolding, setIsAddingHolding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Dummy data for holdings
  const dummyHoldings = [
    {
      id: 1,
      sector: "Banking",
      companyName: "Nepal Investment Bank Limited",
      symbol: "NIBL",
      quantity: 100,
    },
    {
      id: 2,
      sector: "Hydropower",
      companyName: "Arun Valley Hydropower",
      symbol: "AHPC",
      quantity: 50,
    },
    {
      id: 3,
      sector: "Insurance",
      companyName: "Nepal Life Insurance",
      symbol: "NLIC",
      quantity: 75,
    },
    {
      id: 4,
      sector: "Manufacturing",
      companyName: "Himalayan Distillery Limited",
      symbol: "HDL",
      quantity: 30,
    },
    {
      id: 5,
      sector: "Hotels",
      companyName: "Soaltee Hotel Limited",
      symbol: "SHL",
      quantity: 45,
    },
  ];

  // Load dummy data
  useEffect(() => {
    const loadDummyData = () => {
      setIsLoading(true);
      // Simulate API delay
      setTimeout(() => {
        setHoldings(dummyHoldings);
        setIsLoading(false);
      }, 1000);
    };

    loadDummyData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHolding((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          message: "Please log in to add holdings",
          redirectTo: "/portfolio",
        },
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newId = Math.max(...holdings.map((h) => h.id), 0) + 1;
      const newHoldingWithId = {
        ...newHolding,
        id: newId,
      };

      if (editingId) {
        setHoldings((prev) =>
          prev.map((holding) =>
            holding.id === editingId
              ? { ...newHolding, id: editingId }
              : holding
          )
        );
        setEditingId(null);
      } else {
        setHoldings((prev) => [...prev, newHoldingWithId]);
      }

      setNewHolding({
        sector: "",
        companyName: "",
        symbol: "",
        quantity: "",
      });
      setIsAddingHolding(false);
    } catch (err) {
      setError("Failed to save holding. Please try again.");
      console.error("Error saving holding:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (holding) => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          message: "Please log in to edit holdings",
          redirectTo: "/portfolio",
        },
      });
      return;
    }
    setNewHolding(holding);
    setEditingId(holding.id);
    setIsAddingHolding(true);
  };

  const handleDelete = async (id) => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          message: "Please log in to delete holdings",
          redirectTo: "/portfolio",
        },
      });
      return;
    }

    if (!window.confirm("Are you sure you want to delete this holding?"))
      return;

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setHoldings((prev) => prev.filter((holding) => holding.id !== id));
    } catch (err) {
      setError("Failed to delete holding. Please try again.");
      console.error("Error deleting holding:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalHoldings = () => {
    return holdings.reduce((acc, curr) => acc + Number(curr.quantity), 0);
  };

  return (
    <PageTransition>
      <main className="pt-20 pb-16">
        <section className="relative py-12 bg-[#0D4E4A]">
          <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10"></div>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold mb-4"
              >
                Investment Portfolio
              </motion.h1>
              {isAuthenticated && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl text-[#CB9C30]"
                >
                  Welcome, {user?.fullname || "Investor"}
                </motion.p>
              )}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-[#CB9C30] mt-2"
              >
                Total Holdings: {calculateTotalHoldings()} Units
              </motion.p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-[#0D4E4A]">
                Portfolio Holdings
              </h2>
              {isAuthenticated ? (
                <button
                  onClick={() => setIsAddingHolding(true)}
                  disabled={isLoading}
                  className="bg-[#0D4E4A] text-white px-4 py-2 rounded-lg hover:bg-[#CB9C30] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add New Holding
                </button>
              ) : (
                <button
                  onClick={() =>
                    navigate("/login", {
                      state: {
                        message: "Please log in to add holdings",
                        redirectTo: "/portfolio",
                      },
                    })
                  }
                  className="bg-[#0D4E4A] text-white px-4 py-2 rounded-lg hover:bg-[#CB9C30] transition-colors"
                >
                  Login to Add Holdings
                </button>
              )}
            </div>

            {isAddingHolding && isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold text-[#0D4E4A] mb-4">
                  {editingId ? "Edit Holding" : "Add New Holding"}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#0D4E4A] mb-1">
                        Sector
                      </label>
                      <select
                        name="sector"
                        value={newHolding.sector}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D4E4A] focus:border-[#0D4E4A] disabled:opacity-50"
                      >
                        <option value="">Select Sector</option>
                        {sectors.map((sector) => (
                          <option key={sector} value={sector}>
                            {sector}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0D4E4A] mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={newHolding.companyName}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D4E4A] focus:border-[#0D4E4A] disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0D4E4A] mb-1">
                        Symbol
                      </label>
                      <input
                        type="text"
                        name="symbol"
                        value={newHolding.symbol}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D4E4A] focus:border-[#0D4E4A] disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0D4E4A] mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={newHolding.quantity}
                        onChange={handleInputChange}
                        required
                        min="1"
                        disabled={isLoading}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D4E4A] focus:border-[#0D4E4A] disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingHolding(false);
                        setEditingId(null);
                        setNewHolding({
                          sector: "",
                          companyName: "",
                          symbol: "",
                          quantity: "",
                        });
                      }}
                      disabled={isLoading}
                      className="px-4 py-2 text-[#0D4E4A] hover:text-[#CB9C30] disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-2 bg-[#0D4E4A] text-white rounded-md hover:bg-[#CB9C30] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          {editingId ? "Updating..." : "Adding..."}
                        </span>
                      ) : (
                        <>{editingId ? "Update" : "Add"} Holding</>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Add sector filters */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedSector("All")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedSector === "All"
                        ? "bg-[#0D4E4A] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    All
                  </button>
                  {sectors.map((sector) => (
                    <button
                      key={sector}
                      onClick={() => setSelectedSector(sector)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedSector === sector
                          ? "bg-[#0D4E4A] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {sector}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                {isLoading && !holdings.length ? (
                  <div className="p-8 text-center text-gray-500">
                    Loading portfolio data...
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-[#0D4E4A] text-white">
                      <tr>
                        <th className="px-6 py-3 text-left">Sector</th>
                        <th className="px-6 py-3 text-left">Company Name</th>
                        <th className="px-6 py-3 text-left">Symbol</th>
                        <th className="px-6 py-3 text-right">Quantity</th>
                        {isAuthenticated && (
                          <th className="px-6 py-3 text-center">Actions</th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {holdings
                        .filter(
                          (holding) =>
                            selectedSector === "All" ||
                            holding.sector === selectedSector
                        )
                        .map((holding) => (
                          <tr
                            key={holding.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4">{holding.sector}</td>
                            <td className="px-6 py-4">{holding.companyName}</td>
                            <td className="px-6 py-4 font-medium">
                              {holding.symbol}
                            </td>
                            <td className="px-6 py-4 text-right">
                              {holding.quantity}
                            </td>
                            {isAuthenticated && (
                              <td className="px-6 py-4 text-center">
                                <button
                                  onClick={() => handleEdit(holding)}
                                  disabled={isLoading}
                                  className="text-[#0D4E4A] hover:text-[#CB9C30] mr-4 disabled:opacity-50"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(holding.id)}
                                  disabled={isLoading}
                                  className="text-red-600 hover:text-red-800 disabled:opacity-50"
                                >
                                  Delete
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      {!isLoading &&
                        holdings.filter(
                          (holding) =>
                            selectedSector === "All" ||
                            holding.sector === selectedSector
                        ).length === 0 && (
                          <tr>
                            <td
                              colSpan={isAuthenticated ? "5" : "4"}
                              className="px-6 py-8 text-center text-gray-500"
                            >
                              {selectedSector === "All"
                                ? "No holdings found."
                                : `No holdings found in ${selectedSector} sector.`}
                            </td>
                          </tr>
                        )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default Portfolio;
