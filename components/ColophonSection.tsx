'use client';

import { useEffect, useState } from 'react';
import { PortableText } from '@portabletext/react';
import { PortableTextBlock } from "sanity";

type ShopifyBuyClient = object;

interface ShopifyBuyUI {
  onReady(client: ShopifyBuyClient): Promise<{
    createComponent: (...args: unknown[]) => void;
  }>;
}

declare global {
  interface Window {
    ShopifyBuy?: {
      buildClient: (config: Record<string, unknown>) => ShopifyBuyClient;
      UI: ShopifyBuyUI;
    };
  }
}

type Props = {
  stock: PortableTextBlock[];
  specs: {
    year: string;
    language: string;
    pages: string;
    physical: string;
    isbn: string;
    designer: string;
  };
  shopifyProductId?: string;
};

export default function ShopifySection({ stock, specs, shopifyProductId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const componentId = `product-component-${shopifyProductId}`;

  // Utility function to get filled specs
  const getFilledSpecs = () => {
    const specFields = [
      { key: 'year' as const, label: 'Year' },
      { key: 'language' as const, label: 'Language' },
      { key: 'pages' as const, label: 'Pages' },
      { key: 'physical' as const, label: 'Physical Format' },
      { key: 'isbn' as const, label: 'ISBN' },
      { key: 'designer' as const, label: 'Designer' },
    ];

    return specFields.filter(field => {
      const value = specs[field.key];
      return value && value.trim() !== '';
    });
  };

  const filledSpecs = getFilledSpecs();

  useEffect(() => {
    if (isOpen && shopifyProductId) {
      const ShopifyBuyInit = () => {
        const client = window.ShopifyBuy!.buildClient({
          domain: 'medupipublishing.myshopify.com',
          storefrontAccessToken: '44310749608f0ba7d9a680364c7135e4',
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.ShopifyBuy!.UI.onReady(client).then((ui: any) => {
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
                    product: { "text-align": "left" },
                    title: {
                      color: "#000000",
                      "font-family": "Unica One, sans-serif",
                      "font-size": "1.1rem",
                      "font-weight": "normal",
                      "letter-spacing": "-0.5px",
                      "text-align": "left",
                    },
                    price: {
                      "text-align": "left",
                      color: "#000000",
                    },
                    button: {
                      "font-weight": "bold",
                      "background-color": "#c1c1f3",
                      ":hover": { "background-color": "#ddb0ad" },
                      ":focus": { "background-color": "#ddb0ad" },
                      "text-align": "left",
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

      loadShopify();
    }
  }, [isOpen, shopifyProductId, componentId]);

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
          <span className="font-oso font-bold leading-[0.9] relative z-[2] text-[1.1em] text-left">
            Colophon and Stockists
          </span>
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-6">
          {/* Specs - Only show if there are filled specs */}
          {filledSpecs.length > 0 && (
            <div className="space-y-1 text-bs">
              {filledSpecs.map(field => (
                <div key={field.key}>
                  <strong>{field.label}:</strong> {specs[field.key]}
                </div>
              ))}
            </div>
          )}

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