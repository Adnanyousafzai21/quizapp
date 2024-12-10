type StatCardProps = {
  label: string;
  value: number;
}

const StatCard = ({ label, value }: StatCardProps) => (
  <div className="flex justify-between w-[80%] bg-gray-50 py-3 px-3 rounded-md hover:bg-gray-100">
    <h2>{label}</h2>
    <h3>{value}</h3>
  </div>
);

export default StatCard;