import { useEffect } from "react";

export const AdsenseMain = () => {
  const isProduction = process.env.NODE_ENV === "production" ? true : false;

  useEffect(() => {
    // setTimeout(() => {
    //   (window.adsbygoogle = window.adsbygoogle || []).push({});
    // }, 10);
  }, []);

  return (
    <>
      {!isProduction ? (
        <>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-9130836798889522"
            data-ad-slot="7319976494"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `(window.adsbygoogle = window.adsbygoogle || []).push({})`,
            }}
          />
        </>
      ) : (
        <div
          style={{
            width: "100%",
            height: "360px",
            backgroundColor: "#2d3436",
            margin: "0 auto",
          }}
        >
          애드센스
        </div>
      )}
    </>
  );
};
