import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Providers } from '@/redux/Providers'; // Doğru yolu kontrol edin

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
