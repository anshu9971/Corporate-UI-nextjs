import Script from "next/script";

export function GoogleAnalyticsScript() {
    if (process.env.NEXT_PUBLIC_ENV === "production") {
        return (
            <>
                {/* <!-- Google Tag Manager --> */}
                <Script
                    id="google-tag-manager"
                    strategy="afterInteractive"
                >{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T98JNXC')`}</Script>
                {/* <!-- End Google Tag Manager --> */}
                {/* <!-- Google tag (gtag.js) --> */}
                <Script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-KYBRK42MYH"
                />
                <Script id="google-analytics">
                    {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-KYBRK42MYH');`}
                </Script>
                <Script id="google-analytics-clarity" type="text/javascript">
                    {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "huytcysz7m");`}
                </Script>
            </>
        );
    }

    if (process.env.NEXT_PUBLIC_ENV === "dev") {
        return (
            <>
                {/* <!-- Google Tag Manager --> */}
                <Script id="dev-google-tag-manager">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T8J375ZS');`}</Script>
                {/* <!-- End Google Tag Manager --> */}

                {/* <!-- Google tag (gtag.js) --> */}
                <Script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-2CEPZC5X62"
                />
                <Script id="dev-google-analytics">
                    {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-2CEPZC5X62');`}
                </Script>

                <Script
                    type="text/javascript"
                    id="dev-google-analytics-clarity"
                >
                    {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "iu0s9hconb");`}
                </Script>
            </>
        );
    }

    return null;
}
