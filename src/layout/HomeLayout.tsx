import { NavLink } from "react-router-dom";

export default function HomeLayout() {
    return (
        <>
            <div>
                <div className="my-10 mx-10">
                    <h1>Home Layout</h1>
                </div>
                <div>
                    <ul>
                        <li>
                            <NavLink to="/job-1" className="border rounded-full px-4 py-2">Empleo 1</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}