import { supabase } from "utils/supabaseClient";
const Poll = ({ poll }) => {
  return <div>{poll.id}</div>;
};

export default Poll;

export const getServerSideProps = async ({ params }) => {
  let { data: polls, error } = await supabase
    .from("polls")
    .select("*")
    .eq("id", params.id);
  console.log(polls, error);
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
