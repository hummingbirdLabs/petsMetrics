/**
 * CompareTable — Server Component
 * 渲染响应式对比表格（Featured Snippet "Table" 候选）
 * 纯静态渲染，SSG 预渲染，AI 爬虫 100% 可见。
 */
type CompareTableRow = {
  dimension: string;
  topicA: string;
  topicB: string;
};

type CompareTableProps = {
  topicAName: string;
  topicBName: string;
  rows: CompareTableRow[];
  section: 'dog' | 'cat';
};

export function CompareTable({ topicAName, topicBName, rows, section }: CompareTableProps) {
  const primaryColor = section === 'dog' ? '--dog-primary' : '--cat-primary';

  return (
    <figure className="my-8 overflow-x-auto rounded-xl border border-[--gray-300] shadow-sm">
      <table className="w-full border-collapse text-sm" aria-label={`Comparison of ${topicAName} and ${topicBName}`}>
        <caption className="sr-only">Side-by-side comparison: {topicAName} vs {topicBName}</caption>
        <thead>
          <tr className={`bg-[${primaryColor}] text-white`}>
            <th scope="col" className="px-4 py-3 text-left font-semibold">Dimension</th>
            <th scope="col" className="px-4 py-3 text-left font-semibold">{topicAName}</th>
            <th scope="col" className="px-4 py-3 text-left font-semibold">{topicBName}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.dimension}
              className={i % 2 === 0 ? 'bg-white' : 'bg-[--gray-50]'}
            >
              <th scope="row" className="border-t border-[--gray-200] px-4 py-3 text-left font-medium text-[--gray-900]">
                {row.dimension}
              </th>
              <td className="border-t border-[--gray-200] px-4 py-3 text-[--gray-700]">{row.topicA}</td>
              <td className="border-t border-[--gray-200] px-4 py-3 text-[--gray-700]">{row.topicB}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
