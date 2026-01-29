'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Deal } from '@/types';

export default function DealDetailPage({ params }: { readonly params: { id: string } }) {
  const router = useRouter();
  const { user, token } = useAuth();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchDeal();
  }, [params.id]);

  const fetchDeal = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deals/${params.id}`);
      const data = await response.json();
      if (data.success) {
        setDeal(data.data);
      }
    } catch (error) {
      console.error('Error fetching deal:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (deal?.isLocked && !user.isVerified) {
      setMessage({
        type: 'error',
        text: 'This deal requires user verification. Please verify your account first.',
      });
      return;
    }

    setClaiming(true);
    setMessage(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/claims`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ dealId: params.id }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to claim deal' });
    } finally {
      setClaiming(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Deal not found</h2>
          <Link href="/deals" className="text-primary-600 hover:text-primary-700">
            Back to deals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back Button */}
          <Link
            href="/deals"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 transition"
          >
            ← Back to deals
          </Link>

          {/* Deal Header */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-primary-600 to-primary-400 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{deal.title}</h1>
                  <p className="text-primary-100">{deal.partnerName}</p>
                </div>
                {deal.isLocked && (
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <span className="text-white font-semibold">🔒 Verified Only</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-8">
              {/* Discount Badge */}
              <div className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-lg font-bold text-lg mb-6">
                {deal.discountValue}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{deal.description}</p>
              </div>

              {/* Deal Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Category</h3>
                  <p className="text-gray-700 capitalize">
                    {deal.category.replace('-', ' ')}
                  </p>
                </div>

                {deal.originalPrice && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Original Price</h3>
                    <p className="text-gray-700">{deal.originalPrice}</p>
                  </div>
                )}

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Eligibility</h3>
                  <p className="text-gray-700">{deal.eligibilityCriteria}</p>
                </div>

                {deal.claimLimit && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Availability</h3>
                    <p className="text-gray-700">
                      {deal.claimLimit - deal.currentClaims} of {deal.claimLimit} remaining
                    </p>
                  </div>
                )}
              </div>

              {/* Terms and Conditions */}
              {deal.termsAndConditions && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    Terms & Conditions
                  </h2>
                  <p className="text-gray-700 leading-relaxed">{deal.termsAndConditions}</p>
                </div>
              )}

              {/* Message Alert */}
              {message && (
                <motion.div
                  className={`mb-6 p-4 rounded-lg ${
                    message.type === 'success'
                      ? 'bg-green-50 border border-green-200 text-green-700'
                      : 'bg-red-50 border border-red-200 text-red-700'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {message.text}
                </motion.div>
              )}

              {/* Claim Button */}
              <motion.button
                onClick={handleClaim}
                disabled={
                  claiming ||
                  Boolean(deal.claimLimit && deal.currentClaims >= deal.claimLimit)
                }
                className="w-full py-4 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {(() => {
                  if (claiming) return 'Processing...';
                  if (deal.claimLimit && deal.currentClaims >= deal.claimLimit) return 'Limit Reached';
                  if (user) return 'Claim This Deal';
                  return 'Login to Claim';
                })()}
              </motion.button>

              {!user && (
                <p className="text-center text-gray-600 mt-4">
                  Need an account?{' '}
                  <Link href="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                    Sign up free
                  </Link>
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
