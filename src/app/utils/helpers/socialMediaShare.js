const openPopUpWindow = (url) => {
    const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=600,height=600,left=100,top=100`;

    window.open(url, "name", params);
};

export const whatsappShareHandler = (
    url,
    from,
    document,
    skipSkillLevelText,
) => {
    openPopUpWindow(
        `https://api.whatsapp.com/send?text=${
            from === "career-discovery"
                ? `Check out my Mental Make-up ${
                      document === "certificate" ? "certificate" : "report"
                  }:\n\n`
                : `Check out my ${skipSkillLevelText ? "" : "skill level"} ${
                      document === "certificate" ? "certificate" : "report"
                  }:\n\n`
        }${encodeURIComponent(url)}`,
        "Share on Whatsapp",
    );
};

export const linkedInShareHandler = (url, from) => {
    console.log(
        "here...",
        `https://www.linkedin.com/shareArticle?summary=${
            from === "career-discovery"
                ? "My+WiZR+Mental+Make-up+Discovery+Certificate"
                : "My+WiZR+Skill+Level+Discovery+Certificate"
        }+:&url=${encodeURIComponent(url)}&source=Wizr&title=${
            from === "career-discovery"
                ? "WiZR+-+Mental+Make-up+Discovery+Certificate"
                : "WiZR+-+Skill+Level+Discovery+Certificate"
        }&mini=true`,
    );
    openPopUpWindow(
        `https://www.linkedin.com/shareArticle?summary=${
            from === "career-discovery"
                ? "My+WiZR+Mental+Make-up+Discovery+Certificate"
                : "My+WiZR+Skill+Level+Discovery+Certificate"
        }+:&url=${encodeURIComponent(url)}&source=Wizr&title=${
            from === "career-discovery"
                ? "WiZR+-+Mental+Make-up+Discovery+Certificate"
                : "WiZR+-+Skill+Level+Discovery+Certificate"
        }&mini=true`,
        "Share on LinkedIn",
    );
};

export const downloadHandler = async (
    possiblyShortUrl,
    nameOfDownload,
    getTallFromShortUrl = false,
) => {
    let imageSrc = possiblyShortUrl;
    if (getTallFromShortUrl) {
        const res = await fetch(possiblyShortUrl);
        imageSrc = res.url;
    }
    const response = await fetch(imageSrc);

    const blobImage = await response.blob();

    const href = URL.createObjectURL(blobImage);

    const anchorElement = document.createElement("a");
    anchorElement.href = href;
    anchorElement.download = nameOfDownload;

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
};
