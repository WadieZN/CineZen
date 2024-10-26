import { Link } from "react-router-dom";
import Aside from "./Aside";

function ErrorPage() {
    return ( 
        <>
            <Aside />
            <main>
                <div className="error-page">
                <h2>Error 404</h2>
                <p>Looks like this page doesn't exist. <Link className="link" to={"/"}>Return to home page.</Link></p>
                </div>
            </main>
        </>
     );
}

export default ErrorPage;