"use client"

import { motion } from "framer-motion"
import { Star, ThumbsUp, Calendar, User } from 'lucide-react'
import type { Review } from "@/lib/types"
import { voteReviewHelpful } from "@/lib/database/reviews"
import { useState } from "react"

interface ReviewSectionProps {
    reviews: Review[]
    loading: boolean
    userReview?: Review
}

export default function ReviewSection({ reviews, loading, userReview }: ReviewSectionProps) {
    const [votingStates, setVotingStates] = useState<Record<string, boolean>>({})

    const handleHelpfulVote = async (reviewId: string) => {
        if (votingStates[reviewId]) return // Prevent double voting

        setVotingStates(prev => ({ ...prev, [reviewId]: true }))

        const { error } = await voteReviewHelpful(reviewId)
        if (error) {
            console.error('Error voting:', error)
            setVotingStates(prev => ({ ...prev, [reviewId]: false }))
        }
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
            />
        ))
    }

    const getTripTypeColor = (tripType?: string) => {
        switch (tripType) {
            case 'business': return 'bg-blue-100 text-blue-800'
            case 'leisure': return 'bg-green-100 text-green-800'
            case 'family': return 'bg-purple-100 text-purple-800'
            case 'couple': return 'bg-pink-100 text-pink-800'
            case 'solo': return 'bg-orange-100 text-orange-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    if (loading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 3 }, (_, i) => (
                    <div key={i} className="animate-pulse">
                        <div className="flex items-center space-x-4 mb-3">
                            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                            <div className="flex-1">
                                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                            </div>
                        </div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                ))}
            </div>
        )
    }

    if (reviews.length === 0) {
        return (
            <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h4>
                <p className="text-gray-600">Be the first to share your experience!</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* User's own review (if exists) */}
            {userReview && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-2 border-blue-200 bg-blue-50 rounded-xl p-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                You
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900">Your Review</div>
                                <div className="flex items-center space-x-2">
                                    <div className="flex items-center">
                                        {renderStars(userReview.rating)}
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        {new Date(userReview.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {userReview.title && (
                        <h4 className="font-semibold text-gray-900 mb-2">{userReview.title}</h4>
                    )}

                    <p className="text-gray-700 mb-4">{userReview.comment}</p>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                        {userReview.tripType && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTripTypeColor(userReview.tripType)}`}>
                                {userReview.tripType}
                            </span>
                        )}
                        {userReview.roomType && (
                            <span className="flex items-center">
                                <User className="w-4 h-4 mr-1" />
                                {userReview.roomType}
                            </span>
                        )}
                        {userReview.stayDate && (
                            <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                Stayed {new Date(userReview.stayDate).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                </motion.div>
            )}

            {/* Other reviews */}
            {reviews.filter(review => review.id !== userReview?.id).map((review, index) => (
                <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-200 pb-6 last:border-b-0"
                >
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            {review.user?.avatarUrl ? (
                                <img
                                    src={review.user.avatarUrl || "/placeholder.svg"}
                                    alt={`${review.user.firstName} ${review.user.lastName}`}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                    {review.user ? `${review.user.firstName[0]}${review.user.lastName[0]}` : 'U'}
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <div className="font-semibold text-gray-900">
                                        {review.user ? `${review.user.firstName} ${review.user.lastName}` : 'Anonymous'}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="flex items-center">
                                            {renderStars(review.rating)}
                                        </div>
                                        <span className="text-sm text-gray-600">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </span>
                                        {review.isVerified && (
                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                                Verified Stay
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {review.title && (
                                <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                            )}

                            <p className="text-gray-700 mb-4">{review.comment}</p>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    {review.tripType && (
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTripTypeColor(review.tripType)}`}>
                                            {review.tripType}
                                        </span>
                                    )}
                                    {review.roomType && (
                                        <span className="flex items-center">
                                            <User className="w-4 h-4 mr-1" />
                                            {review.roomType}
                                        </span>
                                    )}
                                    {review.stayDate && (
                                        <span className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            Stayed {new Date(review.stayDate).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>

                                <button
                                    onClick={() => handleHelpfulVote(review.id)}
                                    disabled={votingStates[review.id]}
                                    className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 transition-colors disabled:opacity-50"
                                >
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>Helpful ({review.helpfulVotes})</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
