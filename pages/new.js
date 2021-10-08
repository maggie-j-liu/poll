import { useState, useEffect } from "react";
import useAuth from "utils/useAuth";
import { useRouter } from "next/router";
import { supabase } from "utils/supabaseClient";

const New = () => {
  const { user, loading } = useAuth();
  const [title, setTitle] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);
  const handleCreate = async () => {
    const { data, error } = await supabase
      .from("polls")
      .insert([{ title, created_at: new Date(), creator_id: user.id }]);
    router.push(`/poll/${data[0].id}/edit`);
  };
  if (loading) return null;
  return (
    <div>
      <label>
        <p>Title</p>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />
      </label>
      <button onClick={() => handleCreate()}>Create</button>
    </div>
  );
};

export default New;
