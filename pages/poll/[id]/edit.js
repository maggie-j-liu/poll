import EditPoll from "components/EditPoll";
import useAuth from "utils/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import getPoll from "utils/getPoll";

const Poll = ({ poll, questions }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && (!user || user.id !== poll.creator_id)) {
      router.replace(`/poll/${poll.id}`);
    }
  }, [user, loading, router, poll.creator_id, poll.id]);
  if (loading || !user || user.id !== poll.creator_id) return null;
  return <EditPoll poll={poll} questions={questions} />;
};

export default Poll;

export const getServerSideProps = async ({ params }) => {
  const data = await getPoll(params.id);
  if (data === null) {
    return {
      notFound: true,
    };
  }
  return {
    props: data,
  };
};
