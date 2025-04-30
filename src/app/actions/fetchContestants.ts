export const fetchContestants = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/contestants`, {
    cache: 'no-store',
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Network response was not ok');
  }

  return data.data;
};
