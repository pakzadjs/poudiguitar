"use client";

export default function Zarinpal() {
  return (
    <a
      href={`https://www.zarinpal.com/trustPage/${window?.location?.hostname}`}
      title="دروازه پرداخت معتبر"
      target="_blank"
      rel="noreferrer noopener"
    >
      <img
        src="https://cdn.zarinpal.com/badges/trustLogo/1.svg"
        border="0"
        alt="دروازه پرداخت معتبر"
      />
    </a>
  );
}
