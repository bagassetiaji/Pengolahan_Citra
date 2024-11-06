import { useState } from "react";
import { Bar } from "react-chartjs-2";
import a1Logo from "./assets/images/a1.png";
import { useLocation } from "react-router-dom"; // Import use

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function EqualizationPanel() {
  const [isUploaded, setIsUploaded] = useState(false);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [brightnessedImage, setEqualizationImage] = useState(null);
  const [modifiedHistogramData, setModifiedHistogramData] = useState(
    Array(256).fill(0)
  );
  const [originalHistogramData, setOriginalHistogramData] = useState(
    Array(256).fill(0)
  );

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setIsUploaded(true);
        setEqualizationImage(null); 
        setModifiedHistogramData(Array(256).fill(0)); 
        calculateOriginalHistogram(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };


  const handleReset = () => {
    setEqualizationImage(null); // Reset to original image
    setModifiedHistogramData(Array(256).fill(0)); // Reset histogram
  };

  const calculateOriginalHistogram = (imageSrc) => {
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Create a new histogram array for the original image
      const newOriginalHistogram = Array(256).fill(0);

      // Calculate histogram
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3; // Calculate average for RGB
        newOriginalHistogram[Math.floor(avg)]++; // Increment histogram for the average value
      }

      // Update original histogram data
      setOriginalHistogramData(newOriginalHistogram);
    };
  };

  const handleEqualizeImage = () => {
    if (uploadedImage) {
      const image = new Image();
      image.src = uploadedImage;
  
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
  
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
  
        // Step 1: Konversi dari RGB ke HSV
        const rgbToHsv = (r, g, b) => {
          const rNorm = r / 255, gNorm = g / 255, bNorm = b / 255;
          const max = Math.max(rNorm, gNorm, bNorm), min = Math.min(rNorm, gNorm, bNorm);
          const delta = max - min;
  
          let h = 0;
          if (delta !== 0) {
            if (max === rNorm) h = (gNorm - bNorm) / delta % 6;
            else if (max === gNorm) h = (bNorm - rNorm) / delta + 2;
            else h = (rNorm - gNorm) / delta + 4;
            h *= 60;
            if (h < 0) h += 360;
          }
  
          const s = max === 0 ? 0 : delta / max;
          const v = max;
  
          return [h, s, v];
        };
  
        const hsvToRgb = (h, s, v) => {
          const c = v * s;
          const x = c * (1 - Math.abs((h / 60) % 2 - 1));
          const m = v - c;
  
          let rNorm, gNorm, bNorm;
          if (h >= 0 && h < 60) [rNorm, gNorm, bNorm] = [c, x, 0];
          else if (h >= 60 && h < 120) [rNorm, gNorm, bNorm] = [x, c, 0];
          else if (h >= 120 && h < 180) [rNorm, gNorm, bNorm] = [0, c, x];
          else if (h >= 180 && h < 240) [rNorm, gNorm, bNorm] = [0, x, c];
          else if (h >= 240 && h < 300) [rNorm, gNorm, bNorm] = [x, 0, c];
          else [rNorm, gNorm, bNorm] = [c, 0, x];
  
          return [
            Math.round((rNorm + m) * 255),
            Math.round((gNorm + m) * 255),
            Math.round((bNorm + m) * 255),
          ];
        };
  
        const histogram = Array(256).fill(0);
        const newHistogram = Array(256).fill(0);
  
        // Step 2: Hitung histogram berdasarkan Value (V)
        const values = [];
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
  
          const [h, s, v] = rgbToHsv(r, g, b); // Dapatkan channel Value
          values.push(v);
          histogram[Math.round(v * 255)]++; // Hitung histogram dari Value (0-255)
        }
  
        // Step 3: Hitung CDF untuk Value (V)
        const cdf = [];
        let cumulativeSum = 0;
        for (let i = 0; i < histogram.length; i++) {
          cumulativeSum += histogram[i];
          cdf[i] = cumulativeSum;
        }
  
        // Normalisasi CDF
        const cdfMin = Math.min(...cdf);
        const totalPixels = canvas.width * canvas.height;
        for (let i = 0; i < cdf.length; i++) {
          cdf[i] = Math.round(((cdf[i] - cdfMin) / (totalPixels - cdfMin)) * 255);
        }
  
        // Step 4: Mapping nilai Value (V) berdasarkan CDF
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
  
          const [h, s, v] = rgbToHsv(r, g, b);
  
          const newV = cdf[Math.round(v * 255)] / 255; // Dapatkan value baru dari CDF
  
          // Konversi kembali ke RGB setelah equalization
          const [newR, newG, newB] = hsvToRgb(h, s, newV);
  
          data[i] = newR;
          data[i + 1] = newG;
          data[i + 2] = newB;
  
          newHistogram[Math.round(newV * 255)]++;
        }
  
        // Step 5: Update gambar dan histogram
        ctx.putImageData(imageData, 0, 0);
        setEqualizationImage(canvas.toDataURL());
  
        // Update histogram data (jika diperlukan)
        setModifiedHistogramData(newHistogram);
      };
    }
  };
  
  
  
  

  const handleUploadAgain = () => {
    setUploadedImage(null);
    setIsUploaded(false);
    setEqualizationImage(null); 
    setModifiedHistogramData(Array(256).fill(0)); // Reset histogram
    setOriginalHistogramData(Array(256).fill(0));
  };

  // Chart.js Data Setup
  const originalChartData = {
    labels: Array.from({ length: 256 }, (_, i) => i), // Labels for 0-255
    datasets: [
      {
        label: "Original Histogram",
        data: originalHistogramData,
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Different color for original histogram
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const modifiedChartData = {
    labels: Array.from({ length: 256 }, (_, i) => i), // Labels for 0-255
    datasets: [
      {
        label: "Modified Histogram",
        data: modifiedHistogramData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dark bg-gray-900 text-gray-200">
      <div className="bg-gray-900 h-screen flex justify-between">
        {/* Sidebar */}
        <div className="flex flex-col items-start bg-gray-800 rounded-r-lg shadow-lg p-2 space-y-5 w-18">
          <div className="flex items-center justify-center rounded-md bg-gray-800 p-4 text-white transition-all">
            <img src={a1Logo} alt="Logo" className="h-8 w-8" />
          </div>

          <div className="flex flex-col items-start space-y-8 w-full h-screen">
            {/* Sidebar Menu */}
            <ul className="flex flex-col space-y-6 w-full flex-grow">
              <li
                className={`p-5 rounded-md transition-all cursor-pointer flex items-center w-full ${
                  location.pathname === "/equalization"
                    ? "bg-white"
                    : "hover:bg-white"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0M3.75 12H7.5"
                  />
                </svg>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Area */}
        <div className="flex flex-col w-full h-full min-h-screen p-4">
          <div className="flex flex-col flex-grow md:flex-row md:space-x-4 w-full">
            {" "}
            <div className="bg-gray-800 rounded-lg p-4 flex flex-col flex-grow justify-center items-center md:w-2/3">
              {!isUploaded && (
                <div className="mb-4 w-full max-w-lg">
                  <label
                    htmlFor="file-upload"
                    className="block text-lg font-semibold mb-2 text-center"
                  >
                    Drag & Drop or Upload an Image
                  </label>
                  <div className="flex flex-col justify-center items-center p-16 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-blue-500 transition">
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-12 w-12 text-gray-400 mb-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    <label
                      htmlFor="file-upload"
                      className="block text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-700 file:text-gray-200 hover:file:bg-blue-800 cursor-pointer"
                    >
                      Drag and drop your image here, or click to browse
                    </label>
                  </div>
                </div>
              )}

              {isUploaded && (
                <div className="flex justify-between w-full h-full mb-2">
                  <div className="w-1/2 pr-2">
                    <h2 className="text-lg font-semibold mt-0 mb-3 text-center">
                      Original Image
                    </h2>
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="h-[88vh] w-full object-contain mx-auto rounded-xl border-2 border-gray-600" // Menambahkan border
                    />
                  </div>

                  <div className="w-1/2 pl-2">
                    <h2 className="text-lg font-semibold  mt-0 mb-3 text-center">
                      Adjusted Image
                    </h2>
                    {brightnessedImage ? (
                      <img
                        src={brightnessedImage} classNames
                        alt="Uploaded"
                        className="h-[88vh] w-full object-contain mx-auto rounded-xl border-2 border-gray-600" // Menambahkan border
                      />
                    ) : (
                      <p className="text-center text-gray-400">
                        No Equalization Applied
                      </p>
                    )}
                  </div>

                  <div
                    data-dial-init
                    className="fixed start-28 bottom-8 group"
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                  >
                    <div
                      id="speed-dial-menu-default"
                      className={`flex flex-col items-center mb-4 space-y-2 ${
                        isOpen ? "" : "hidden"
                      }`}
                    >
                      {/* Upload Again */}
                      <button
                        type="button"
                        onClick={handleUploadAgain}
                        data-tooltip-target="tooltip-download"
                        data-tooltip-placement="left"
                        className="flex justify-center items-center mb-1 w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                          />
                        </svg>
                      </button>
                      {/*   Download */}
                      <button
                        type="button"
                        onClick={() => {
                          if (brightnessedImage) {
                            // Membuat elemen link untuk mendownload gambar
                            const link = document.createElement("a");
                            link.href = brightnessedImage; // URL atau base64 image dari hasil edit
                            link.download = "edited_image.png"; // Nama file yang akan di-download
                            link.click();
                          } else {
                            alert(
                              "Belum ada gambar yang di-edit untuk diunduh."
                            );
                          }
                        }}
                        data-tooltip-target="tooltip-download"
                        data-tooltip-placement="left"
                        className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Tombol aksi utama */}
                    <button
                      type="button"
                      className="flex items-center justify-center w-16 h-16 text-gray-950 bg-white rounded-full shadow-lg hover:bg-gray-200 focus:outline-none"
                      aria-controls="speed-dial-menu-default"
                      aria-expanded={isOpen}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Histograms */}
            <div className="bg-gray-800 rounded-lg p-4 md:w-1/3">
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-2">
                  Panel Equalization
                </label>
              </div>

              <button
                onClick={handleEqualizeImage}
                className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-md mb-4 w-full"
              >
                Apply Equalization
              </button>

              <button
                onClick={handleReset}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md mb-4 w-full"
              >
                Reset
              </button>

              <div className="mb-4">
                <label className="block text-lg font-semibold mb-2">
                  Original Histogram
                </label>
                <Bar data={originalChartData} />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-semibold mb-2">
                  Modified Histogram
                </label>
                <Bar data={modifiedChartData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
