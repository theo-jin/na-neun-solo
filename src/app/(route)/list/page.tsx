/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchContestants } from '@/app/actions/fetchContestants';
import ContestandCrad from '@/app/components/Contestant/ContestantCard';

export default async function ContestantList() {
  const contestants = await fetchContestants();
  console.log(contestants);
  return (
    <div>
      <h1>참가자 목록</h1>

      {contestants.map((contestant: any) => (
        <ContestandCrad key={contestant._id} contestant={contestant} />
      ))}
    </div>
  );
}
