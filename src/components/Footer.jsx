import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#2b5b49] text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        
        {/* Title */}
        <h2 className="text-4xl font-bold mb-4">KeenKeeper</h2>

        {/* Subtitle */}
        <p className="text-gray-200 max-w-xl mx-auto text-sm mb-8">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>

        {/* Social Links */}
        <div className="mb-10">
          <p className="text-sm text-gray-200 mb-3">Social Links</p>

          <div className="flex justify-center gap-4">
            
            <Link href="#">
              <div className="hover:scale-110 transition">
                <Image
                  src="/assets/facebook.png"
                  alt="facebook"
                  width={40}
                  height={40}
                />
              </div>
            </Link>

            <Link href="#">
              <div className="hover:scale-110 transition">
                <Image
                  src="/assets/instagram.png"
                  alt="instagram"
                  width={40}
                  height={40}
                />
              </div>
            </Link>

            <Link href="#">
              <div className="hover:scale-110 transition">
                <Image
                  src="/assets/twitter.png"
                  alt="twitter"
                  width={40}
                  height={40}
                />
              </div>
            </Link>

          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-200">
          <p>© 2026 KeenKeeper. All rights reserved.</p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;