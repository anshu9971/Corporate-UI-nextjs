import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    const url = new URL(request.url);
    const { pathname } = url;
    const slugName = pathname?.replace("/", "");
    const body = `{"type": "course", "slug_name": "${slugName}"}`;
    if (!pathname?.startsWith("/course/")) return;

    const data = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product/get-object-by-slug`,
        {
            headers: { "Content-type": "application/json" },
            method: "POST",
            body,
        },
    )
        .then((res) => res?.json())
        .catch(() => {});
    if (
        data?.message === "No Products Found" ||
        (Array.isArray(data?.data) && data?.data?.length === 0)
    ) {
        // eslint-disable-next-line consistent-return
        return NextResponse.redirect(
            new URL("/collections/all-courses", request.url),
        );
    }
}

export const config = {
    matcher: ["/course/:courseName*"],
};
