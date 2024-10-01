/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-no-useless-fragment */

export async function GET() {
    const response = await fetch(
        "https://general-document-dev.s3.ap-south-1.amazonaws.com/sitemap/course-sitemap.xml",
    );
    const text = await response.text();
    const headers = new Headers({
        "Content-Type": "text/xml",
    });
    return new Response(text, { headers });
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
