"use client";

import { useRouter } from "next/navigation";

const NotFoundPage = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="text-center max-w-md">

                {/* Big 404 */}
                <h1 className="text-8xl font-bold text-[#1e4d3a] mb-4">
                    404
                </h1>

                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Page not found
                </h2>

                <p className="text-sm text-gray-500 mb-6">
                    The page you are looking for doesn’t exist or has been moved.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => router.push("/")}
                        className="bg-[#1e4d3a] text-white px-5 py-2 rounded-lg hover:opacity-90 transition"
                    >
                        Go Home
                    </button>

                    <button
                        onClick={() => router.back()}
                        className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-200 transition"
                    >
                        Go Back
                    </button>
                </div>

                {/* Helper text */}
                <p className="text-xs text-gray-400 mt-6">
                    Check the URL or return to the homepage.
                </p>

            </div>
        </div>
    );
};

export default NotFoundPage;