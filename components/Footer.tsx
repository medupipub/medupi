import Image from 'next/image';

export default function Footer() {
  return (
     <footer className="w-full bg-[#f5f0b8] pt-[80px] pb-12 shadow-[0_0_0.8rem_0.8rem_#f5f0b8]">
          <div
            id="footer-container"
            className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-12"
          >
            {/* Footer Left */}
            <div id="footer-left" className="w-full md:max-w-sm text-center md:text-left">
              <h2 className="text-xl font-semibold mb-4">Newsletter</h2>
              <form
                action="https://medupipub.us12.list-manage.com/subscribe/post?u=190d2c04483444ca64d05472e&amp;id=580cdd27c7"
                method="post"
                target="_blank"
                noValidate
                className="space-y-4"
              >
                <div>
                  <label htmlFor="mce-EMAIL" className="block mb-1">Email Address</label>
                  <input
                    type="email"
                    name="EMAIL"
                    id="mce-EMAIL"
                    required
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label htmlFor="mce-FNAME" className="block mb-1">Name</label>
                  <input
                    type="text"
                    name="FNAME"
                    id="mce-FNAME"
                    className="w-full border p-2 rounded"
                  />
                </div>

                {/* Hidden anti-bot field */}
                <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
                  <input
                    type="text"
                    name="b_190d2c04483444ca64d05472e_580cdd27c7"
                    tabIndex={-1}
                  />
                </div>

                <button
                  type="submit"
                  className="bg-white text-black px-4 py-2 rounded hover:bg-gray-800"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Star Image */}
            <div className="flex justify-center">
              <Image
                src="/SVG/Star.svg"
                id="footer-star"
                alt="Star"
                className="w-[200px] md:w-[250px] h-auto"
                width="250"
                height="200"
              />
            </div>

            {/* Footer Right */}
            <div id="footer-right" className="w-full md:w-auto text-center md:text-left">
              <div id="social-links" className="space-y-2">
                <p>
                  <a
                    href="mailto:info@medupipub.com"
                    className="text-black hover:underline"
                  >
                    info@medupipub.com
                  </a>
                </p>
                <p>
                  <a
                    href="https://www.linkedin.com/company/medupi-publishing/"
                    className="text-black hover:underline"
                  >
                    LinkedIn
                  </a>
                </p>
                <p>
                  <a
                    href="https://www.instagram.com/medupipublishing/"
                    className="text-black hover:underline"
                  >
                    Instagram
                  </a>
                </p>
                <p>
                  <a
                    href="https://www.facebook.com/profile.php?id=61572789066678"
                    className="text-black hover:underline"
                  >
                    Facebook
                  </a>
                </p>
                <p>
                  <a
                    href="https://x.com/medupipub"
                    className="text-black hover:underline"
                  >
                    X/Twitter
                  </a>
                </p>
              </div>
              <p className="mt-4 text-sm">© 2025 Medupi Publishing</p>
            </div>
          </div>
        </footer>
  );
}