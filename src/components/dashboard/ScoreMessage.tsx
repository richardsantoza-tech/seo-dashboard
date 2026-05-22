import { getScoreMessage } from "@/lib/constants";

interface ScoreMessageProps {
  score: number;
}

export default function ScoreMessage({ score }: ScoreMessageProps) {
  return (
    <p className="mt-4 text-xl font-medium text-gray-700">
      {getScoreMessage(score)}
    </p>
  );
}
