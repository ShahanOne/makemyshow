import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Makemyshow',
  description: 'Your favourite shows, Shaken up!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
