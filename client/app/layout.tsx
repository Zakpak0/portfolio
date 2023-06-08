import { Locale, i18n } from "i18n-config";
import { Metadata } from 'next';
import "styles/global.css";
export async function generateStaticParams() {
    return i18n.locales.map((lang) => ({ params: { lang } }));
}
export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
    params
}: {
    children: React.ReactNode;
    params: { lang: Locale }
}) {
    return (
        <html lang={params?.lang}>
            <body>{children}</body>
        </html>
    );
}
export const metadata: Metadata = {
    title: 'Home',
    description: 'Welcome to Next.js',
};
export type LayoutParams = {
    lang: Locale
}