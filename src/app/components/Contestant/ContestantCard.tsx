/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from 'next/image';
import { Card, CardContent, CardTitle } from '../ui/card';

export default function ContestandCrad({ contestant }: { contestant: any }) {
    
  return (
    <Card className="hover:shadow-lg rounded-t-lg">
      <div className="flex justify-center items-center bg-gray-100 rounded-t-lg">
        <Image
          src={contestant.image}
          alt={contestant.name}
          width={400}
          height={400}
          className="object-cover rounded-t-lg"
        />
      </div>

      <CardContent>
        <CardTitle className="text-xl">
          {contestant.season}기 {contestant.name}
        </CardTitle>
        <div className="grid grid-cols-2">
          <div className="text-l mr-1">직업 :{contestant.job}</div>
          <div className="text-l mr-1">출생 :{contestant.birth}</div>
          <div className="text-l mr-1">우승 횟수 :{contestant.win}</div>
          <div className="text-l mr-1">출생 :{contestant.birth}</div>
        </div>
      </CardContent>
    </Card>
  );
}
