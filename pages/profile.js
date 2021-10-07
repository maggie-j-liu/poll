import Account from "components/Account";
import useAuth from "utils/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";
const Profile = () => {
  const { session, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !session) {
      router.replace("/");
    }
  }, [session, loading]);
  if (loading) return null;
  return (
    <div className="bg-gray-200 h-screen" style={{ padding: "50px 0 100px 0" }}>
      <Account session={session} />
    </div>
  );
};

export default Profile;