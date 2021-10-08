import EditPoll from "components/EditPoll";
import { supabase } from "utils/supabaseClient";
import useAuth from "utils/useAuth";
const Poll = ({ poll }) => {
  const { user } = useAuth();
  if (!user || user.id !== poll.creator_id) {
    return <div>{poll.id}</div>;
  }
  return <EditPoll poll={poll} />;
};

export default Poll;

export const getServerSideProps = async ({ params }) => {
  let { data: polls } = await supabase
    .from("polls")
    .select("*")
    .eq("id", params.id);
  if (!polls || !polls.length) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      poll: polls[0],
    },
  };
};
