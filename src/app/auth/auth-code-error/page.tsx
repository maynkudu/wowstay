import Link from "next/link";

export default function AuthCodeError() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Error</h1>
                <p className="text-gray-600 mb-6">
                    Sorry, we couldn&apos;t complete your authentication. Please try signing in again.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                    Return to Home
                </Link>
            </div>
        </div>
    )
}
