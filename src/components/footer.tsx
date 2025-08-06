import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-sm text-gray-700 mt-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand and About */}
        <div>
          <h2 className="text-xl font-bold text-gray-800">WowStay</h2>
          <p className="mt-3 text-gray-600">
            Book hotels and stays at the best prices. Trusted by thousands of travelers across India.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-black">About Us</a></li>
            <li><a href="/careers" className="hover:text-black">Careers</a></li>
            <li><a href="/blog" className="hover:text-black">Blog</a></li>
            <li><a href="/partners" className="hover:text-black">Partner with Us</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <ul className="space-y-2">
            <li><a href="/help" className="hover:text-black">Help Center</a></li>
            <li><a href="/cancellation" className="hover:text-black">Cancellation Policy</a></li>
            <li><a href="/contact" className="hover:text-black">Contact Us</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold mb-3">Legal</h3>
          <ul className="space-y-2">
            <li><a href="/terms" className="hover:text-black">Terms & Conditions</a></li>
            <li><a href="/privacy" className="hover:text-black">Privacy Policy</a></li>
            <li><a href="/security" className="hover:text-black">Security</a></li>
          </ul>

          {/* Socials */}
          <div className="flex gap-4 mt-4 text-gray-600">
            <a href="#" className="hover:text-black"><FaFacebookF /></a>
            <a href="#" className="hover:text-black"><FaTwitter /></a>
            <a href="#" className="hover:text-black"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} StayNest Hospitality Pvt Ltd. All rights reserved.
      </div>
    </footer>
  )
}
