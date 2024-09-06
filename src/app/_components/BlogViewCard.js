"use client"
import { useRouter } from "next/navigation";

export default function BlogViewCard({ title, content,setData }) {
    const router = useRouter();

  return (
    <div className="flex justify-center items-center h-full ">
      {/* <!-- Centering wrapper --> */}
      <div className="relative flex flex-col mt-6 text-gray-700 w-96 bg-indigo-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10  ">
        <div className="p-6 ">
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 text-indigo-500">
            {title}
          </h5>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit text-gray-300">
            {content}
          </p>
        </div>
        <div className="p-6 pt-0 ">
          <button
            className="hover:shadow-custom align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10  "
            type="button"
            onClick={() => {
              setData(null);
            console.log("clicked")
              router.replace("/");
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
