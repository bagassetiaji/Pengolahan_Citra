import { useState } from "react";
import a1Card from "./assets/images/card.jpg";
import a1Logo from "./assets/images/a1.png";
import a2Card from "./assets/images/a2.jpg";
import a3Card from "./assets/images/a3.jpg";
import a4Card from "./assets/images/a4.jpg";
import a5Card from "./assets/images/a5.jpg";
import a6Card from "./assets/images/a6.jpg";
import a7Card from "./assets/images/a7.jpg";
import a8Card from "./assets/images/a8.jpg";
import a9Card from "./assets/images/a9.jpg";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export default function NewPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="bg-gray-100 dark:bg-gray-900 h-screen flex">
        {/* Sidebar */}
        <div className="flex flex-col items-start bg-white dark:bg-gray-800 rounded-r-lg shadow-lg p-2 space-y-5 w-18 fixed h-full">
          <div className="flex items-center justify-center rounded-md bg-white-600 p-4 text-white transition-all">
            <img src={a1Logo} alt="Logo" className="h-8 w-8" />
          </div>

          <div className="flex flex-col items-start space-y-8 w-full h-full">
            <ul className="flex flex-col space-y-6 w-full flex-grow">
              {/* Icons */}
              <li className="p-5 rounded-md hover:bg-blue-100 dark:hover:bg-gray-700 transition-all cursor-pointer flex items-center w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600 dark:text-gray-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                  />
                </svg>
              </li>
              {/* More icons */}
            </ul>
            {/* Toggle Dark Mode */}
            <ul className="mt-auto w-full">
              <li
                onClick={toggleDarkMode}
                className="p-5 rounded-md hover:bg-blue-100 dark:hover:bg-gray-700 transition-all cursor-pointer flex items-center w-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600 dark:text-gray-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1.5m6.364 1.636l-1.06 1.06M21 12h-1.5M17.364 17.364l-1.06-1.06M12 21v-1.5m-6.364-1.636l1.06-1.06M3 12h1.5M6.636 6.636l1.06 1.06"
                  />
                </svg>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-8 py-4 ml-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-full overflow-y-auto">
            {/* Card 1 */}
            <Link
              to="/threshold"
              className="flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow h-full md:max-w-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <img
                className="object-cover w-full h-48 md:h-64 rounded-t-lg"
                src={a1Card}
                alt="Card 1"
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Thresholding
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Ubah gambar menjadi hitam dan putih dengan tingkat kontras
                  tinggi.Ubah gambar menjadi hitam dan putih dengan tingkat kontras
                  tinggi. 
                </p>
              </div>
            </Link>

            {/* Card 2 */}
            <Link
              to="/brightness"
              className="flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow h-full md:max-w-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <img
                className="object-cover w-full h-48 md:h-64 rounded-t-lg"
                src={a2Card}
                alt="Card 1"
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Brightness
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Tingkatkan atau kurangi kecerahan gambar dengan mudah. Fitur
                  ini membantu Anda menyesuaikan gambar agar sesuai dengan
                  suasana hati atau tema proyek Anda, sehingga setiap detail
                  terlihat jelas. 
                </p>
              </div>
            </Link>

            {/* Card 3 */}
            <Link
              to="/equalization"
              className="flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow h-full md:max-w-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <img
                className="object-cover w-full h-48 md:h-64 rounded-t-lg"
                src={a3Card}
                alt="Card 1"
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Equalization
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Sesuaikan distribusi warna dan kecerahan untuk mendapatkan
                  hasil gambar yang lebih seimbang. Fitur ini meningkatkan
                  detail di area yang gelap dan terang, menciptakan tampilan
                  yang lebih dinamis dan hidup. 
                </p>
              </div>
            </Link>
            
            {/* Card 4 */}
            <Link
              to="/grayscale"
              className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow h-full md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <img
                className="object-cover w-full h-48 md:h-64 rounded-t-lg"
                src={a4Card}
                alt="Card 4"
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Grayscale
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Ubah gambar berwarna menjadi grayscale untuk menampilkan
                  nuansa dan tekstur tanpa distraksi warna. Fitur ini sempurna
                  untuk menciptakan tampilan yang elegan dan klasik, membuat
                  elemen penting dalam gambar lebih menonjol.
                </p>
              </div>
            </Link>


            {/* Card 5 */}
            <Link
              to="/negative"
              className="flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow h-full md:max-w-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <img
                className="object-cover w-full h-48 md:h-64 rounded-t-lg"
                src={a5Card}
                alt="Card 1"
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Negative
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Ciptakan efek negatif yang menarik dengan membalikkan warna
                  gambar. Fitur ini memberikan perspektif baru dan inovatif,
                  cocok untuk menciptakan tampilan yang unik dan artistik.
                </p>
              </div>
            </Link>

            {/* Card 6 */}
            <Link
              to="/smoothing"
              className="flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow h-full md:max-w-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <img
                className="object-cover w-full h-48 md:h-64 rounded-t-lg"
                src={a6Card}
                alt="Card 1"
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Smoothing
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Haluskan gambar untuk mengurangi noise dan memberikan tampilan
                  yang lebih bersih. Fitur ini sangat berguna untuk foto dengan
                  kualitas rendah, menghasilkan gambar yang lebih profesional
                  dan menarik.
                </p>
              </div>
            </Link>

            {/* Card 7 */}
            <Link
              to="/blur"
              className="flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow h-full md:max-w-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <img
                className="object-cover w-full h-48 md:h-64 rounded-t-lg"
                src={a7Card}
                alt="Card 1"
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Blur
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Terapkan efek blur untuk melembutkan gambar, mengurangi ketajaman dan detail. 
                Fitur ini berguna untuk menciptakan tampilan yang lebih halus dan lembut atau 
                menyoroti bagian tertentu dari gambar.
                </p>
              </div>
            </Link>

            {/* Card 8 */}
            <Link
              to="/noise"
              className="flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow h-full md:max-w-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <img
                className="object-cover w-full h-48 md:h-64 rounded-t-lg"
                src={a8Card}
                alt="Card 1"
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Noise 
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Tambahkan noise ke gambar untuk menciptakan efek visual unik atau menambahkan tekstur realistis. 
                Fitur ini ideal untuk simulasi gambar yang diambil dalam kondisi pencahayaan rendah atau menambahkan 
                karakteristik noise digital untuk keperluan estetika atau pelatihan model visual.
                </p>
              </div>
            </Link>

            {/* Card 9 */}
            <Link
              to="/compres"
              className="flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow h-full md:max-w-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <img
                className="object-cover w-full h-48 md:h-64 rounded-t-lg"
                src={a9Card}
                alt="Card 1"
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Compress
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Kurangi ukuran file gambar tanpa mengurangi kualitas. Fitur ini sangat cocok 
                untuk mengoptimalkan gambar di web, menghemat ruang penyimpanan, 
                dan memastikan waktu pemuatan yang lebih cepat.
                </p>
              </div>
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
}
