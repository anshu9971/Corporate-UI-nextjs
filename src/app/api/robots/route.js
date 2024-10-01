export async function GET() {
    //     if (process.env.NEXT_PUBLIC_ENV === "production")
    //         return new Response(
    //             `User-agent: *
    // Disallow: /discovery-report
    // Disallow: /discover/expertise-discovery/report/
    // Disallow: /marketing-campaign/

    // Sitemap: https://www.wizr.in/sitemap.xml`,
    //         );

    return new Response(
        `User-agent: *
Disallow: /
`,
    );
}
