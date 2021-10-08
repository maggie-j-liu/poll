import Head from "next/head";
import { useState, useEffect } from "react";
import { supabase } from "utils/supabaseClient";
import Auth from "components/Auth";
import Account from "components/Account";
import useAuth from "utils/useAuth";
import LoggedInHome from "components/LoggedInHome";

export default function Home() {
  const { session, user, loading } = useAuth();

  return (
    <div className="bg-gray-200 h-screen" style={{ padding: "50px 0 100px 0" }}>
      {loading ? null : session ? <LoggedInHome /> : <Auth />}
    </div>
  );
}
