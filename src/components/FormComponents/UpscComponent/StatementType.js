import React from 'react'

function StatementType() {
  return (
    <div
      style={{
        marginTop: "3%",
      }}
    >
      <p
        style={{
          fontFamily: "Roboto",
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: "12px",
        }}
      >
        {" "}
        By clicking 'Submit,' you acknowledge that you have read, understood,
        and agree to the &nbsp;
        <span
          style={{
            textDecoration: "underline",
            color: "blue",
            cursor: "pointer",
          }}
        >
          <a
            href="https://app.joshtalks.org/privacy-policy/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Privacy Policy
          </a>
        </span>
        &nbsp; and&nbsp;
        <span
          style={{
            textDecoration: "underline",
            color: "blue",
            cursor: "pointer",
          }}
        >
          {" "}
          <a
            href="https://app.joshtalks.org/terms-conditions/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Terms & Conditions{" "}
          </a>
        </span>{" "}
        &nbsp;of Josh Talks. Additionally, I authorize Josh Talks and its
        representatives to contact me with updates and notifications via Email,
        SMS, WhatsApp, and Call. I understand that this consent will override
        the registry on DND and NDNC.
      </p>
    </div>
  );
}

export default StatementType