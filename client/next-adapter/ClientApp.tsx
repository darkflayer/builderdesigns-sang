"use client";

import { BrowserRouter } from "react-router-dom";
import AppRoutes from "@/next-adapter/AppRoutes";

export default function ClientApp() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
