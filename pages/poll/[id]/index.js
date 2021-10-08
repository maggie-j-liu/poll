import ViewPoll from "components/ViewPoll";
import getPoll from "utils/getPoll";
import useAuth from "utils/useAuth";
import Link from "next/link";

const Poll = ({ poll, questions, creator }) => {
  const { user, loading } = useAuth();
  if (!user && !loading) {
    return (
      <div>
        <h1>{poll.title}</h1>
        <h2>by {creator}</h2>
        <Link href="/">
          <a>Sign in to vote</a>
        </Link>
      </div>
    );
  }
  return <ViewPoll poll={poll} questions={questions} creator={creator} />;
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
