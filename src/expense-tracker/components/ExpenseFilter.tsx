import { categories } from "../catgories";

interface ExpenseFilterProps {
  onSelect: (category: string) => void;
}

export const ExpenseFilter = (props: ExpenseFilterProps) => {
  const { onSelect } = props;

  return (
    <select
      onChange={(event) => onSelect(event.target.value)}
      className="form-select"
    >
      <option value="">All catergories</option>
      {categories.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};
