"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Calendar, User, MessageSquare, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createReview } from "@/lib/database/reviews"
import type { Review } from "@/lib/types"

interface ReviewFormProps {
    hotelId: string
    userId: string
    onReviewAdded: (review: Review) => void
    onCancel: () => void
}

export default function ReviewForm({ hotelId, userId, onReviewAdded, onCancel }: ReviewFormProps) {
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [title, setTitle] = useState("")
    const [comment, setComment] = useState("")
    const [stayDate, setStayDate] = useState("")
    const [roomType, setRoomType] = useState("")
    const [tripType, setTripType] = useState<Review['tripType']>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (rating === 0) {
            setError("Please select a rating")
            return
        }

        if (comment.trim().length < 10) {
            setError("Please write at least 10 characters in your review")
            return
        }

        setLoading(true)
        setError("")

        try {
            const { data, error } = await createReview({
                hotelId,
                userId,
                rating,
                title: title.trim() || undefined,
                comment: comment.trim(),
                stayDate: stayDate ? new Date(stayDate) : undefined,
                roomType: roomType || undefined,
                tripType,
            })

            if (error) {
                setError("Failed to submit review. Please try again.")
                console.error("Error creating review:", error)
            } else if (data) {
                onReviewAdded(data)
            }
        } catch (err) {
            setError("Failed to submit review. Please try again.")
            console.error("Error creating review:", err)
        } finally {
            setLoading(false)
        }
    }

    const renderStars = () => {
        return Array.from({ length: 5 }, (_, i) => {
            const starValue = i + 1
            return (
                <button
                    key={i}
                    type="button"
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHoveredRating(starValue)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none"
                >
                    <Star
                        className={`w-8 h-8 transition-colors ${starValue <= (hoveredRating || rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300 hover:text-yellow-200"
                            }`}
                    />
                </button>
            )
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 rounded-xl p-6 border border-gray-200"
        >
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Write Your Review
                </h4>
                <button
                    onClick={onCancel}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating */}
                <div>
                    <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                        Overall Rating *
                    </Label>
                    <div className="flex items-center space-x-1">
                        {renderStars()}
                        {rating > 0 && (
                            <span className="ml-3 text-sm text-gray-600">
                                {rating} out of 5 stars
                            </span>
                        )}
                    </div>
                </div>

                {/* Title */}
                <div>
                    <Label htmlFor="title" className="text-sm font-semibold text-gray-700 mb-3 block">
                        Review Title (Optional)
                    </Label>
                    <Input
                        id="title"
                        placeholder="Summarize your experience"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="h-12"
                        maxLength={100}
                    />
                </div>

                {/* Comment */}
                <div>
                    <Label htmlFor="comment" className="text-sm font-semibold text-gray-700 mb-3 block">
                        Your Review *
                    </Label>
                    <Textarea
                        id="comment"
                        placeholder="Share your experience with other travelers..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="min-h-[120px] resize-none"
                        maxLength={1000}
                    />
                    <div className="text-xs text-gray-500 mt-1">
                        {comment.length}/1000 characters
                    </div>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="stayDate" className="text-sm font-semibold text-gray-700 mb-3 block">
                            Stay Date
                        </Label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                id="stayDate"
                                type="date"
                                value={stayDate}
                                onChange={(e) => setStayDate(e.target.value)}
                                className="pl-10 h-12"
                                max={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                    </div>

                    <div>
                        <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                            Room Type
                        </Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                            <Input
                                placeholder="e.g., Deluxe Room"
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}
                                className="pl-10 h-12"
                            />
                        </div>
                    </div>

                    <div>
                        <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                            Trip Type
                        </Label>
                        <Select value={tripType} onValueChange={(value) => setTripType(value as Review['tripType'])}>
                            <SelectTrigger className="h-12">
                                <SelectValue placeholder="Select trip type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="business">Business</SelectItem>
                                <SelectItem value="leisure">Leisure</SelectItem>
                                <SelectItem value="family">Family</SelectItem>
                                <SelectItem value="couple">Couple</SelectItem>
                                <SelectItem value="solo">Solo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center space-x-4 pt-4">
                    <Button
                        type="submit"
                        disabled={loading || rating === 0 || comment.trim().length < 10}
                        className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        ) : null}
                        {loading ? "Submitting..." : "Submit Review"}
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        className="px-6 h-12"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </motion.div>
    )
}
