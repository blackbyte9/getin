"use server";

import transporter from "@/lib/mail";

const styles = {
    container: "max-width:500px;margin:20px auto;padding:20px;border:1px solid #ddd;border-radius:6px;",
    heading: "font-size:20px;color:#333;",
    paragraph: "font-size:16px;",
    link: "display:inline-block;margin-top:15px;padding:10px 15px;background:#007bff;color:#fff;text-decoration:none;border-radius:4px;",
};

export async function sendEmailAction({
    to,
    subject,
    meta,
}: {
    to: string;
    subject: string;
    meta: {
        description: string;
        link: string;
    }
}) {
    const mailOption = {
        from: process.env.SMTP_FROM,
        to,
        subject: subject,
        html: `<div style="${styles.container}">
                <h1 style="${styles.heading}">${subject}</h1>
                <p style="${styles.paragraph}">${meta.description}</p>
                <a href="${meta.link}" style="${styles.link}">Click Here</a>
            </div>`,
    };
    try {
        await transporter.sendMail(mailOption);
        // eslint-disable-next-line no-console
        console.log("Email sent to:", to);
        return { success: true };
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error sending email:", error);
        return { success: false, error };
    }

};
