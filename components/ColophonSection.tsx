'use client';

import { useEffect, useState } from 'react';
import { PortableText } from '@portabletext/react';
import Droparrow from '@/assets/icons/droparrow_D04.svg';

declare global {
  interface Window {
    ShopifyBuy?: any;
  }
}

type Props = {
  stock: any;
  specs: {
    year: string;
    language: string;
    pages: string;
    physical: string;
    isbn: string;
  };
  shopifyProductId?: string;
};

export default function ColophonSection({ stock, specs, shopifyProductId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const componentId = `product-component-${shopifyProductId}`;

  // Dynamically load Shopify Buy Button script once, then init
  useEffect(() => {
    if (isOpen && shopifyProductId) {
      console.log("Initializing Shopify Buy Button for", shopifyProductId);

      const ShopifyBuyInit = () => {
        const client = window.ShopifyBuy.buildClient({
          domain: 'medupipublishing.myshopify.com',
          storefrontAccessToken: '44310749608f0ba7d9a680364c7135e4',
        });

        window.ShopifyBuy.UI.onReady(client).then((ui: any) => {
          if (!document.getElementById(componentId)?.hasChildNodes()) {
            ui.createComponent("product", {
              id: shopifyProductId,
              node: document.getElementById(componentId),
              moneyFormat: "R%20%7B%7Bamount%7D%7D%20ZAR",
              options: {
                product: {
                  buttonDestination: "cart",
                  text: { button: "Add to cart" },
                  styles: {
                    product: {
                      "text-align": "left",
                    },
                    title: {
                      color: "#000000",
                      "font-family": "Unica One, sans-serif",
                      "font-size": "1.1rem",
                      "font-weight": "normal",
                      "letter-spacing": "-0.5px",
                      "text-align": "left", // ensures title is left-aligned
                    },
                    price: {
                      "text-align": "left", // aligns price
                      color: "#000000",
                    },
                    button: {
                      "font-weight": "bold",
                      "background-color": "#c1c1f3",
                      ":hover": { "background-color": "#ddb0ad" },
                      ":focus": { "background-color": "#ddb0ad" },
                      "text-align": "left", // aligns button text
                    },
                  },
                },
                cart: {
                  styles: {
                    button: {
                      "font-weight": "bold",
                      "background-color": "#c1c1f3",
                      ":hover": { "background-color": "#ddb0ad" },
                      ":focus": { "background-color": "#ddb0ad" },
                    },
                  },
                  text: {
                    total: "Subtotal",
                    button: "Checkout",
                  },
                },
              },
            });
          }
        });
      };

      const loadScript = () => {
        const existing = document.querySelector('script[src*="buy-button-storefront.min.js"]');
        if (!existing) {
          const script = document.createElement('script');
          script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
          script.async = true;
          script.onload = ShopifyBuyInit;
          document.body.appendChild(script);
        } else {
          ShopifyBuyInit();
        }
      };

      const loadShopify = () => {
        if (window.ShopifyBuy) {
          if (window.ShopifyBuy.UI) {
            ShopifyBuyInit();
          } else {
            loadScript();
          }
        } else {
          loadScript();
        }
      };

      // ✅ Now this is correctly placed inside the effect
      loadShopify();
    }
  }, [isOpen, shopifyProductId]);


  return (
    <div className="mt-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-left w-full font-unica text-lg tracking-tight relative z-[2] hover:underline focus:outline-none"
      >
        <span className="flex items-center gap-2">
  <span className="transition-transform duration-300 transform" style={{ display: "inline-block" }}>
    <svg
      className={`w-4 h-4 transition-transform duration-300 ${
        isOpen ? "rotate-180" : "rotate-0"
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  </span>
  <span className="font-oso font-bold leading-[0.9] relative z-[2] text-[1.1em] text-left">Colophon and Stockists</span>
</span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-6">

          {/* Specs */}
          <div className="space-y-1 text-bs">
            <div><strong>Year:</strong> {specs.year}</div>
            <div><strong>Language:</strong> {specs.language}</div>
            <div><strong>Pages:</strong> {specs.pages}</div>
            <div><strong>Physical:</strong> {specs.physical}</div>
            <div><strong>ISBN:</strong> {specs.isbn}</div>
          </div>

          {/* Stockists */}
          {stock && (
            <div className="space-y-1 text-bs">
              <strong>Stockists:</strong>
              <PortableText value={stock} />
            </div>
          )}

          {/* Shopify Buy Button */}

          {shopifyProductId && (
            <div>
              <strong> Available Online: </strong>
              <div id={componentId} className="shopify-buy-button mt-4" />
            </div>
          )}

        </div>
      )}
    </div>
  );
}
