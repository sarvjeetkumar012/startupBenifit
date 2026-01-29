'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DealCard from '@/components/DealCard';
import { Deal } from '@/types';

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [accessLevel, setAccessLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDeals();
  }, []);

  useEffect(() => {
    filterDeals();
  }, [deals, category, accessLevel, searchQuery]);

  const fetchDeals = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deals`);
      const data = await response.json();
      if (data.success) {
        setDeals(data.data);
      }
    } catch (error) {
      console.error('Error fetching deals:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterDeals = () => {
    let filtered = [...deals];

    // Category filter
    if (category !== 'all') {
      filtered = filtered.filter((deal) => deal.category === category);
    }

    // Access level filter
    if (accessLevel === 'unlocked') {
      filtered = filtered.filter((deal) => !deal.isLocked);
    } else if (accessLevel === 'locked') {
      filtered = filtered.filter((deal) => deal.isLocked);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (deal) =>
          deal.title.toLowerCase().includes(query) ||
          deal.description.toLowerCase().includes(query) ||
          deal.partnerName.toLowerCase().includes(query)
      );
    }

    setFilteredDeals(filtered);
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'cloud-services', label: 'Cloud Services' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'productivity', label: 'Productivity' },
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'communication', label: 'Communication' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Exclusive Deals
          </h1>
          <p className="text-xl text-gray-600">
            Discover premium SaaS tools at startup-friendly prices
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label htmlFor="search-deals" className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                id="search-deals"
                type="text"
                placeholder="Search deals..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category-filter"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Access Level */}
            <div>
              <label htmlFor="access-level" className="block text-sm font-medium text-gray-700 mb-2">
                Access Level
              </label>
              <select
                id="access-level"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                value={accessLevel}
                onChange={(e) => setAccessLevel(e.target.value)}
              >
                <option value="all">All Deals</option>
                <option value="unlocked">Unlocked Only</option>
                <option value="locked">Verified Only</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-600">
            Showing {filteredDeals.length} of {deals.length} deals
          </p>
        </motion.div>

        {/* Deals Grid */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        )}
        
        {!loading && filteredDeals.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-xl text-gray-600 mb-4">No deals found</p>
            <button
              onClick={() => {
                setCategory('all');
                setAccessLevel('all');
                setSearchQuery('');
              }}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear filters
            </button>
          </motion.div>
        )}
        
        {!loading && filteredDeals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeals.map((deal, index) => (
              <DealCard key={deal._id} deal={deal} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
