import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

const EnBreadcrumb = (props: any) => {
  const text2 = props.tilte2;
  const text3 = props.tilte3;

  const [fillText1] = useState(text2 === "");
  const [fillText2] = useState(text3 === "");

  return (
    <div className="max-w-screen-3xl mx-auto px-4">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1 text-sm text-gray-600">
          <li>
            <Link to="/" className="block transition hover:text-gray-700">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
              >
                <path
                  d="M0 12.2447C0 9.49859 5.96046e-08 8.12554 0.62304 6.98729C1.24608 5.84905 2.38434 5.14261 4.66084 3.72976L7.06084 2.24024C9.46727 0.746748 10.6705 0 12 0C13.3295 0 14.5327 0.746748 16.9392 2.24024L19.3392 3.72974C21.6157 5.14261 22.7539 5.84905 23.377 6.98729C24 8.12554 24 9.49859 24 12.2447V14.07C24 18.751 24 21.0916 22.5941 22.5457C21.1883 24 18.9254 24 14.4 24H9.6C5.07451 24 2.81178 24 1.40588 22.5457C1.19209e-07 21.0916 0 18.751 0 14.07V12.2447Z"
                  fill="#000"
                />
                <path
                  d="M8.4 18.3008C7.90295 18.3008 7.5 18.7037 7.5 19.2008C7.5 19.6978 7.90295 20.1008 8.4 20.1008H15.6C16.097 20.1008 16.5 19.6978 16.5 19.2008C16.5 18.7037 16.097 18.3008 15.6 18.3008H8.4Z"
                  fill="white"
                />
              </svg>
            </Link>
          </li>

          <li>
            <ChevronRight size={15} />
          </li>

          <li>
            <Link
              to={props.path1}
              className="block text-xs font-bold text-gray-400 transition"
            >
              {props.tilte1}
            </Link>
          </li>

          <li>
            {!fillText1 ? (
              <ChevronRight size={15} />
            ) : (
              <ChevronRight size={15} />
            )}
          </li>

          <li>
            <Link
              to={props.path2}
              className="block text-xs font-bold text-gray-400 transition"
            >
              {props.tilte2}
            </Link>
          </li>

          <li>
            {!fillText2 ? (
              <ChevronRight size={15} />
            ) : (
              <ChevronRight size={15} />
            )}
          </li>

          <li>
            <Link
              to={props.path3}
              className="block text-xs font-bold text-gray-400 transition"
            >
              {props.tilte3}
            </Link>
          </li>
        </ol>
      </nav>
    </div>
  );
};
export default EnBreadcrumb;
