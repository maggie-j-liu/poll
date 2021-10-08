import { supabase } from "utils/supabaseClient";
export default async function getPoll(pollId) {
  let { data: polls } = await supabase
    .from("polls")
    .select("*")
    .eq("id", pollId);
  if (!polls || !polls.length) {
    return null;
  }
  const poll = polls[0];
  const { data: pollQuestions } = await supabase
    .from("questions")
    .select("*")
    .eq("poll_id", pollId);
  pollQuestions.sort(
    (a, b) => poll.questions.indexOf(a.id) - poll.questions.indexOf(b.id)
  );
  const { data: creatorName } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", poll.creator_id);
  return { poll, questions: pollQuestions, creator: creatorName[0].username };
}
