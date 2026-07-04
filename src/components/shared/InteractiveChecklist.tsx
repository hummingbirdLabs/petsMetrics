'use client';

import { useState, useEffect } from 'react';

interface CheckItem {
  id: string;
  label: string;
  required: boolean;
  note?: string;
}

interface ChecklistSection {
  id: string;
  title: string;
  description: string;
  items: CheckItem[];
}

interface InteractiveChecklistProps {
  sections: ChecklistSection[];
  storageKey: string;
  showProgressBar?: boolean;
  allowPrint?: boolean;
  allowPDFDownload?: boolean;
  resetLabel?: string;
  printLabel?: string;
  downloadLabel?: string;
}

export default function InteractiveChecklist({
  sections,
  storageKey,
  showProgressBar = true,
  allowPrint = true,
  allowPDFDownload = true,
  resetLabel = 'Reset All',
  printLabel = 'Print Checklist',
  downloadLabel = 'Download PDF',
}: InteractiveChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setCheckedItems(JSON.parse(saved));
      } catch {
        setCheckedItems({});
      }
    }
    setHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (hydrated && Object.keys(checkedItems).length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(checkedItems));
    }
  }, [checkedItems, storageKey, hydrated]);

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetAll = () => {
    setCheckedItems({});
    localStorage.removeItem(storageKey);
  };

  const totalItems = sections.flatMap((s) => s.items).length;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  return (
    <div className="interactive-checklist rounded-xl border border-[--gray-200] bg-white p-6">
      {showProgressBar && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-[--gray-600]">
            <span>Progress</span>
            <span className="font-medium">
              {checkedCount}/{totalItems} completed ({progress}%)
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[--gray-100]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.id} className="checklist-section">
            <h3 className="text-lg font-semibold text-[--gray-900]">{section.title}</h3>
            <p className="mt-1 text-sm text-[--gray-500]">{section.description}</p>

            <ul className="mt-4 space-y-2">
              {section.items.map((item) => (
                <li key={item.id}>
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg p-2 hover:bg-[--gray-50] transition-colors">
                    <input
                      type="checkbox"
                      checked={checkedItems[item.id] || false}
                      onChange={() => toggleItem(item.id)}
                      className="mt-0.5 h-4 w-4 rounded border-[--gray-300] text-green-600 focus:ring-green-500"
                    />
                    <span className={`text-sm ${checkedItems[item.id] ? 'text-[--gray-400] line-through' : 'text-[--gray-700]'}`}>
                      {item.label}
                      {item.required && <span className="ml-1 text-red-500">*</span>}
                    </span>
                    {item.note && (
                      <span className="ml-auto text-xs text-[--gray-400]">{item.note}</span>
                    )}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3 border-t border-[--gray-200] pt-6">
        <button
          type="button"
          onClick={resetAll}
          className="rounded-lg border border-[--gray-300] px-4 py-2 text-sm font-medium text-[--gray-700] hover:bg-[--gray-50] transition-colors"
        >
          {resetLabel}
        </button>
        {allowPrint && (
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg border border-[--gray-300] px-4 py-2 text-sm font-medium text-[--gray-700] hover:bg-[--gray-50] transition-colors"
          >
            {printLabel}
          </button>
        )}
        {allowPDFDownload && (
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
          >
            {downloadLabel}
          </button>
        )}
      </div>
    </div>
  );
}
