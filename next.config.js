/** @type {import('next').NextConfig} */

const nextConfig = {
    swcMinify: true,
    poweredByHeader: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "upload.wikimedia.org",
            },
            {
                protocol: "https",
                hostname: "uploads-ssl.webflow.com",
            },
            {
                protocol: "https",
                hostname: "www.upgrad.com", // Test Images
            },
            {
                protocol: "https",
                hostname: "wizr-assets.s3.ap-south-1.amazonaws.com",
            },
            {
                protocol: "https",
                hostname: "d7bvc5ocjh0yg.cloudfront.net",
            },
            {
                protocol: "https",
                hostname: "d1jnx9ba8s6j9r.cloudfront.net",
            },
            {
                protocol: "https",
                hostname: "wizr-dev-upload.s3.ap-south-1.amazonaws.com",
            },
            {
                protocol: "https",
                hostname: "www.guvi.in",
            },
            {
                protocol: "https",
                hostname: "prod-wizr-bucket.s3.ap-south-1.amazonaws.com",
            },
            {
                protocol: "https",
                hostname: "wizr-upload.s3.ap-south-1.amazonaws.com",
            },
            {
                protocol: "https",
                hostname: "d23n8act5ky788.cloudfront.net",
            },
            {
                protocol: "https",
                hostname: "d2yozrc69yt9yo.cloudfront.net",
            },
            {
                protocol: "https",
                hostname: "tinyurl.com",
            },
            {
                protocol: "https",
                hostname: "d1idiaqkpcnv43.cloudfront.net",
            },
            {
                protocol: "https",
                hostname: "talentedge.com",
            },
            {
                protocol: "https",
                hostname: "hindubabynames.info",
            },
            {
                protocol: "https",
                hostname: "wizr-cloudfront.s3.ap-south-1.amazonaws.com",
            },
            {
                protocol: "https",
                hostname: "general-document-dev.s3.ap-south-1.amazonaws.com",
            },
            {
                protocol: "https",
                hostname: "general-document.s3.ap-south-1.amazonaws.com",
            },
        ],
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    // { key: "Referrer-Policy", value: "no-referrer" },
                    // {
                    //     key: "next-router-prefetch",
                    //     value: "max-age=31536000; includeSubDomains",
                    // },
                    // {
                    //     key: "Strict-Transport-Security",
                    //     value: "max-age=31536000; includeSubDomains",
                    // },
                    {
                        key: "Cache-Control",
                        value: "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
                    },
                    { key: "X-Powered-By", value: "none" },
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    // {
                    //     key: "Content-Security-Policy",
                    //     value: `
                    //     default-src 'self';
                    //     script-src 'self' 'unsafe-inline';
                    //     style-src 'self' 'unsafe-inline';
                    //     img-src 'self' blob: data:;
                    //     font-src 'self';
                    //     object-src 'none';
                    //     base-uri 'self';
                    //     form-action 'self';
                    //     frame-ancestors 'none';
                    //     upgrade-insecure-requests;
                    // `.replace(/\n/g, ""),
                    // },
                ],
            },
        ];
    },
    async rewrites() {
        return [
            { source: "/robots.txt", destination: "/api/robots" },
            {
                source: "/course-sitemap.xml",
                destination: "/api/course-sitemap",
            },
        ];
    },
    webpack: (config) => {
        // Create a new configuration object based on the original
        const newConfig = {
            ...config,
            resolve: {
                ...config.resolve,
                alias: {
                    ...config.resolve.alias,
                    canvas: false,
                    encoding: false,
                },
            },
        };

        // Define the property on the new configuration object
        Object.defineProperty(newConfig, "devtool", {
            get() {
                return "source-map";
            },
            set() {},
        });

        return newConfig;
    },
};

module.exports = nextConfig;

// this should be the value of CSP headers

// Content-Security-Policy:
//     default-src 'self';
//     script-src 'self' 'unsafe-eval' 'unsafe-inline';
//     style-src 'self' 'unsafe-inline';
//     img-src 'self' blob: data: https://upload.wikimedia.org https://uploads-ssl.webflow.com https://www.upgrad.com https://wizr-assets.s3.ap-south-1.amazonaws.com https://d7bvc5ocjh0yg.cloudfront.net https://d1jnx9ba8s6j9r.cloudfront.net https://wizr-dev-upload.s3.ap-south-1.amazonaws.com https://www.guvi.in https://prod-wizr-bucket.s3.ap-south-1.amazonaws.com https://wizr-upload.s3.ap-south-1.amazonaws.com https://d23n8act5ky788.cloudfront.net https://d2yozrc69yt9yo.cloudfront.net https://tinyurl.com https://d1idiaqkpcnv43.cloudfront.net https://talentedge.com https://hindubabynames.info https://wizr-cloudfront.s3.ap-south-1.amazonaws.com https://general-document-dev.s3.ap-south-1.amazonaws.com;
//     font-src 'self';
//     object-src 'none';
//     base-uri 'self';
//     form-action 'self';
//     frame-ancestors 'none';
//     upgrade-insecure-requests;
//     connect-src 'self' https://saas-uat.wizr.in;
