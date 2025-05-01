/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchContestants } from '@/app/actions/fetchContestants';
import ContestandCrad from '@/app/components/Contestant/ContestantCard';

export default async function ContestantList() {
  const contestants = await fetchContestants();
  console.log(contestants);
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">참가자 목록</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contestants.map((contestant: any) => (
            <ContestandCrad key={contestant._id} contestant={contestant} />
          ))}
        </div>
      </div>
    </div>
  );
}
