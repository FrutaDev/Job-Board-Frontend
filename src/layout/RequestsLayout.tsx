import { Outlet } from "react-router-dom";
import HeaderRequestComponent from "../components/jobs/HeaderRequestComponent";

export default function RequestsLayout() {
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-gray-50/30">
            <HeaderRequestComponent title="Solicitudes" />
            <main className="flex-1 overflow-y-auto custom-scroll">
                <Outlet />
            </main>
        </div>
    );
}