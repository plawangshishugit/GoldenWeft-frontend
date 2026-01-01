export default function AdvisorProgress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
  
     
        <div
          className="h-[1px] bg-black rounded transition-all"
          style={{ width: `${(current / total) * 100}%` }}
        />
  
   
  );
}
